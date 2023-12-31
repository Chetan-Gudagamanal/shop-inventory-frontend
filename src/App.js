import "./App.css";
import { Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import LoginPage from "./pages/UserLogin/LoginPage";
import RegisterPage from "./pages/UserRegister/RegisterPage";
import HomePage from "./pages/HomePage/HomePage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import { backend_url } from "./constants";
import { useNavigate } from "react-router-dom";

export const CustomContext = React.createContext();

function App() {
  const [status, setStatus] = useState("");
  const [loggedInUserId, setLoggedInUserId] = useState("");
  const [productsData, setProductsData] = useState([]);
  const [shopData, setShopData] = useState([]);
  const navigate = useNavigate();
  const handleViewProducts = async () => {
    console.log(shopData[0]._id);
    const url = `${backend_url}/products_in_shop/${shopData[0]["_id"]}`;
    const rawData = await fetch(url, {
      method: "GET",
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
        "Content-Type": "application/json",
      },
    });
    if (rawData.status == 200) {
      let jsonData = await rawData.json().then((res) => {
        setProductsData(res.products);
        navigate("/products");
      });
    } else {
      let jsonData = await rawData.json();
      console.log(jsonData);
    }
  };
  return (
    <CustomContext.Provider
      value={{
        handleViewProducts,
        loggedInUserId,
        setLoggedInUserId,
        productsData,
        setProductsData,
        shopData,
        setShopData,
      }}
    >
      <div className="App">
        <section className="section-class">
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route
              path="/"
              element={<LoginPage setLoggedInUserId={setLoggedInUserId} />}
            />
          </Routes>
        </section>
      </div>
    </CustomContext.Provider>
  );
}

export default App;
