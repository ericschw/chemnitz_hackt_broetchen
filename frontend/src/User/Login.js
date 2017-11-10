import React, {Component} from 'react';
import {Button, Col, ControlLabel, Form, FormControl, FormGroup} from 'react-bootstrap';
import api from '../Api/api';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loginFailed: false,
        };
    }

    handleUsernameChange(e) {
        this.setState({username: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    handleLogin() {
        const { username, password } = this.state;
        api.login(username, password).then(
            () => this.props.onLoggedIn(),
            () => this.props.onLoginFailed()
        );
    }

    render() {
        return (
            <div className='container'>
                <Form id='login-form' horizontal style={{margin: '10%'}}>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Nutzername
                        </Col>
                        <Col sm={10}>
                            <FormControl type='text' value={this.state.username}
                                         onChange={this.handleUsernameChange.bind(this)}/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Passwort
                        </Col>
                        <Col sm={10}>
                            <FormControl type='password' value={this.state.password}
                                         onChange={this.handlePasswordChange.bind(this)}/>
                        </Col>
                        {this.state.loginFailed ?
                            <span style={{color: 'red'}}>Falsche Benutzername/Passwort-Kombination</span> : <span/>}
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button bsStyle='primary' onClick={this.handleLogin.bind(this)}>Login</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default Login;
