import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";

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
      .post(
        `${process.env.REACT_APP_API_URL}/api/products/create`,
        newProduct,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        fetchProductsCB();
        navigate("/products");
      })
      .catch((e) => console.log("error creating product on API", e));
    // //clear form
  };
  return (
    <div className="addProduct text-center">
      <h1 className="h3 mb-3 fw-normal">Add a Product</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <FloatingLabel
            controlId="floatingInput"
            label="Title"
            className="mb-3"
          >
            <Form.Control
              type="text"
              htmlFor="floatingInput"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group>
          <FloatingLabel
            controlId="floatingPrice"
            label="Price"
            className="mb-3"
          >
            <Form.Control
              type="number"
              min={0}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group>
          <FloatingLabel
            controlId="floatingDescription"
            label="Description"
            className="mb-3"
          >
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              onChange={(e) => handleFileUpload(e)}
              required
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group>
          <FloatingLabel
            controlId="floatingSpecs"
            label="Specs"
            className="mb-3"
          >
            <Form.Control
              type="text"
              value={specs}
              onChange={(e) => setSpecs(e.target.value)}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group>
          <FloatingLabel
            controlId="floatingRating"
            label="Rating"
            className="mb-3"
          >
            <Form.Control
              type="number"
              min={0}
              max={5}
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </FloatingLabel>
        </Form.Group>

        <Button variant="primary" type="submit">
          ADD PRODUCT
        </Button>
      </Form>
    </div>
  );
}
export default CreateProduct;
