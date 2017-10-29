import fetch from 'isomorphic-fetch';

class ApiClient {

    baseUrl = 'http://10.149.5.41:8083/api';
    loggedIn = false;

    login(username, password) {
        fetch(this.baseUrl + '/login',
            {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: {
                    email_address: username,
                    password
                }
            })
            .then(response => {
                if (response.status === 200) {
                    this.loggedIn = true;
                    return response.json();
                } else {
                    this.loggedIn = false;
                }
            });
    }

    post(url, body) {
        fetch(this.baseUrl + url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            },
            body
        })
            .then(response => {
                if (response.status === 200) {
                    console.log('Success');
                }
            });
    }

    get(url) {
        fetch(this.baseUrl + url)
            .then(response => {
                if (response.status === 200) {
                    console.log('Success');
                }
            });
    }

    isLoggedIn() {
        return this.loggedIn;
    }
}

export default new ApiClient();