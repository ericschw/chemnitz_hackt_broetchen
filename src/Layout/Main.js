import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import ServiceAboOverview from '../Service/ServiceAboOverview';
import ServiceProvider from '../Service/ServiceProvider';
import ServiceDetail from '../Service/ServiceDetail';
import UserProfile from '../User/UserProfile';
import OrderOverview from '../Order/OrderOverview';
import PlaceServiceOrder from '../Order/PlaceServiceOrder';

class Main extends Component {

    render() {
        return (
            <div className='container' style={{marginTop: '50px'}}>
                <Switch>
                    <Route exact path='/' component={ServiceAboOverview}/>
                    <Route path='/service-provider' component={ServiceProvider}/>
                    <Route path='/service-detail' component={ServiceDetail}/>
                    <Route path='/user-profile' component={UserProfile}/>
                    <Route path='/orders' component={OrderOverview}/>
                    <Route path='/place-order/:service' component={PlaceServiceOrder}/>
                </Switch>
            </div>
        );
    }

}

export default Main;