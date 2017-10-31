import React, {Component} from 'react';
import {Nav, NavItem} from 'react-bootstrap';

class Header extends Component {

    render() {
        return (
            <Nav bsStyle='pills'>
                <NavItem href='#/'>Bestellen</NavItem>
                <NavItem href='#/service-provider'>Anbieter</NavItem>
                <NavItem href='#/user-profile'>Benutzerprofil</NavItem>
            </Nav>
        );
    }

}

export default Header;