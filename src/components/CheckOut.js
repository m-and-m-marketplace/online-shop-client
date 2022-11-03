import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function CheckOut() {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [user, setUser] = useState();
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  let totalCartPrice = 0;
  const getUser = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/account`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setUser(response.data);
        //console.log(response.data.shoppingCart);
        setShoppingCart(response.data.shoppingCart);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getUser();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let newOrder = {
      items: [],
    };

    for (let i = 0; i < shoppingCart.length; i++) {
      newOrder.items.push({
        product: shoppingCart[i].product,
        amount: shoppingCart[i].amount,
      });
      console.log(newOrder);
    }

    const storedToken = localStorage.getItem("authToken");
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/orders/create`, newOrder, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        emptyCart();
        navigate(`/account`);
      })
      .catch((e) => console.log("error creating order on API", e));
  };

  const emptyCart = () => {
    const cart = { shoppingCart: [] };
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/orders/delete`, cart, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        navigate(`/account`);
      })
      .catch((e) => console.log("error emptying shopping cart", e));
  };

  const deleteItem = (itemID) => {
    const newCart = shoppingCart.filter((item) => {
      return item._id !== itemID;
    });
    setShoppingCart(newCart);
  };

  /////
  const handleIncrement = (objectId) => {
    // e.preventDefault();
    setShoppingCart((cart) =>
      cart.map((item) =>
        objectId === item._id ? { ...item, amount: item.amount + 1 } : item
      )
    );
    console.log(shoppingCart);
  };
  const handleDecrement = (objectId) => {
    // e.preventDefault();
    setShoppingCart((cart) =>
      cart.map((item) =>
        objectId === item._id
          ? { ...item, amount: item.amount - (item.amount > 1 ? 1 : 0) }
          : item
      )
    );
    console.log(shoppingCart);
  };

  const handleUpdateAmount = () => {
    if (shoppingCart.length === 0) return;
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/orders/checkout`,
        { shoppingCart },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        // navigate(`/account`)
      })
      .catch((e) =>
        console.log("error sending updated shopping cart to DB", e)
      );
  };

  useEffect(() => {
    handleUpdateAmount();
  }, [shoppingCart]);

  return (
    <div>
      <h1>Checkout</h1>
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
        {shoppingCart &&
          shoppingCart.map((item, index) => {
            totalCartPrice += item.product?.price * item.amount;
            return (
              <Col className="wrap" key={index}>
                <Card>
                  <Card.Img
                    className="image-icon"
                    src={item.product && item.product.image_URL}
                    alt=""
                  />
                  <Card.Body>
                    <Card.Title>
                      Product: {item && item.product?.title}
                    </Card.Title>
                    <Card.Text>
                      Price per item: {item && item.product?.price}€
                    </Card.Text>
                    <Card.Text>Amount: {item && item.amount}</Card.Text>
                    <Card.Text>
                      <Button
                        className="m-3"
                        variant="secondary"
                        type="button"
                        onClick={() => handleDecrement(item._id)}
                      >
                        -
                      </Button>
                      <Button
                        className="m-3"
                        variant="secondary"
                        type="button"
                        onClick={() => handleIncrement(item._id)}
                      >
                        +
                      </Button>
                    </Card.Text>
                    <Card.Text>
                      <Button
                        className="m-3"
                        variant="danger"
                        onClick={() => {
                          deleteItem(item && item._id);
                        }}
                      >
                        Remove
                      </Button>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
      </Row>
      <span>Grand Total: {totalCartPrice}€</span>
      <form onSubmit={handleFormSubmit}>
        <br></br>
        <Button className="btn-lg m-3" variant="success" type="submit">
          Buy Now
        </Button>
      </form>
    </div>
  );
}

export default CheckOut;
