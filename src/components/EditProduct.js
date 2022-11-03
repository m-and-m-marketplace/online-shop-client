import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";

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
      .post(
        `${process.env.REACT_APP_API_URL}/api/products/upload-image`,
        uploadData,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
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

      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3">
          <FloatingLabel
          controlId="floatingInput"
            label="Title"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          
          <FloatingLabel
          controlId="floatingDescription"
            label="Description"
            className="mb-3"
          >
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          </FloatingLabel>
          
        </Form.Group>

        <Form.Group className="mb-3">
        <FloatingLabel
          controlId="floatingPrice"
            label="Price"
            className="mb-3"
          >
            <Form.Control
            type="number"
            min={1}
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          </FloatingLabel>
          
          
        </Form.Group>

        <Form.Group className="mb-3">
          
          <FloatingLabel
          controlId="floatingSpecs"
            label="Specs"
            className="mb-3"
          >
          <Form.Control
            as="textarea"
            rows={3}
            name="specs"
            value={specs}
            onChange={(e) => setSpecs(e.target.value)}
          />
          </FloatingLabel>
          
        </Form.Group>

        <Form.Group className="mb-3">
        <FloatingLabel
          controlId="floatingSpecs"
            label="Rating"
            className="mb-3"
          >
            <Form.Control
            type="number"
            min={1}
            name="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          </FloatingLabel>
          
        </Form.Group>

        <Form.Group>
          <FloatingLabel
            controlId="floatingImage"
            label="Image"
            className="mb-3 pt-2"
          >
            <Form.Control
              type="file"
              name="image_URL"
              onChange={(e) => handleFileUpload(e)}
              required
            />
          </FloatingLabel>
        </Form.Group>

        <Button className="mb-3" variant="primary" type="submit">
          Submit Changes
        </Button>
      </Form>

      <Button variant="danger" onClick={deleteProduct}>Delete product</Button>
    </div>
  );
}

export default EditProduct;
