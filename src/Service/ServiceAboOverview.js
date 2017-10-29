import React, {Component} from 'react';
import {Button, Col, Grid, Row, Thumbnail} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class ServiceAboOverview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            abos: [
                {
                    id: 1,
                    name: 'Raphaels Brötchendienst',
                    description: 'Brötchenbringedienst',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Korb_mit_Br%C3%B6tchen.JPG/320px-Korb_mit_Br%C3%B6tchen.JPG',
                },
                {
                    id: 2,
                    name: 'Raphaels Mähdienst',
                    description: 'Ich bringe Ihren Rasen in Ordnung.',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Rasenmaeher.jpg/320px-Rasenmaeher.jpg',
                },
                {
                    id: 2,
                    name: 'Raphaels Zeitungsdienst',
                    description: 'Ich bringe Ihre Zeitung.',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/1/10/A_stack_of_newspapers.jpg',
                },
            ],
        };
    }

    render() {
        return (
            <div>
                <Grid>
                    <Row>
                        {this.state.abos.map(abo => {
                            return (
                                <Col xs={6} md={4}>
                                    <Thumbnail key={abo.id} src={abo.image}>
                                        <h3>{abo.name}</h3>
                                        <p>{abo.description}</p>
                                        <Link to={'/place-order/' + abo.id}><Button>Anzeigen</Button></Link>
                                    </Thumbnail>
                                </Col>
                            )
                        })}
                    </Row>
                </Grid>
            </div>
        );
    }

}

export default ServiceAboOverview;