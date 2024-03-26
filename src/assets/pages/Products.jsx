import "./Products.css";
import { useState } from "react";
import ProductsTable from "../components/products/ProductsTable";
import ProductSearch from "../components/products/ProductSearch";

function Products() {
  const [isproductRegisterModal, setProductRegisterModal] = useState(false);

  const openProductRegisterModal = () => {
    setProductRegisterModal(true);
  };
  const closeProductRegisterModal = () => {
    setProductRegisterModal(false);
  };
  return (
    <div id="products-container">
      <ProductSearch
        isOpen={isproductRegisterModal}
        handleClose={closeProductRegisterModal}
      />
      <ProductsTable />
    </div>
  );
}

export default Products;
