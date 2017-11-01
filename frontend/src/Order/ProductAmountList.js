import React, {Component} from 'react';
import {FormControl, Table} from 'react-bootstrap';
import api from '../Api/api';

class ProductAmountList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }

    componentDidMount() {
        api.fetchProducts().then(products => this.setState({products}));
    }

    handleAmountChange(product, e) {
        const products = this.state.products.slice();
        const index = products.indexOf(product);
        products[index].amount = parseInt(e.target.value);
        this.setState({products});
        this.props.onChange(products);
    }

    calcTotal(product) {
        const amount = parseInt(product.amount);
        return amount * product.price;
    }

    render() {
        return (
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
                    this.state.products.map(product => {
                        return (
                            <tr key={product.name}>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td><FormControl type='number' value={product.amount}
                                                 onChange={this.handleAmountChange.bind(this, product)}/></td>
                                <td>{this.calcTotal(product)}</td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </Table>
        );
    }
}

export default ProductAmountList;