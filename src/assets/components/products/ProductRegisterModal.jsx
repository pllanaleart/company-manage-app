import "./ProductRegisterModal.css";
import { useState } from "react";
import Modal from "react-modal";
import toastr from "toastr";

function ProductRegisterModal({ isOpen, handleClose }) {
  const [barcodeNumber, setBarcodeNumber] = useState("");
  const [description, setDescription] = useState("");
  const [mrp, setMrp] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  async function handleSubmit() {
    const newProduct = {
      name: name,
      description: description,
      mrp: mrp,
      barcodeNumber: barcodeNumber,
      price: price,
    };

    try {
      const response = await fetch("http://localhost:8080/products", {
        method: "POST",
        body: JSON.stringify(newProduct),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (response.ok) {
        // Handle successful registration
        toastr.success("Product Registered successfully!");
        handleClose(); // Close the modal
      } else {
        // Handle registration failure
        console.error("Failed to register product");
      }
    } catch (error) {
      console.error("Error occurred while registering product", error);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      appElement={document.getElementById("root")}
      id="product-register-container"
      style={{ content: { inset: "revert-layer" } }}
    >
      <form className="flex-input">
        <h3> product</h3>
        {/* Your form fields here */}
        <input
          type="text"
          placeholder="Name"
          id="name-register"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          rows={4}
          cols={50}
          placeholder="Description"
          id="description-register"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Barcode"
          id="barconde-register"
          required
          value={barcodeNumber}
          onChange={(e) => setBarcodeNumber(e.target.value)}
        />
        <input
          type="number"
          placeholder="Mrp"
          id="mrp-register"
          required
          value={mrp}
          onChange={(e) => setMrp(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          id="price-register"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {/* Other form inputs */}
        <div className="register-buttons-group">
          <button type="button" onClick={handleSubmit} id="submit-register-btn">
            Register
          </button>
          <button onClick={handleClose} id="close-register-btn">
            Close
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default ProductRegisterModal;
