import { Link } from "react-router-dom";

function ProductList({ products }) {
  return (
    <div>
      <h1>ProductList</h1>
      <>
        {products &&
          products.map((product) => {
            return (
              <div  key={product._id}>
                <img className="image-icon" src={product.image_URL} alt={product.title}/>
                <h5>{product.title}</h5>
                <Link to={`/products/${product._id}`}>More details</Link>
              </div>
            );
          })}
      </>
    </div>
  );
}

export default ProductList;