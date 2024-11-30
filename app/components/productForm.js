import { useState } from "react";
import { addProduct } from "../Services/productService";

const ProductForm = ({ onProductAdded, onClose }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const newProduct = {
        name,
        price,
        stock,
      };

      // Call your addProduct service function
      const addedProduct = await addProduct(newProduct);

      if (addedProduct) {
        setMessage("Product added successfully!");
        setMessageType("success");

        // Notify the parent (Dashboard) of the new product
        if (onProductAdded) {
          onProductAdded(addedProduct);
        }

        // Close the form after adding the product
        onClose();
      }
    } catch (error) {
      console.error("Error in submission:", error);
      setMessage(error.message || "Error adding product. Please try again.");
      setMessageType("error");
    }
  };

  return (
    <div style={modalContainerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={formTitleStyle}>Add Product</h2>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          style={inputStyle}
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Product Price"
          style={inputStyle}
          required
        />
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="Stock Quantity"
          style={inputStyle}
          required
        />
        <button type="submit" style={submitButtonStyle}>Add Product</button>

        {message && <div style={messageStyle(messageType)}>{message}</div>}
        
        <button type="button" onClick={onClose} style={cancelButtonStyle}>Cancel</button>
      </form>
    </div>
  );
};

// Modal container style to center the form and give it some padding
const modalContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  position: "fixed",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: "999",
};

// Styling for the form container
const formStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  width: "100%",
  maxWidth: "400px",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

// Title for the form
const formTitleStyle = {
  fontSize: "1.5rem",
  fontWeight: "bold",
  color: "#333",
  textAlign: "center",
};

// Styles for input fields
const inputStyle = {
  padding: "12px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontSize: "1rem",
  outline: "none",
  transition: "border 0.3s",
};

const submitButtonStyle = {
  backgroundColor: "#28a745",
  color: "white",
  padding: "12px",
  borderRadius: "5px",
  border: "none",
  fontSize: "1rem",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

const cancelButtonStyle = {
  backgroundColor: "#dc3545",
  color: "white",
  padding: "12px",
  borderRadius: "5px",
  border: "none",
  fontSize: "1rem",
  cursor: "pointer",
  marginTop: "10px",
  transition: "background-color 0.3s",
};

const messageStyle = (type) => ({
  marginTop: "10px",
  fontWeight: "bold",
  color: type === "success" ? "green" : "red",
  textAlign: "center",
});

export default ProductForm;
