import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

function OrderDetails() {
  const [order, setOrder] = useState(null);
  const { orderId } = useParams();
  let totalOrderPrice = 0;

  const getOrder = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneOrder = response.data;
        setOrder(oneOrder);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getOrder();
  }, []);
  return (
    <div>
      <h3>Order: {order && order._id}</h3>

      <Row
        xs={1}
        md={2}
        lg={4}
        className="g-4"
        style={{
          paddingTop: "3%",
          paddingLeft: "5%",
          paddingRight: "5%",
          paddingBottom: "3%",
        }}
      >
        {order &&
          order.items.map((item) => {
            totalOrderPrice += item.product?.price * item.amount;
            return (
              <Col>
                <Card>
                  <Card.Img
                    className="image-icon"
                    src={item.product && item.product.image_URL}
                    alt=""
                  />
                  <Card.Title>
                    Product: {item.product && item.product.title}
                  </Card.Title>
                  <Card.Text>Amount: {item && item.amount}</Card.Text>
                  <Card.Text>
                    Price per Item: {item && item.product.price}€
                  </Card.Text>
                </Card>
              </Col>
            );
          })}
      </Row>
      <h5>Total Cost: {totalOrderPrice}€</h5>
      <p>Date Ordered: {order && order.createdAt}</p>
      <Link to="/account">
        <Button variant="secondary">Back to profile</Button>
      </Link>
    </div>
  );
}

export default OrderDetails;
