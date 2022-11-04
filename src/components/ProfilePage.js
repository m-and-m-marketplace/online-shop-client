import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Container, ListGroupItem } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';

function ProfilePage() {
    const [user, setUser] = useState();
    const [orders, setOrders] = useState();
    const navigate = useNavigate();

    const storedToken = localStorage.getItem("authToken");

    const getUser = () => {
        
    
        axios
          .get(`${process.env.REACT_APP_API_URL}/api/account`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then((response) => {
           // console.log(response.data.watchlist);
            setUser(response.data)
        })
          .catch((error) => console.log(error));
      };
      useEffect(() => {
        getUser();
      }, []);


      const getOrders = () => {
        axios
          .get(`${process.env.REACT_APP_API_URL}/api/orders`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then((response) => {
           // console.log(response.data.watchlist);
           console.log(response.data);
            setOrders(response.data)
        })
          .catch((error) => console.log(error));
      };
      useEffect(() => {
        getOrders();
      }, []);

      const emptyCart = () => {
        const cart = {shoppingCart: []}
        axios
        .post(`${process.env.REACT_APP_API_URL}/api/orders/delete`, cart, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
            getUser();
         // navigate(`/account`)
        })
        .catch((e) => console.log("error emptying shopping cart", e));
      }
  


    return(
        <div>
            <Row style={{ paddingTop: '3%', marginLeft: '3%', marginRight: '3%' }}>
            <Col>
                <Row>
                <h4>Shopping Cart</h4>
                {user && user.shoppingCart.map((cart, i) => {
                    return(
                      <Col md={6} lg={4} className="g-4" style={{ paddingTop: '6px' }}>
                        <Card key={i}>
                          <Card.Img variant="top" src={cart.product && cart.product.image_URL} alt={cart.product && cart.product.title}/>
                          <Card.Body>
                            <Card.Title>{cart.product && cart.product.title}</Card.Title>
                            <Card.Text>$ {cart.product && cart.product.price}.00</Card.Text>
                            <Card.Text>{cart.product && cart.product.amount}</Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    )
                  })}
                </Row >
                <Container style={{ marginTop:'3%' }}>
                <Button href="/orders/checkout" style={{ marginRight: '3%' }}>Checkout</Button>
                <Button variant="danger" onClick={emptyCart}>Clear Shopping Cart</Button>
                </Container>
            </Col>

            {/* <h3>Watchlist:</h3>
            <div>{user && user.watchlist.map((item, i) => {
                    return(
                        <div key ={i}>{item.title && item.title}</div>
                    )
                })}</div> */}

                <Col>
                <h4>Your Orders</h4>
                <Container>
                  <ListGroup style={{ paddingTop: '30px' }}>{orders && orders.map((order) => {
                    return(
                        <ListGroup.Item key ={order._id}>Order Number: <Link to={`/orders/${order && order._id}`}>{order && order._id}</Link></ListGroup.Item>
                    )
                })}</ListGroup>
                </Container>
                </Col>
            </Row>
        </div>
    )
}


export default ProfilePage;