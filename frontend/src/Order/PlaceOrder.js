import React, {Component} from 'react';
import DeliverySettings from './DeliverySettings';
import ProductAmountList from './ProductAmountList';
import {Button} from 'react-bootstrap';
import api from '../Api/api';

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
        this.date = PlaceOrder.getToday();
        return (
            <div className='container'>
                <DeliverySettings  initialDate={this.date} onChange={this.handleDeliverySettingsChange.bind(this)} />
                <ProductAmountList onChange={this.handleProductsChange.bind(this)} />
                <Button bsStyle='success' onClick={this.handleOrder.bind(this)} >Jetzt bestellen</Button>
            </div>
        );
    }
}

PlaceOrder.getToday = () => {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;

    const yyyy = today.getFullYear();
    if( dd < 10){
        dd='0'+dd;
    }
    if(mm<10){
        mm='0'+mm;
    }
    return yyyy+'-'+mm+'-'+dd;
};

export default PlaceOrder;