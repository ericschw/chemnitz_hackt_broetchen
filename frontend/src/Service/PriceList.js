import React, {Component} from 'react';
import {FormControl, Table, Button, Glyphicon} from 'react-bootstrap';
import api from '../Api/api';

class PriceList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            productPrototype: PriceList.createProductPrototype()
        };
    }

    componentDidMount() {
        api.fetchProducts().then(products => this.setState({products}));
    }

    handlePriceChange(product, e) {
        const products = this.state.products.slice();
        const index = products.indexOf(product);
        products[index].price = parseFloat(e.target.value);
        this.setState({products});
    }

    handleAddProduct() {
        const products = this.state.products.slice();
        products.push(this.state.productPrototype);
        this.setState({products, productPrototype: PriceList.createProductPrototype()});
    }

    handleRemoveProduct(product) {
        const products = this.state.products.slice();
        const index = products.indexOf(product);
        products.splice(index, 1);
        this.setState({products});
    }

    handleProductPrototypeNameChange(e) {
        const productPrototype = Object.assign({}, this.state.productPrototype);
        productPrototype.name = e.target.value;
        this.setState({productPrototype});
    }

    handleProductPrototypePriceChange(e) {
        const productPrototype = Object.assign({}, this.state.productPrototype);
        productPrototype.price = parseFloat(e.target.value);
        this.setState({productPrototype});
    }

    handleSave() {
        api.saveProducts(this.state.products);
    }

    render() {
        return (
            <Table striped bordered responsive>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Preis</th>
                    <th>Aktion</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.state.products.map(product => {
                        return (
                            <tr key={product.name}>
                                <td>{product.name}</td>
                                <td><FormControl type='number' step='0.01' value={product.price}
                                                 onChange={this.handlePriceChange.bind(this, product)}/></td>
                                <td><Button onClick={this.handleRemoveProduct.bind(this, product)} ><Glyphicon glyph='minus' /></Button></td>
                            </tr>
                        );
                    })
                }
                </tbody>
                <tr>
                    <td><FormControl type='text' value={this.state.productPrototype.name} onChange={this.handleProductPrototypeNameChange.bind(this)} /></td>
                    <td><FormControl type='number' step='0.01' value={this.state.productPrototype.price} onChange={this.handleProductPrototypePriceChange.bind(this)} /></td>
                    <td><Button onClick={this.handleAddProduct.bind(this)} ><Glyphicon glyph='plus' /></Button></td>
                </tr>
                <tr>
                    <td colSpan={3}>
                        <Button bsStyle='primary' onClick={this.handleSave.bind(this)}>Speichern</Button>
                    </td>
                </tr>
            </Table>
        );
    }
}

PriceList.createProductPrototype = () => {
    return {
        name: '',
        price: 0
    };
}

export default PriceList;