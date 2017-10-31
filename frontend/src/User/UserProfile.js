import React, {Component} from 'react';
import {Button, Col, ControlLabel, Form, FormControl, FormGroup} from 'react-bootstrap';

class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            firstname: '',
            lastname: '',
            street: '',
            number: '',
            zipCode: '',
            city: '',
        };
    }

    handleFirstnameChange(e) {
        this.setState({firstname: e.target.value});
    }

    handleLastnameChange(e) {
        this.setState({lastname: e.target.value});
    }

    handleStreetChange(e) {
        this.setState({street: e.target.value});
    }

    handleNumberChange(e) {
        this.setState({number: e.target.value});
    }

    handleZipCodeChange(e) {
        this.setState({zipCode: e.target.value});
    }

    handleCityChange(e) {
        this.setState({city: e.target.value});
    }

    render() {
        return (
            <Form horizontal>
                <FormGroup>
                    <Col sm={2} componentClass={ControlLabel}>
                        Benutzername
                    </Col>
                    <Col sm={10}>
                        <FormControl disabled={true} type='text' value={this.state.username} />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={2} componentClass={ControlLabel}>
                        Vorname
                    </Col>
                    <Col sm={10}>
                        <FormControl type='text' value={this.state.firstname} onChange={this.handleFirstnameChange.bind(this)}  />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={2} componentClass={ControlLabel}>
                        Name
                    </Col>
                    <Col sm={10}>
                        <FormControl type='text' value={this.state.lastname} onChange={this.handleLastnameChange.bind(this)} />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={2} componentClass={ControlLabel}>
                        Straße
                    </Col>
                    <Col sm={10}>
                        <FormControl type='text' value={this.state.street} onChange={this.handleStreetChange.bind(this)} />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={2} componentClass={ControlLabel}>
                        Hausnummer
                    </Col>
                    <Col sm={10}>
                        <FormControl type='text' value={this.state.number} onChange={this.handleNumberChange.bind(this)} />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={2} componentClass={ControlLabel}>
                        PLZ
                    </Col>
                    <Col sm={10}>
                        <FormControl type='text' value={this.state.zipCode} onChange={this.handleZipCodeChange.bind(this)} />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col sm={2} componentClass={ControlLabel}>
                        Ort
                    </Col>
                    <Col sm={10}>
                        <FormControl type='text' value={this.state.city} onChange={this.handleCityChange.bind(this)} />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col>
                        <Button bsStyle='primary'>Speichern</Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }

}

export default UserProfile;