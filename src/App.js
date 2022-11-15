import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductForm from "./view/ProductForm/ProductForm";
import ProductList from "./view/ProductList/ProductList";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/:productPath" element={<ProductForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
