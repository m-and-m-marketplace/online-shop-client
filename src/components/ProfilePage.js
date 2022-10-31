import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const API_URL = "http://localhost:5006";

function ProfilePage() {
    const [user, setUser] = useState();

    const navigate = useNavigate();

    const storedToken = localStorage.getItem("authToken");

    const getUser = () => {
        const storedToken = localStorage.getItem("authToken");
    
        axios
          .get(`${API_URL}/api/account`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then((response) => {
            console.log(response.data.watchlist);
            setUser(response.data)
        })
          .catch((error) => console.log(error));
      };
      useEffect(() => {
        getUser();
      }, []);


  


    return(
        <div>
            <div>
                <p>{user && user.name}</p>
            </div>
            <div>
            <h3>Shopping Cart:</h3>
                {user && user.shoppingCart.map((cart, i) => {
                    return(
                        <div key={i}>
                        <div >{cart.product && cart.product.title}</div>
                        <img src={cart.product && cart.product.image_URL} alt=""/>
                        </div>
                    )
                })}
                <Link to="/orders/checkout">Checkout</Link>
            </div>
            <br/>
            <h3>Watchlist:</h3>
            <div>{user && user.watchlist.map((item, i) => {
                    return(
                        <div key ={i}>{item.title && item.title}</div>
                    )
                })}</div>
        </div>
    )
}


export default ProfilePage;