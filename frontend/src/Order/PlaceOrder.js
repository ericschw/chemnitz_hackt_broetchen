import React, {Component} from 'react';
import DeliverySettings from './DeliverySettings';
import ProductAmountList from './ProductAmountList';
import {Button} from 'react-bootstrap';
import api from '../Api/api';
import {today} from '../Util/dateUtil';

class PlaceOrder extends Component {

    handleDeliverySettingsChange(date, deliveryType) {
        this.date = date;
        this.deliveryType = deliveryType;
    }

    handleProductsChange(products) {
        this.products = products;
    }

    handleOrder() {
        api.order(this.date, this.deliveryType || 'Türklinke', this.products);
    }

    render() {
        this.date = today();
        return (
            <div className='container'>
                <DeliverySettings  initialDate={this.date} onChange={this.handleDeliverySettingsChange.bind(this)} />
                <ProductAmountList onChange={this.handleProductsChange.bind(this)} />
                <Button bsStyle='success' onClick={this.handleOrder.bind(this)} >Jetzt bestellen</Button>
            </div>
        );
    }
}

export default PlaceOrder;