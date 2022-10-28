import { useParams } from "react-router-dom";

function ProductDetails({products}) {
    const { id } = useParams();

    const details = products.find(product => product._id === id)

    return(
        <div>
            <img src={details.image_URL} alt={details.title}/>
            <h2>{details.title}</h2>
            <p>{details.description}</p>
            <p>{details.price}</p>
            <p>{details.specs}</p>
            <p>{details.rating}</p>
        </div>
    )
}


export default ProductDetails;