import axios from "axios";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import Navbar from "./components/Navbar";
import ProductDetails from "./components/ProductDetails";
import HomePage from "./components/HomePage";
import ProfilePage from "./components/ProfilePage";

const API_URL = "http://localhost:5006";

function App() {
  const [products, setProducts] = useState([]);

  const getAllProducts = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/products`, {
        // headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductList products={products} />} />
        <Route path="/products/:id" element={<ProductDetails products={products} />} />
        {/* <Route path="/" element={<ProfilePage />}/> */}
      </Routes>
    </div>
  );
}

export default App;
