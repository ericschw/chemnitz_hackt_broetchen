import React, {Component} from 'react';
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, Tab, Table, Tabs} from 'react-bootstrap';
import ServiceEditor from './ServiceEditor';

class ServiceDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [
                {
                    id: 1,
                    name: 'Vollkornbrot',
                    price: 2.1
                },
                {
                    id: 2,
                    name: 'Schrippen',
                    price: 0.2
                },
            ],
            newProduct: {name: '', price: 0},
            orders: [
                {
                    id: 1,
                    date: '28.10.2017',
                    address: 'Theaterstraße 56, 09113 Chemnitz',
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
                },
                {
                    id: 2,
                    date: '29.10.2017',
                    address: 'Theaterstraße 56, 09113 Chemnitz',
                    products: [
                        {
                            id: 2,
                            name: 'Schrippen',
                            price: 0.2,
                            count: 2,
                        },
                    ]
                }
            ],
        };
    }

    handleNewProductNameChange(e) {
        const newProduct = this.state.newProduct;
        newProduct.name = e.target.value;
        this.setState({newProduct});
    }

    handleNewProductPriceChange(e) {
        const newProduct = this.state.newProduct;
        newProduct.price = e.target.value;
        this.setState({newProduct});
    }

    handleAddProduct() {
        const products = this.state.products.slice();
        products.push(this.state.newProduct);
        this.setState({products, newProduct: {name: '', price: 0}});
    }

    handleRemoveProduct(product) {
        const products = this.state.products.slice();
        const idx = products.indexOf(product);
        products.splice(idx, 1);
        this.setState({products});
    }

    render() {
        return (
            <div id='service-detail-editor'>

                <Tabs defaultActiveKey={1}>
                    <Tab eventKey={1} title='Allgemein'>
                        <ServiceEditor/>
                        <Button bsStyle='primary'>Speichern</Button>
                        <Form>
                            <FormGroup>
                                <Col sm={2} componentClass={ControlLabel}>Email</Col>
                                <Col sm={10}>
                                    <FormControl type='text'/>
                                    <Button>Kunde einladen</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Tab>
                    <Tab eventKey={2} title='Preisliste'>
                        <Table striped bordered>
                            <thead>
                            <tr>
                                <th>Produkt</th>
                                <th>Preis</th>
                                <th>Aktion</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.products.map(prod => {
                                    return <tr key={prod.id}>
                                        <td>{prod.name}</td>
                                        <td>{prod.price}</td>
                                        <td><Button onClick={this.handleRemoveProduct.bind(this, prod)}>-</Button></td>
                                    </tr>
                                })
                            }
                            <tr>
                                <td><FormControl type='text' value={this.state.newProduct.name}
                                                 onChange={this.handleNewProductNameChange.bind(this)}/></td>
                                <td><FormControl type='text' value={this.state.newProduct.price}
                                                 onChange={this.handleNewProductPriceChange.bind(this)}/></td>
                                <td><Button onClick={this.handleAddProduct.bind(this)}>+</Button></td>
                            </tr>
                            <tr>
                                <td colSpan={3}><Button bsStyle='primary'>Speichern</Button></td>
                            </tr>
                            </tbody>
                        </Table>
                    </Tab>
                    <Tab eventKey={3} title='Bestellübersicht'>

                        {
                            this.state.orders.map(order => {
                                return (
                                    <div>
                                        <p>
                                            <label>Addresse: </label>
                                            {order.address}
                                        </p>
                                        <p>
                                            <label>Datum: </label>
                                            {order.date}
                                        </p>
                                        <Table striped bordered>
                                            <thead>
                                            <tr>
                                                <th>Produkt</th>
                                                <th>Anzahl</th>
                                                <th>Einzelpreis</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                order.products.map(prod => {
                                                    return <tr key={prod.id}>
                                                        <td>{prod.name}</td>
                                                        <td>{prod.count}</td>
                                                        <td>{prod.price}</td>
                                                    </tr>
                                                })
                                            }
                                            <tr>
                                                <td colSpan={3}><label>{'Gesamtpreis 0€'}</label></td>
                                            </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                );
                            })
                        }
                    </Tab>
                </Tabs>
            </div>
        );
    }

}

export default ServiceDetail;