import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import api from '../Api/api';

class OrderList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: []
        };
    }

    componentDidMount() {
        api.fetchOrders().then(orders => this.setState({orders}));
    }

    calcTotal(product) {
        const amount = parseInt(product.amount);
        return amount * product.price;
    }

    render() {
        return (
            <div>

                {
                    this.state.orders.map(order => {
                        return (<div>
                            <h3>{order.customer}, am {order.date} ({order.address}, {order.deliveryType})</h3>
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
                                                <td>{this.calcTotal(product)}</td>
                                            </tr>
                                        );
                                    })
                                }
                                </tbody>
                            </Table>
                        </div>)
                    })
                }
            </div>);
    }

}

export default OrderList;