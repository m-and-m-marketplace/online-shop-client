import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
            <div>
            </div>
            <div>
            <h3>Shopping Cart:</h3>
                {user && user.shoppingCart.map((cart, i) => {
                    return(
                        <div key={i}>
                        <div >{cart.product && cart.product.title}</div>
                        <img className="image-icon" src={cart.product && cart.product.image_URL} alt=""/>
                        </div>
                    )
                })}
                <button><Link to="/orders/checkout">Checkout</Link></button>
                <br></br>
                <button onClick={emptyCart}>Clear Shopping Cart</button>
            </div>
            <br/>
            {/* <h3>Watchlist:</h3>
            <div>{user && user.watchlist.map((item, i) => {
                    return(
                        <div key ={i}>{item.title && item.title}</div>
                    )
                })}</div> */}
                <br></br>
                <h3>Your Orders:</h3>
            <div>{orders && orders.map((order, i) => {
                    return(
                        <div key ={i}>
                        <h5>Order Number: <Link to={`/orders/${order && order._id}`}>{order && order._id}</Link></h5>
                        <br></br>
                        </div>
                    )
                })}</div>
        </div>
    )
}


export default ProfilePage;