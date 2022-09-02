import React from "react";
import { useState, useEffect, useCallback } from "react";
import CoffeeDataService from "../services/coffees";
import { useNavigate, useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import { useLocation } from "react-router-dom";
import NewOrder from "./NewOrder";

import "./Order.css";


const Order = ({ user }) => {
  const navigate = useNavigate()
  let params = useParams();
  let location = useLocation();
  let editing = false;
  let initialCoffeeNameState = "";
  let initialQuantityState = "";
  // initialReviewState will have a different value
  // if we're editing an existing review
  if (location.state !== null) {
      editing = true;
      initialCoffeeNameState = location.state.currentOrder.order
  }

  const [coffeename, setCoffeename] = useState(initialCoffeeNameState);
  const [quantity, setQuantity] = useState(initialQuantityState);
//   const [renderInfo, setRenderInfo] = useState(false);
  const [neworder, setNeworder] = useState(null);

  const onChangeCoffeeName = e => {
      const coffeename = e.target.value;
      setCoffeename(coffeename);
  }

  const onChangeQuantity = e => {
      const quantity = e.target.value;
      setQuantity(quantity);
  }

  const saveOrder = () => {
    var data = {
        name: user.name,
        user_id: user.googleId,
        coffee_name: coffeename,
        quantity: quantity
    }

    if (editing) {
        // TODO: Handle case where an existing
        // review is being updated
        let orderId = location.state.currentOrder._id;
        data._id = orderId;

        CoffeeDataService.updateOrder(data)
            .then(Response => {
                navigate("/neworders")
                // // setRenderInfo(true)
                // setNeworder(data)
                // console.log(params)
                // window.alert("We have received your order!");
            })
            .catch(e => {
                console.log(e);
            })
        
    } else {
        CoffeeDataService.createOrder(data)
            .then(Response => {
                navigate("/neworders")
                // // setRenderInfo(true)
                // console.log(params)
                // setNeworder(data)
                // window.alert("We have received your order!");
            })
            .catch(e => {
                console.log(e);
            });
    }
  }

  return (
    <Container className="main-container">
      <Form>
          <Form.Group className="mb-3">
              <Form.Label>{ editing ? "Edit" : "Create" } Orders</Form.Label>
                <Form.Control
                    type="text"
                    required
                    placeholder='Enter coffee name'
                    coffeeName={ coffeename }
                    onChange={ onChangeCoffeeName }
                    defaultValue={ editing ? null : ""}
                />
                <Form.Control
                    type="text"
                    required
                    placeholder='Enter coffee Quantity'
                    quantity={ quantity }
                    onChange={ onChangeQuantity }
                    defaultValue={ editing ? null : ""}
                />
          </Form.Group>
              <Button variant="primary" onClick={ saveOrder }>
                  Submit
              </Button>
      </Form>
    </Container>
  )
}

export default Order;
