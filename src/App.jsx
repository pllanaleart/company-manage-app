import "./App.css";
import Navbar from "./assets/components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./assets/pages/Home";
import Products from "./assets/pages/Products";
import Stock from "./assets/pages/Stock";
import Invoices from "./assets/pages/Invoices";
import Sellings from "./assets/pages/Sellings";
import Purchases from "./assets/pages/Purchases";
import Employees from "./assets/pages/Employees";
import About from "./assets/pages/About";
import "toastr/build/toastr.min.css";

function App() {
  return (
    <div id="grid-container">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/sellings" element={<Sellings />} />
        <Route path="/purchases" element={<Purchases />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
