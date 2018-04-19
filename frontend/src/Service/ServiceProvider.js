import React, {Component} from 'react';
import OrderList from './OrderList';
import {Tabs, Tab} from 'react-bootstrap';
import PriceList from "./PriceList";


class ServiceProvider extends Component {

    render() {
        return (
            <Tabs id='service-provider-tabs' defaultActiveKey={1}>
                <Tab eventKey={1} title='Bestellungen'>
                    <OrderList/>
                </Tab>
                <Tab eventKey={2} title='Preisliste'>
                    <PriceList />
                </Tab>
            </Tabs>
        );
    }

}

export default ServiceProvider;