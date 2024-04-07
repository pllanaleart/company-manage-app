import "./ProductSearch.css";
import { useState, useEffect } from "react";
import ProductRegisterModal from "./ProductRegisterModal";
import toastr from "toastr";

function ProductSearch({ askRefetchData, setSearchInput }) {
  const [isproductRegisterModal, setProductRegisterModal] = useState(false);
  const [searchProductInput, setSearchProductInput] = useState("");
  useEffect(() => {
    async function productSearched() {
      try {
        const response = await fetch(
          `http://localhost:8080/products/${searchProductInput}`
        );
        const data = await response.json();
        if (response.ok) {
          setSearchInput(data);
        } else {
          setSearchInput("");
          toastr.error(`Cannot find the product with id ${searchProductInput}`);
        }
      } catch (error) {
        console.log(error);
        setSearchInput("");
      }
    }
    if (searchProductInput) {
      productSearched();
    }
  }, [searchProductInput]);

  const openProductRegisterModal = () => {
    setProductRegisterModal(true);
  };
  const closeProductRegisterModal = () => {
    setProductRegisterModal(false);
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    if (value.trim() === "") {
      setSearchProductInput("");
      setSearchInput("");
    } else {
      setSearchProductInput(value);
    }
  };
  return (
    <div id="product-search-container">
      <input
        type="text"
        name="search-input"
        placeholder="Search Products..."
        value={searchProductInput}
        onChange={(e) => handleSearch(e)}
      />
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
