package de.ericsch.bakery.util;

public class StringUtils {

    public static boolean isNullOrEmpty(String string) {
        return string == null || "".equals(string.trim());
    }
}
