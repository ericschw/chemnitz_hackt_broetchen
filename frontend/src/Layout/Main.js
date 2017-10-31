import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import ServiceProvider from '../Service/ServiceProvider';
import UserProfile from '../User/UserProfile';
import Order from '../Order/Order';

class Main extends Component {

    render() {
        return (
            <div className='container' style={{marginTop: '50px'}}>
                <Switch>
                    <Route exact path='/' component={Order}/>
                    <Route path='/service-provider' component={ServiceProvider}/>
                    <Route path='/user-profile' component={UserProfile}/>
                </Switch>
            </div>
        );
    }

}

export default Main;