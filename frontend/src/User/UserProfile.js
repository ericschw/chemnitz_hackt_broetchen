import React, {Component} from 'react';
import {Button, Col, ControlLabel, Form, FormControl, FormGroup} from 'react-bootstrap';
import api from '../Api/api';

class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: '',
            fullName: '',
            address: '',
        };
    }

    componentDidMount() {
        api.getMe().then(user => {
            const { login, fullName, address } = user;
            this.setState({login, fullName, address});
        });
    }

    handleFullNameChange(e) {
        this.setState({fullName: e.target.value});
    }

    handleAddressChange(e) {
        this.setState({address: e.target.value});
    }

    handleSave(e) {
        const {fullName, address} = this.state;
        api.saveMe({fullName, address});
    }

    render() {
        return (
            <Form horizontal>
                <FormGroup>
                    <Col sm={2} componentClass={ControlLabel}>
                        Benutzername
                    </Col>
                    <Col sm={10}>
                        <FormControl disabled={true} type='text' value={this.state.login} />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={2} componentClass={ControlLabel}>
                        Name
                    </Col>
                    <Col sm={10}>
                        <FormControl type='text' value={this.state.fullName} onChange={this.handleFullNameChange.bind(this)}  />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={2} componentClass={ControlLabel}>
                        Straße
                    </Col>
                    <Col sm={10}>
                        <FormControl type='text' value={this.state.address} onChange={this.handleAddressChange.bind(this)} />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col>
                        <Button bsStyle='primary' onClick={this.handleSave.bind(this)} >Speichern</Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }

}

export default UserProfile;