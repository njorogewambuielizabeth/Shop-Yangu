import { useState, useEffect } from "react";
import { addShop, updateShop } from "../Services/shopService"; // Assuming these functions exist

export default function ShopForm({ shop, onShopAdded, onClose }) {
  const [shopName, setShopName] = useState(shop ? shop.name : ""); // Pre-populate if editing
  const [shopLocation, setShopLocation] = useState(shop ? shop.location : "");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (shop) {
      setShopName(shop.name);
      setShopLocation(shop.location);
    }
  }, [shop]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    // Validate inputs
    if (!shopName || !shopLocation) {
      setErrorMessage("Both fields are required.");
      return;
    }

    const formData = { name: shopName, location: shopLocation };

    try {
      if (shop) {
        // If editing an existing shop, update the shop
        await updateShop(shop.id, formData);
        setSuccessMessage("Shop updated successfully!");
      } else {
        // If adding a new shop, add the shop
        await addShop(formData);
        setSuccessMessage("Shop added successfully!");
      }

      onShopAdded(); // Callback to refresh the list
    } catch (error) {
      setErrorMessage(error?.message || "Error submitting shop. Please try again.");
    }

    onClose(); // Close form after submission
  };

  const handleClose = () => {
    setShopName("");
    setShopLocation("");
    setSuccessMessage("");
    setErrorMessage("");
    onClose(); // Close the form when closing
  };

  return (
    <div style={formContainerStyle}>
      <div style={formCardStyle}>
        <h2>{shop ? "Edit Shop" : "Add New Shop"}</h2>
        {successMessage && <p style={successMessageStyle}>{successMessage}</p>}
        {errorMessage && <p style={errorMessageStyle}>{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Shop Name:</label>
            <input
              type="text"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Location:</label>
            <input
              type="text"
              value={shopLocation}
              onChange={(e) => setShopLocation(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={buttonGroupStyle}>
            <button type="submit" style={submitButtonStyle}>
              {shop ? "Update Shop" : "Add Shop"}
            </button>
            <button
              type="button"
              onClick={handleClose}
              style={closeButtonStyle}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Inline styles for the form components
const formContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#f1f1f1",
};

const formCardStyle = {
  backgroundColor: "#ffffff",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  width: "400px",
  textAlign: "center",
};

const inputGroupStyle = {
  marginBottom: "15px",
};

const labelStyle = {
  display: "block",
  marginBottom: "5px",
  fontSize: "14px",
  fontWeight: "bold",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

const buttonGroupStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
};

const submitButtonStyle = {
  backgroundColor: "#007BFF",
  color: "#fff",
  border: "none",
  padding: "10px 20px",
  borderRadius: "4px",
  cursor: "pointer",
  width: "48%",
};

const closeButtonStyle = {
  backgroundColor: "#dc3545",
  color: "#fff",
  border: "none",
  padding: "10px 20px",
  borderRadius: "4px",
  cursor: "pointer",
  width: "48%",
};

const successMessageStyle = {
  color: "green",
  fontSize: "16px",
  marginBottom: "10px",
};

const errorMessageStyle = {
  color: "red",
  fontSize: "16px",
  marginBottom: "10px",
};
