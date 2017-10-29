import React, {Component} from 'react';
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, Tab, Table, Tabs, ButtonGroup} from 'react-bootstrap';

class PlaceServiceOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            service: {
                id: 1,
                name: 'Raphaels Brötchendienst',
                description: 'Brötchenlieferdienst',
                products: [
                    {
                        id: 1,
                        name: 'Vollkornbrot',
                        price: 2.1,
                        count: 1,
                    },
                    {
                        id: 2,
                        name: 'Schrippen',
                        price: 0.2,
                        count: 2,
                    },
                ]
            }
        };
    }

    render() {
        return (
            <div>
                <h3>{this.state.service.name}</h3>
                <p>{this.state.service.description}</p>
                <h4>Bestellung</h4>
                <Form horizontal>
                    <FormGroup>
                        <Col sm={2}>
                            Datum
                        </Col>
                        <Col sm={10}>
                            <input type='date'/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={2}>
                            Lieferart
                        </Col>
                        <Col sm={10}>
                            <ButtonGroup>
                                <Button>Klingeln</Button>
                                <Button>An die Tür hängen</Button>
                            </ButtonGroup>
                        </Col>
                    </FormGroup>
                </Form>
                <Table striped bordered>
                    <thead>
                    <tr>
                        <th>Produkt</th>
                        <th>Einzelpreis</th>
                        <th>Anzahl</th>
                        <th>Preis</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.service.products.map(prod => {
                            return <tr key={prod.id}>
                                <td>{prod.name}</td>
                                <td>{prod.price}</td>
                                <td><FormControl type='text' value={prod.count} /></td>
                                <td>0€</td>
                            </tr>
                        })
                    }
                    <tr>
                        <td colSpan={4}><Button bsStyle='primary'>Bestellen</Button></td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        );
    }

}

export default PlaceServiceOrder;