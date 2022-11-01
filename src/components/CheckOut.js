import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CheckOut(){
    const [amount, setAmount] = useState();
    const [user, setUser] = useState();
    const storedToken = localStorage.getItem("authToken");
    const navigate = useNavigate();

    const getUser = () => {
        
    
        axios
          .get(`${process.env.REACT_APP_API_URL}/api/account`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then((response) => {
            setUser(response.data)
        })
          .catch((error) => console.log(error));
      };
      useEffect(() => {
        getUser();
      }, []);


      const handleFormSubmit = (e) => {
        e.preventDefault();
        const requestBody = { amount };
    
        const storedToken = localStorage.getItem("authToken");
        axios
          .put(`${process.env.REACT_APP_API_URL}/api/orders/checkout`, requestBody, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then((response) => {
            navigate(`/checkout`);
          });
      };


    return(
        <div>
        <h1>Checkout</h1>
        {user && user.shoppingCart.map((item) => {
          return  (
            <div>
            <p>{item.product.title}</p>
            <form>
            <label>Amount:</label>
            <input type="number" value={item.amount} onChange={(e) => setAmount(e.target.value)}/>
            <button type="submit">save changes</button>
            </form>
            </div>
            )

        }) }
        
        
        </div>
    )
}

export default CheckOut