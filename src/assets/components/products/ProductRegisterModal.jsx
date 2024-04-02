import "./ProductRegisterModal.css";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { useMutation } from "react-query";
import toastr from "toastr";

function ProductRegisterModal({
  isOpen,
  handleClose,
  useRefetchData,
  updateProduct,
}) {
  const [barcodeNumber, setBarcodeNumber] = useState("");
  const [description, setDescription] = useState("");
  const [mrp, setMrp] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [action, setAction] = useState({
    action: "Register",
    method: "POST",
    link: "http://localhost:8080/products",
  });
  const mutation = useMutation((product) => {
    fetch(action.link, {
      method: action.method,
      body: JSON.stringify(product),
      headers: {
        "Content-type": "application/json",
      },
    });
  });
  useEffect(() => {
    // Update state when updateProduct changes
    if (updateProduct) {
      setBarcodeNumber(updateProduct.barcodeNumber || "");
      setDescription(updateProduct.description || "");
      setMrp(updateProduct.mrp || "");
      setName(updateProduct.name || "");
      setPrice(updateProduct.price || "");
      setAction({
        action: "Update",
        method: "PUT",
        link: `http://localhost:8080/products/${updateProduct.id}`,
      });
    }
  }, [updateProduct]);

  const handleSubmit = async () => {
    const newProduct = {
      name: name,
      description: description,
      mrp: mrp,
      barcodeNumber: barcodeNumber,
      price: price,
    };

    try {
      await mutation.mutateAsync(newProduct);
      toastr.success(`Product ${action.action}ed successfully!`);
      useRefetchData(newProduct);
      setBarcodeNumber("");
      setDescription("");
      setMrp("");
      setName("");
      setPrice("");
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
        <h3>{action.action} Product</h3>
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
          <button type="submit" onClick={handleSubmit} id="submit-register-btn">
            {action.action}
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
