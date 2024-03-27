import "./ProductSearch.css";
import Modal from "react-modal";
import { useState } from "react";
import ProductRegisterModal from "./ProductRegisterModal";

function ProductSearch({ askRefetchData }) {
  const [isproductRegisterModal, setProductRegisterModal] = useState(false);

  const openProductRegisterModal = () => {
    setProductRegisterModal(true);
  };
  const closeProductRegisterModal = () => {
    setProductRegisterModal(false);
  };

  return (
    <div id="product-search-container">
      <input type="text" name="search-input" placeholder="Search Products..." />
      <button type="button" onClick={openProductRegisterModal}>
        Register Product
      </button>
      <ProductRegisterModal
        isOpen={isproductRegisterModal}
        handleClose={closeProductRegisterModal}
        useRefetchData={askRefetchData}
      />
    </div>
  );
}

export default ProductSearch;
