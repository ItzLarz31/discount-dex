import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import "./App.css";

function App() {
  return (
    <div className="page">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
