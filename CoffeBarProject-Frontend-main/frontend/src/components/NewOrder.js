import { Card } from "react-bootstrap"
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { useState, useCallback, useEffect } from "react";
import OrderDataService from "../services/orders";

import './Order.css'

const NewOrder = ({
    user
}) => {
    const [neworder, setNeworder] = useState({
        id: null,
        name: "",
        userId: "",
        date: "",
        quantity: "",
        coffee_name: ""
    });

    const retrieveNewOrder = useCallback(() => {
        OrderDataService.getNewOrder(user.googleId)
        .then(response => {
            setNeworder(response.data);
        })
        .catch(e => {
            console.log(e);
        });
      }, [user]);

    useEffect(() => {
        if (user !== null) {
            retrieveNewOrder()
        }
      }, [user, retrieveNewOrder]);

    return (
        <Container className="main-container">
            <div>
                <Col>               
                    <Card className="receipt">
                        <Card.Title className="titleStyle">
                            Here is your new order info:
                        </Card.Title>
                        <Card.Body>
                            <Card.Text>
                                Customer Name: {user.name}
                            </Card.Text>
                            <Card.Text>
                                Coffee Name: {neworder.coffee_name}
                            </Card.Text>
                            <Card.Text>
                                Quantity: {neworder.quantity}
                            </Card.Text>
                            <Card.Text>
                                Order time: {neworder.date}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </div>
        </Container>
    )
}

export default NewOrder;