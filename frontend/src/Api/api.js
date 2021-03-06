class Api {

    baseUrl = 'http://localhost:8080/api';

    login(username, password) {
        return fetch(this.baseUrl + '/login',
            {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            })
            .then(response => {
                if (response.status === 200) {

                    return new Promise((resolve) => {
                        response.json()
                            .then(response => {
                                this.sessionId = response.sessionId;
                                resolve();
                            });
                    });
                } else {
                    return new Promise((resolve, reject) => reject());
                }
            });
    }

    order(date, deliveryType, products) {
        return this.post('/orders', {
            orders: [
                {
                    date,
                    deliveryType,
                    products
                }]
        });
    }

    fetchOrders(fromDate, toDate) {
        return this.post('/orders/_search', {fromDate, toDate}).then(response => {
            return response.json();
        });
    }

    fetchProducts() {
        return this.get('/products').then(response => {
            return response.json();
        });
    }

    saveProducts(products) {
        return this.post('/products', {products});
    }

    getMe() {
        return this.get('/users/me').then(response => response.json());
    }

    saveMe(user) {
        return this.post('/users/me', user);
    }

    post(url, body) {
        return this.request(url, 'post', body);
    }

    get(url) {
        return this.request(url, 'get', null);
    }

    request(url, method, body) {
        return fetch(this.baseUrl + url,
            {
                method: method,
                headers: {
                    'Authorization': 'Session ' + this.sessionId,
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: body ? JSON.stringify(body) : null
            });
    }

    isLoggedIn() {
        return this.sessionId;
    }
}

export default new Api();