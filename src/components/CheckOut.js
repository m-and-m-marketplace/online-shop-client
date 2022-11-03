import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CheckOut(){
    const [shoppingCart, setShoppingCart] = useState();
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
            console.log(response.data.shoppingCart);
            setShoppingCart(response.data.shoppingCart)
        })
          .catch((error) => console.log(error));
      };
      useEffect(() => {
        getUser();
      }, []);

      

      const handleFormSubmit = (e) => {
        e.preventDefault();
        let newOrder = {
          items: []
        }

        for(let i=0; i<shoppingCart.length; i++ ){
          newOrder.items.push( {product: shoppingCart[i].product, amount: shoppingCart[i].amount}  )
          console.log(user.shoppingCart[i]); 
        }
    
        const storedToken = localStorage.getItem("authToken");
        axios
          .post(`${process.env.REACT_APP_API_URL}/api/orders/create`, newOrder, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then((response) => {
            emptyCart();
            navigate(`/account`)
          })
          .catch((e) => console.log("error creating order on API", e));
      };

      const emptyCart = () => {
        const cart = {shoppingCart: []}
        axios
        .post(`${process.env.REACT_APP_API_URL}/api/orders/delete`, cart, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          navigate(`/account`)
        })
        .catch((e) => console.log("error emptying shopping cart", e));
      }

       const deleteItem = (itemID) => {
         const newCart = shoppingCart.filter((item) => {
           return item._id !== itemID
         });
         setShoppingCart(newCart)
       }


    return(
        <div>
        <h1>Checkout</h1>
        
            <div>
            
            
            {shoppingCart && shoppingCart.map((item, index) => {
          return  (
                <div key={index}>
                  <div>Product: {item && item.product?.title}</div>
                  <img className="image-icon" src={item.product && item.product.image_URL} alt=""/>
                  <div>Amount: {item && item.amount}</div>
                  <button onClick={()=>{deleteItem(item && item._id)}}>Delete</button>
                </div>
            )

        }) }
        <form onSubmit={handleFormSubmit}>
            <br></br>
            <button type="submit">Buy Now</button>
            </form>
            </div>
            
        
        
        </div>
    )
}

export default CheckOut