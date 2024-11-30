'use client';

import { useState, useEffect } from "react";
import { getProduct, updateProduct } from "../../Services/productService"; // Import functions
import { useRouter } from 'next/navigation';

export default function EditProductPage({ params }) {
  const [productData, setProductData] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { id } = params; // Assuming the product ID is passed as a URL parameter

  // Fetch the product data when the component mounts
  useEffect(() => {
    if (!id) return; // If no ID, don't proceed

    const fetchProduct = async () => {
      try {
        const product = await getProduct(id); // Get product by ID
        if (product) {
          setProductData(product);
          setName(product.name || ""); // Set default value if empty
          setPrice(product.price || ""); // Set default value if empty
          setDescription(product.description || ""); // Set default value if empty
        }
      } catch (error) {
        setErrorMessage("Error fetching product. Please try again.");
        console.error(error); // Log the error for debugging
      }
    };

    fetchProduct();
  }, [id]);

  // Handle form submission to update the product
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    // Validate input fields
    if (!name || !price || !description) {
      setErrorMessage("All fields are required.");
      return;
    }

    const updatedProduct = { name, price, description };

    try {
      await updateProduct(id, updatedProduct); // Call update function from productService
      setSuccessMessage("Product updated successfully!");
      setTimeout(() => {
        router.push("/manageProducts"); // Redirect to product list page after success
      }, 2000);
    } catch (error) {
      setErrorMessage("Error updating product. Please try again.");
      console.error(error); // Log the error for debugging
    }
  };

  // If no product data has been fetched yet, show loading message
  if (!productData) {
    return <p>Loading...</p>;
  }

  return (
    <div style={formContainerStyle}>
      <div style={formCardStyle}>
        <h2>Edit Product</h2>
        {successMessage && <p style={successMessageStyle}>{successMessage}</p>}
        {errorMessage && <p style={errorMessageStyle}>{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Price:</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={buttonGroupStyle}>
            <button type="submit" style={submitButtonStyle}>Update Product</button>
            <button
              type="button"
              onClick={() => router.push("/manageProducts")}
              style={closeButtonStyle}
            >
              Cancel
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
