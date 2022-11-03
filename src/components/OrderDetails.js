import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function OrderDetails() {
  const [order, setOrder] = useState(null);
  const { orderId } = useParams();
  let totalOrderPrice = 0

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
      

      <h4>Order: {order && order._id}</h4> 

      

      {order && order.items.map((item) => {
        totalOrderPrice += item.product?.price * item.amount;
        return (
            <div>
            <img className="image-icon" src={item.product && item.product.image_URL} alt=""/>
            <div>Product: {item.product && item.product.title}</div>
            <div>Amount: {item && item.amount}</div>
            <div>Price per Item: {item && item.product.price}€</div>
            <br></br>
            </div>
        )
      })}
      <span>Total Cost: {totalOrderPrice}€</span>
      <p>Date Ordered: {order && order.createdAt}</p>
      <Link to="/account">
        <button>Back to profile</button>
      </Link>
    </div>
  );
}

export default OrderDetails;