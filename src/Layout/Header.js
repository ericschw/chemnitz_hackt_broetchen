import React, {Component} from 'react';
import {Nav, NavItem} from 'react-bootstrap';

class Header extends Component {

    render() {
        return (
            <Nav bsStyle='pills'>
                <NavItem href='#/'>Abonnierte Dienste</NavItem>
                <NavItem href='#/service-provider'>Dienstleister</NavItem>
                <NavItem href='#/orders'>Bestellungsliste</NavItem>
                <NavItem href='#/user-profile'>Anmeldedaten</NavItem>
            </Nav>
        );
    }

}

export default Header;