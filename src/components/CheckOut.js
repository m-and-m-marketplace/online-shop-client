import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5006";

function CheckOut(){
    const [shoppingCart, setCart] = useState();
    // const [user, setUser] = useState();
    // const [amount, setAmount] = useState();

    const storedToken = localStorage.getItem("authToken");
    const navigate = useNavigate();

    const getUser = () => { 
        axios
          .get(`${API_URL}/api/account`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then((response) => {
            // setUser(response.data)
            setCart(response.data.shoppingCart)
            // setAmount(response.data.shoppingCart.amount)
        })
          .catch((error) => console.log(error));
      };
      useEffect(() => {
        getUser();
      }, []);

      const handleDecrement = (object) => {
        // e.preventDefault();
        setCart(cart => 
          cart.map((item) => 
            object._id === item._id ? {...item, amount: item.amount - (item.amount > 1 ? 1:0) } : item
          )
        )
        console.log(shoppingCart)
        const infoUpdate = {
          newCart: shoppingCart
        //   objectId: shoppingCart._id
        }
        
        axios
          .put(`${API_URL}/api/orders/checkout`, infoUpdate, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then((response) => {
            navigate(`/checkout`);
          }).catch(err => console.log(err))
      }
      const handleIncrement = (objectId) => {
        // e.preventDefault();
        setCart(cart => 
          cart.map((item) => 
            objectId === item._id ? {...item, amount: item.amount + 1 } : item
          )
        )
      }

      const handleSubmit = (e) => {
        e.preventDefault();
        // const requestBody = { amount };
    
        axios
          .put(`${API_URL}/api/orders/checkout`, shoppingCart, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then((response) => {
            navigate(`/checkout`);
          });
      };


    return(
        <div>
        <h1>Checkout</h1>
        {shoppingCart?.map((item) => {
          return  (
            <div key={item._id}>
            <p>{item.product.title}</p>
            <form onSubmit={handleSubmit}>

            <input type="hidden" value={shoppingCart} />
            <button type="button" onClick={() => handleDecrement(item)}>-</button>
            |       {item.amount}       |
            <button type="button" onClick={() => handleIncrement(item._id)}>+</button>
            
            {/* <input type="number" value={item.amount} onChange={(e) => handleUpdate(e)}/> */}
            <button type="submit">save changes</button>
            </form>
            </div>
            )

        }) }
        
        
        </div>
    )
}

export default CheckOut