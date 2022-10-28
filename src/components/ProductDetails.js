import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const API_URL = "http://localhost:5006";

function ProductDetails({products}) {
    const { id } = useParams();
    const [amount, setAmount] = useState(1)

    const navigate = useNavigate();

    const details = products.find(product => product._id === id)

    const handleSubmit = (e) => {
        e.preventDefault();
        const newOrder = {
            items: {
                product: details,
                amount
            }
        }
        const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${API_URL}/api/orders/create`, newOrder, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        //fetchProductsCB();
        navigate("/");
      })
      .catch((e) => console.log("error creating order on API", e));
    // //clear form
  }

    return(
        <div>
            <img src={details.image_URL} alt={details.title}/>
            <h2>{details.title}</h2>
            <p>{details.description}</p>
            <p>{details.price}</p>
            <p>{details.specs}</p>
            <p>{details.rating}</p>
            <Link to= {`/products/${details._id}/edit`}>Edit this product</Link>
            <form onSubmit={handleSubmit}>
            <input type="hidden" value={details}/>
            <label>Amount</label>
            <input type="number" min={1} value={amount} onChange={(e) => setAmount(e.target.value)}/>

                <button type="submit">Buy Now</button>
            </form>
        </div>
    )
}


export default ProductDetails;