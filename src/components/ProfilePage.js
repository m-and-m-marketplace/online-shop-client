import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function ProfilePage() {
    const [user, setUser] = useState();

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