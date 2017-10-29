import React, {Component} from 'react';
import {Button, Modal, Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import ServiceEditor from './ServiceEditor';

class ServiceProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            services: [
                {
                    id: 1,
                    name: 'Raphaels Brötchenservice'
                },
                {
                    id: 2,
                    name: 'Raphaels Mähservice'
                },
                {
                    id: 3,
                    name: 'Raphaels Einkaufservice'
                },
            ],
            deliveredOrders: [
                {id: 98},
                {id: 37},
                {id: 15},
            ],
            addServiceVisible: false,
        }
    }

    handleAddService() {
        this.setState({addServiceVisible: true});
    }


    handleAddServiceClose() {
        this.setState({addServiceVisible: false});
    }

    render() {
        return (
            <div>
                <Table striped bordered>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Aktion</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.services.map(service => {
                            return <tr key={service.id}>
                                <td>{service.name}</td>
                                <td><Link to={'/service-detail/:' + service.id}><Button>Anzeigen</Button></Link></td>
                            </tr>
                        })
                    }
                    <tr>
                        <td colSpan={2}>
                            <Button bsStyle='primary' onClick={this.handleAddService.bind(this)}>Neue Dienstleistung</Button>
                        </td>
                    </tr>
                    </tbody>
                </Table>
                {this.state.addServiceVisible ? <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Dienstleistung hinzufügen</Modal.Title>
                        <Modal.Body>
                            <ServiceEditor />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button bsStyle='primary'>Speichern</Button>
                            <Button onClick={this.handleAddServiceClose.bind(this)}>Abbrechen</Button>
                        </Modal.Footer>
                    </Modal.Header>
                </Modal.Dialog> : null}
            </div>
        );
    }

}

export default ServiceProvider;