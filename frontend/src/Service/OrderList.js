import React, {Component} from 'react';
import {Panel, Table, Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import api from '../Api/api';
import {today} from '../Util/dateUtil';

class OrderList extends Component {

    static calcTotal(product) {
        const amount = parseInt(product.amount);
        return amount * product.price;
    }

    static getNoOrderMessage() {
        return <p>Keine Bestellungen gefunden</p>;
    }

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            fromDate: today(),
            toDate: today(),
        };
    }

    componentDidMount() {
        this.fetchOrders();
    }

    fetchOrders() {
        const {fromDate, toDate} = this.state;
        api.fetchOrders(fromDate, toDate).then(orders => this.setState({orders}));
    }

    handleFromDateChange(e) {
        this.setState({fromDate: e.target.value}, this.fetchOrders);
    }

    handleToDateChange(e) {
        this.setState({toDate: e.target.value}, this.fetchOrders);
    }

    getOrderTables() {
        return this.state.orders.map(order => {
            return (
                <Panel header={'Kunde: ' + order.customer + ', Datum: ' + order.date + ', Adresse: ' + order.address + ', Lieferart: ' + order.deliveryType}>
                    <Table striped bordered>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Preis</th>
                            <th>Stückzahl</th>
                            <th>Gesamtpreis</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            order.products.map(product => {
                                return (
                                    <tr key={product.name}>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.amount}</td>
                                        <td>{OrderList.calcTotal(product)}</td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                    </Table>
                </Panel>)
        })
    }

    render() {
        return (
            <div>
                <Form>
                    <FormGroup>
                        <ControlLabel>Von</ControlLabel>
                        <FormControl type='date' value={this.state.fromDate} onChange={this.handleFromDateChange.bind(this)} />
                        <ControlLabel>Bis</ControlLabel>
                        <FormControl type='date' value={this.state.toDate} onChange={this.handleToDateChange.bind(this)} />
                    </FormGroup>
                </Form>
                {this.state.orders.length === 0 ? OrderList.getNoOrderMessage() : this.getOrderTables()}
            </div>);
    }

}

export default OrderList;