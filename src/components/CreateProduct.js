import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5006";

function CreateProduct({ fetchProductsCB }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image_URL, setImage_URL] = useState("");
  const [specs, setSpecs] = useState("");
  const [rating, setRating] = useState(0);

  const navigate = useNavigate();
  const storedToken = localStorage.getItem("authToken");

  const handleFileUpload = (e) => {
    const uploadData = new FormData();

    uploadData.append("image_URL", e.target.files[0]);

    axios
      .post(`${API_URL}/api/products/upload-image`, uploadData, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setImage_URL(response.data.image_URL);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      title,
      description,
      price,
      image_URL,
      specs,
      rating,
    };

    axios
      .post(`${API_URL}/api/products/create`, newProduct, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        fetchProductsCB();
        navigate("/products");
      })
      .catch((e) => console.log("error creating product on API", e));
    // //clear form
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <br />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label>Price</label>
        <br />
        <input
          type="number"
          min={0}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <label>Description</label>
        <br />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <label>Image</label>
        <br />
        <input
          type="file"
          onChange={(e) => handleFileUpload(e)}
        />
        <br />
        <label>Specifications</label>
        <br />
        <input
          type="text"
          value={specs}
          onChange={(e) => setSpecs(e.target.value)}
        />
        <br />
        <label>Rating</label>
        <br />
        <input
          type="number"
          min={0}
          max={5}
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <br />
        <button type="submit">ADD PRODUCT</button>
      </form>
    </>
  );
}
export default CreateProduct;
