import React, {Component} from 'react';
import {
    ButtonToolbar,
    ControlLabel,
    Form,
    FormControl,
    FormGroup,
    HelpBlock,
    ToggleButton,
    ToggleButtonGroup
} from 'react-bootstrap';

class DeliverySettings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: props.initialDate,
            deliveryType: 'Türklinke'
        };
    }

    handleDateChange(e) {
        const date = e.target.value;
        this.setState({date});
        this.props.onChange(date, this.state.deliveryType);
    }

    handleDeliveryTypeChange(value) {
        this.setState({deliveryType: value});
        this.props.onChange(this.state.date, value);
    }

    render() {
        return (
            <Form>
                <FormGroup>
                    <ControlLabel>Datum</ControlLabel>
                    <FormControl type='date' value={this.state.date} onChange={this.handleDateChange.bind(this)}/>
                    <HelpBlock>Geben Sie hier das gewünschte Lieferdatum an</HelpBlock>
                </FormGroup>
                <FormGroup>
                    <ButtonToolbar>
                        <ControlLabel>Lieferart</ControlLabel>
                        <ToggleButtonGroup
                            value={this.state.deliveryType}
                            type='radio'
                            name='options'
                            defaultValue={1}
                            onChange={this.handleDeliveryTypeChange.bind(this)}>
                            <ToggleButton value='Türklinke'>Türklinke</ToggleButton>
                            <ToggleButton value='Klingel'>Klingel</ToggleButton>
                        </ToggleButtonGroup>
                    </ButtonToolbar>
                    <HelpBlock>Soll geklingelt werden oder sollen die Produkte an die Tür gehängt werden?</HelpBlock>
                </FormGroup>
            </Form>
        );
    }
}

export default DeliverySettings;