import React, {Component} from 'react';
import './App.css';

import Header from './Layout/Header';
import Main from "./Layout/Main";
import Login from './User/Login';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
        };
    }

    handleLoggedIn() {
        this.setState({loggedIn: true});
    }

    handleLoginFailed() {
        console.log('Login failed');
    }

    render() {
        return (
            <div className="App">
                {
                    this.state.loggedIn ? (<div>
                        <Header/>
                        <Main/>

                    </div>) : <Login
                                    onLoggedIn={this.handleLoggedIn.bind(this)}
                                    onLoginFailed={this.handleLoginFailed.bind(this)}
                                />
                }
            </div>
        );
    }
}

export default App;
