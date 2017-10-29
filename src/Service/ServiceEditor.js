import React, {Component} from 'react';
import {Checkbox, Col, ControlLabel, Form, FormControl, FormGroup} from 'react-bootstrap';

class ServiceEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            serviceName: '',
            serviceDescription: '',
            keywords: '',
            deliveryArea: '',
            isPublic: false
        };
    }

    handleServiceNameChange(e) {
        this.setState({serviceName: e.target.value});
    }

    handleServiceDescriptionChange(e) {
        this.setState({serviceDescription: e.target.value});
    }

    handleKeywordsChange(e) {
        this.setState({keywords: e.target.value});
    }

    handleDeliveryAreaChange(e) {
        this.setState({deliveryArea: e.target.value});
    }

    handleIsPublicChange(e) {
        this.setState({isPublic: e.target.value});
    }

    handleSave(e) {

    }

    render() {
        return (
            <div id='service-editor'>
                <Form horizontal>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Servicename
                        </Col>
                        <Col sm={10}>
                            <FormControl type='text' value={this.state.serviceName}
                                         onChange={this.handleServiceNameChange.bind(this)}/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Dienstbeschreibung
                        </Col>
                        <Col sm={10}>
                            <FormControl componentClass='textarea' value={this.state.serviceDescription}
                                         onChange={this.handleServiceDescriptionChange.bind(this)}/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Keywords
                        </Col>
                        <Col sm={10}>
                            <FormControl type='text' value={this.state.keywords}
                                         onChange={this.handleKeywordsChange.bind(this)}/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Liefergebiet
                        </Col>
                        <Col sm={10}>
                            <FormControl type='text' value={this.state.deliveryArea}
                                         onChange={this.handleDeliveryAreaChange.bind(this)}/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Checkbox value={this.state.isPublic} onChange={this.handleIsPublicChange.bind(this)}>Öffentlich</Checkbox>
                        </Col>
                    </FormGroup>

                </Form>
            </div>
        );
    }

}

export default ServiceEditor;