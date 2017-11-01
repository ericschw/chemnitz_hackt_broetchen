import React, {Component} from 'react';
import OrderList from './OrderList';
import {Tabs, Tab} from 'react-bootstrap';


class ServiceProvider extends Component {

    render() {
        return (
            <Tabs defaultActiveKey={1}>
                <Tab eventKey={1} title='Bestellungen'>
                    <OrderList/>
                </Tab>
                <Tab eventKey={2} title='Preisliste'>
                    ...
                </Tab>
            </Tabs>
        );
    }

}

export default ServiceProvider;