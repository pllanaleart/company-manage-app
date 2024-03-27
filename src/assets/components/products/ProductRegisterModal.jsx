import "./ProductRegisterModal.css";
import { useRef } from "react";
import Modal from "react-modal";
import { useMutation } from "react-query";
import toastr from "toastr";

function ProductRegisterModal({ isOpen, handleClose, useRefetchData }) {
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const barcodeNumberRef = useRef(null);
  const mrpRef = useRef(null);
  const priceRef = useRef(null);

  const mutation = useMutation((product) => {
    fetch("http://localhost:8080/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-type": "application/json",
      },
    });
  });

  const handleSubmit = async () => {
    const newProduct = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      mrp: mrpRef.current.value,
      barcodeNumber: barcodeNumberRef.current.value,
      price: priceRef.current.value,
    };

    try {
      await mutation.mutateAsync(newProduct);
      toastr.success("Product Registered successfully!");
      useRefetchData(newProduct);
      handleClose();
    } catch (error) {
      toastr.error(error);
    }
  };

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
          ref={nameRef}
        />
        <textarea
          rows={4}
          cols={50}
          placeholder="Description"
          id="description-register"
          required
          ref={descriptionRef}
        />
        <input
          type="number"
          placeholder="Barcode"
          id="barconde-register"
          required
          ref={barcodeNumberRef}
        />
        <input
          type="number"
          placeholder="Mrp"
          id="mrp-register"
          required
          ref={mrpRef}
        />
        <input
          type="number"
          placeholder="Price"
          id="price-register"
          required
          ref={priceRef}
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
