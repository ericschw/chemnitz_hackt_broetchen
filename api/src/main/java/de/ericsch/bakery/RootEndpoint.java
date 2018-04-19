package de.ericsch.bakery;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.ericsch.bakery.request.*;
import de.ericsch.bakery.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping(produces = "application/json", consumes = "application/json")
public class RootEndpoint {

    private static final Logger LOGGER = LoggerFactory.getLogger(RootEndpoint.class);

    private static String getSessionId(HttpServletRequest request) {
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (authHeader == null) {
            throw new ApiException("No Authorization header found. Expected 'Authorization: Session <sessionId>");
        }
        return authHeader.replace("Session ", "");
    }

    private final ObjectMapper objectMapper = new ObjectMapper();

    private final Map<String, User> usersBySessionId = new ConcurrentHashMap<>();

    private final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    @PostMapping(path = "login")
    public LoginResponse login(@RequestBody LoginRequest request, HttpServletResponse response) {
        String sessionId = null;
        List<User> users = loadUsers();
        for (User user : users) {
            if (Objects.equals(request.username, user.login) && Objects.equals(request.password, user.password)) {
                sessionId = UUID.randomUUID().toString();
                usersBySessionId.put(sessionId, user);
            }
        }
        if (sessionId == null) {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
        }
        return new LoginResponse(sessionId);
    }

    private List<User> loadUsers() {
        try (FileReader fileReader = new FileReader("db/users.json")) {
            return objectMapper.readValue(fileReader, new TypeReference<List<User>>() {
            });
        } catch (IOException e) {
            LOGGER.error("Could not load users.");
        }
        return Collections.emptyList();
    }

    @Value("${apiUrl}")
    private String apiUrl;

    @PostMapping(path = "invitations")
    public String sendInvitation(@RequestBody SendInvitationRequest request) {
        String code = UUID.randomUUID().toString();
        try {
            Files.createFile(Paths.get(code + ".invitation"));
            String link = apiUrl + "/invitations/" + code;
            LOGGER.info("Mocking email invitation to {} with link {}", request.email, link);
            // TODO: send mail
            return link;
        } catch (IOException e) {
            String errorMessage = "Failed to record invitation.";
            LOGGER.error(errorMessage, e);
            throw new ApiException(errorMessage, e);
        }
    }

    @PostMapping(path = "registrations")
    public void register(@RequestBody RegistrationRequest registrationRequest) {
        String code = registrationRequest.code;
        Path invitationFile = Paths.get(code + ".invitation");
        if (Files.exists(invitationFile)) {
            User user = new User();
            user.login = registrationRequest.login;
            user.isProvider = false;
            user.password = registrationRequest.password; // TODO: hash
            user.fullName = registrationRequest.fullName;
            user.address = registrationRequest.address;

            try {
                FileReader fileReader = new FileReader("db/users.json");
                List<User> users = objectMapper.readValue(fileReader, new TypeReference<List<User>>() {
                });
                users.add(user); // TODO: lock / avoid race conditions

                FileWriter fileWriter = new FileWriter("db/users.json");
                objectMapper.writeValue(fileWriter, users);
                Files.deleteIfExists(invitationFile);
            } catch (IOException e) {
                LOGGER.error("Could not access users", e);
            }
        } else {
            LOGGER.error("No invitation file found for code " + code);
        }
    }

    @GetMapping(path = "users/me")
    public User getMe(HttpServletRequest servletRequest) {
        String sessionId = getSessionId(servletRequest);
        User user = assertUser(sessionId);

        User result = new User();
        result.fullName = user.fullName;
        result.login = user.login;
        result.address = user.address;
        result.isProvider = user.isProvider;
        return result;
    }

    @PostMapping(path = "users/me")
    public void saveMe(@RequestBody User toBeSaved, HttpServletRequest servletRequest) {
        String sessionId = getSessionId(servletRequest);
        User user = assertUser(sessionId);
        user.fullName = toBeSaved.fullName;
        user.address = toBeSaved.address;

        List<User> users = loadUsers();
        for (int i = 0; i < users.size(); i++) {
            User candidate = users.get(i);
            if (candidate.login.equals(user.login)) {
                users.set(i, user);
                break;
            }
        }
        try {
            FileWriter fileWriter = new FileWriter("db/users.json");
            objectMapper.writeValue(fileWriter, users);
        } catch (IOException e) {
            LOGGER.error("Could not write users", e);
        }
    }

    @PostMapping(path = "products")
    public void saveProducts(@RequestBody ProductsRequest request, HttpServletRequest servletRequest) {
        try {

            String sessionId = getSessionId(servletRequest);
            User user = assertUser(sessionId);
            checkProviderRole(user);

            FileWriter fileWriter = new FileWriter("db/products.json");
            objectMapper.writeValue(fileWriter, request.products);

        } catch (IOException e) {
            LOGGER.error("Could not save products", e);
        }
    }

    @GetMapping(path = "products")
    public List<Product> getProducts(HttpServletRequest servletRequest) {
        try {
            String sessionId = getSessionId(servletRequest);
            assertUser(sessionId);

            FileReader fileReader = new FileReader("db/products.json");
            return objectMapper.readValue(fileReader, new TypeReference<List<Product>>() {
            });
        } catch (IOException e) {
            LOGGER.error("Could not get products", e);
        }
        return null;
    }

    @PostMapping(path = "orders")
    public void placeOrder(@RequestBody PlaceOrderRequest placeOrderRequest, HttpServletRequest servletRequest) {
        Collection<Order> orders = placeOrderRequest.orders;
        String sessionId = getSessionId(servletRequest);
        User user = assertUser(sessionId);
        checkProviderRole(user);
        orders.forEach(order -> addUserDataToOrder(order, user));
        try {

            List<Order> toBeSaved = new ArrayList<>(orders);
            Path userOrdersFile = Paths.get("db/orders-" + user.login + ".json");
            if (Files.exists(userOrdersFile)) {
                FileReader fileReader = new FileReader(userOrdersFile.toFile());
                List<Order> userOrders = objectMapper.readValue(fileReader, new TypeReference<List<Order>>() {
                });
                toBeSaved.addAll(userOrders);
            }
            FileWriter fileWriter = new FileWriter("db/orders-" + user.login + ".json");
            objectMapper.writeValue(fileWriter, toBeSaved);
        } catch (IOException e) {
            LOGGER.error("Could not store orders for user " + user.login, e);
        }
    }

    @PostMapping(path = "orders/_search")
    public List<Order> getOrders(@RequestBody OrderSearchRequest searchRequest, HttpServletRequest servletRequest) {
        String sessionId = getSessionId(servletRequest);
        assertUser(sessionId);

        List<Order> orders = new ArrayList<>();
        try (DirectoryStream<Path> paths = Files.newDirectoryStream(Paths.get("db/"))) {
            for (Path path : paths) {
                String filename = path.getFileName().toString();
                if (filename.startsWith("orders-")) {
                    List<Order> customerOrders = objectMapper.readValue(new FileReader(path.toFile()), new TypeReference<List<Order>>() {
                    });
                    String fromDateString = searchRequest.fromDate;
                    String toDateString = searchRequest.toDate;

                    for (Order order : customerOrders) {
                        LocalDate fromFilter = StringUtils.isNullOrEmpty(fromDateString) ? null : LocalDate.parse(fromDateString, dateTimeFormatter);
                        LocalDate toFilter = StringUtils.isNullOrEmpty(toDateString) ? null : LocalDate.parse(toDateString, dateTimeFormatter);
                        LocalDate orderDate = LocalDate.parse(order.date, dateTimeFormatter);
                        if ((fromFilter == null || (fromFilter.isBefore(orderDate) || fromFilter.isEqual(orderDate)))
                                && (toFilter == null || (toFilter.isAfter(orderDate) || toFilter.isEqual(orderDate)))) {
                            orders.add(order);
                        }
                    }
                }
            }
        } catch (IOException e) {
            LOGGER.error("Could not access orders", e);
        }
        orders.sort(Comparator.comparing(order -> order.date));
        return orders;
    }

    private void addUserDataToOrder(Order order, User user) {
        order.customer = user.fullName;
        order.address = user.address;
    }

    private void checkProviderRole(User user) {
        if (user == null || !user.isProvider) {
            throw new ApiException("Unauthorized");
        }
    }

    private User assertUser(String sessionId) {
        if (sessionId == null) {
            throw new ApiException("Unauthorized");
        }
        User user = usersBySessionId.get(sessionId);
        if (user == null) {
            throw new ApiException("Unauthorized");
        }
        return user;
    }
}
