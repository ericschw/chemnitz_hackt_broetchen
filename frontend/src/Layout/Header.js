import React, {Component} from 'react';
import {Nav, NavItem} from 'react-bootstrap';
import api from '../Api/api';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showProvider: false,
        };
    }

    componentDidMount() {
        api.getMe().then(user => this.setState({showProvider: user.isProvider}));
    }

    render() {
        return (
            <Nav bsStyle='pills'>
                <NavItem href='#/'>Bestellen</NavItem>
                { this.state.showProvider ? <NavItem href='#/service-provider'>Anbieter</NavItem> : null }
                <NavItem href='#/user-profile'>Benutzerprofil</NavItem>
            </Nav>
        );
    }

}

export default Header;