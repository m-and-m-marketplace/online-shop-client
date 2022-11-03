import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function EditProduct({ fetchProductsCB }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image_URL, setImage_URL] = useState("");
  const [price, setPrice] = useState("");
  const [specs, setSpecs] = useState("");
  const [rating, setRating] = useState("");

  const { id } = useParams();

  const navigate = useNavigate();

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/products/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneProduct = response.data;
        setTitle(oneProduct.title);
        setDescription(oneProduct.description);
        setImage_URL(oneProduct.image_URL);
        setPrice(oneProduct.price);
        setSpecs(oneProduct.specs);
        setRating(oneProduct.rating);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const handleFileUpload = (e) => {
    const uploadData = new FormData();

    uploadData.append("image_URL", e.target.files[0]);

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/products/upload-image`, uploadData, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setImage_URL(response.data.image_URL);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { title, description, price, image_URL, specs, rating };

    const storedToken = localStorage.getItem("authToken");
    axios
      .put(`${process.env.REACT_APP_API_URL}/api/products/${id}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response);
        fetchProductsCB();
        navigate(`/products/${id}`);
      });
  };

  const deleteProduct = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/products/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        fetchProductsCB();
        navigate("/products");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="EditproductPage">
      <h3>Edit the product</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <label>Image:</label>
        <input
          type="file"
          name="image_URL"
          //value={image_URL}
          onChange={(e) => handleFileUpload(e)}
        />

        <label>Specifications:</label>
        <input
          type="text"
          name="specs"
          value={specs}
          onChange={(e) => setSpecs(e.target.value)}
        />

        <label>Rating:</label>
        <input
          type="number"
          min={0}
          max={5}
          name="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <input type="submit" value="Submit" />
      </form>

      <button onClick={deleteProduct}>Delete product</button>
    </div>
  );
}

export default EditProduct;
