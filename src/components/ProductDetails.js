import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ProductDetails({ products }) {
  const { id } = useParams();
  const [amount, setAmount] = useState(1);
  const [admin, setAdmin] = useState();

  const navigate = useNavigate();

  const storedToken = localStorage.getItem("authToken");

  const details = products.find((product) => product._id === id);


  //add to shopping cart
  const handleSubmitCart = (e) => {
    e.preventDefault();
    const newOrder = {
      items: {
        product: details,
        amount,
      },
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/orders/shopping-cart`, newOrder, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        //fetchProductsCB();
        navigate("/account");
      })
      .catch((e) => console.log("error adding to shopping cart", e));
    // //clear form
  };

  //create order
  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrder = {
      items: {
        product: details,
        amount,
      },
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/orders/create`, newOrder, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        //fetchProductsCB();
        navigate("/");
      })
      .catch((e) => console.log("error creating order on API", e));
    // //clear form
  };

  // //add to watchlist
  // const handleSubmitWatchlist = (e) => {
  //   e.preventDefault();
  //   const newProduct = {
  //     newItem: details,
  //   };

  //   axios
  //     .post(`${process.env.REACT_APP_API_URL}/api/products/${id}/add`, newProduct, {
  //       headers: { Authorization: `Bearer ${storedToken}` },
  //     })
  //     .then((response) => {
  //       //fetchProductsCB();
  //       navigate("/");
  //     })
  //     .catch((e) => console.log("error adding to watchlist", e));
  //   // //clear form
  // };

  const getUser = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/account`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        if (response.data.admin === true) {
          setAdmin(true);
        } else {
          setAdmin(false);
        }
        console.log(admin);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getUser();
  }, [details]);

  if (admin) {
    return (
      <>
      <p>Products - {details?.title}</p>
      <Container style={{ paddingTop: '3%', paddingBottom: "13%" }}>
        <Row>
        <Col><img className="rounded-3" src={details?.image_URL} alt={details?.title} /></Col>
        <Col style={{ textAlign: 'left', marginLeft: '4%' }}>
          <h2>{details?.title}</h2>
          <p>{details?.description}</p>
          <p>${details?.price}.00</p>
          <h6>Specifications</h6>
          <p>{details?.specs}</p>
          {/* <p>{details.rating}</p> */}

          <form onSubmit={handleSubmit}>
            <input type="hidden" value={details} />
            <label>Amount</label>
            <input
              type="number"
              min={1}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            {/* <button type="submit">Buy Now</button> */}
          </form>
          {/* <form onSubmit={handleSubmitWatchlist}>
            <input type="hidden" value={details} />
            <button type="submit">Add to watchlist</button>
          </form> */}
          <form onSubmit={handleSubmitCart}>
            <input type="hidden" value={details} />
            <Button variant="primary" type="submit">Add to cart</Button>
          </form>
          <br/>
          <Link to={`/products/${details?._id}/edit`}>Edit this product</Link>
        </Col>
        </Row>
      </Container>
      </>
    );
  } else {
    return (
      <>
      <p>Products - {details?.title}</p>
      <Container style={{ paddingTop: '3%', paddingBottom: "13%" }}>
        <Row>
        <Col><img className="rounded-3" src={details?.image_URL} alt={details?.title} /></Col>
        <Col style={{ textAlign: 'left', marginLeft: '4%' }}>
          <h2>{details?.title}</h2>
          <p>{details?.description}</p>
          <p>${details?.price}.00</p>
          <h6>Specifications</h6>
          <p>{details?.specs}</p>
          {/* <p>{details.rating}</p> */}

          <form onSubmit={handleSubmit}>
            <input type="hidden" value={details} />
            <label>Amount</label>
            <input
              type="number"
              min={1}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            {/* <button type="submit">Buy Now</button> */}
          </form>
          {/* <form onSubmit={handleSubmitWatchlist}>
            <input type="hidden" value={details} />
            <button type="submit">Add to watchlist</button>
          </form> */}
          <form onSubmit={handleSubmitCart}>
            <input type="hidden" value={details} />
            <Button variant="primary" type="submit">Add to cart</Button>
          </form>
        </Col>
        </Row>
      </Container>
      </>
    );
  }
}

export default ProductDetails;