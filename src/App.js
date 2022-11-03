import axios from "axios";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import NavigationSystem from "./components/Navbar";
import ProductDetails from "./components/ProductDetails";
import HomePage from "./components/HomePage";
import ProfilePage from "./components/ProfilePage";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import CreateProduct from "./components/CreateProduct";
import EditProduct from "./components/EditProduct";
import CheckOut from "./components/CheckOut";
import IsAnon from "./components/IsAnon";
import IsPrivate from "./components/IsPrivate";
import OrderDetails from "./components/OrderDetails";

function App() {
  const [products, setProducts] = useState([]);
  const [admin, setAdmin] = useState();
  const storedToken = localStorage.getItem("authToken");

  const getAllProducts = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/products`, {
        // headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  const getUser = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/account`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        if (response.data.admin === true) {
          setAdmin(true);
        } else {
          setAdmin(false);
        }
        console.log(admin);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getUser();
  });

  return (
    <div className="App">
      <NavigationSystem admin={admin}></NavigationSystem>
      <Routes>
        <Route path="/signup" element={<IsAnon><SignupPage /></IsAnon>} />
        <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>} />
        <Route path="/" element={<HomePage products={products} />} />
        <Route
          path="/products/:id/edit"
          element={<IsPrivate><EditProduct fetchProductsCB={getAllProducts} /></IsPrivate>}
        />
        <Route path="/products" element={<IsPrivate><ProductList products={products} /></IsPrivate> } />
        <Route
          path="/products/create"
          element={<IsPrivate><CreateProduct fetchProductsCB={getAllProducts}  /></IsPrivate>}
        />
        <Route
          path="/products/:id"
          element={<IsPrivate><ProductDetails products={products} admin={admin}/></IsPrivate>}
        />
        <Route
          path="/orders/:orderId"
          element={<IsPrivate><OrderDetails products={products} admin={admin}/></IsPrivate>}
        />
        <Route path="/account" element={<IsPrivate><ProfilePage /></IsPrivate>}/>
        <Route path="/orders/checkout" element={<IsPrivate><CheckOut /></IsPrivate>}/>
      </Routes>
    </div>
  );
}

export default App;