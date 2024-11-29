import { useState, useEffect } from "react";
import { addProduct } from "../Services/productService"; // Assuming this is the function to add a product
import { getShops } from "../Services/shopService"; // Fetch the shops to display in the dropdown

export default function ProductForm({ onProductAdded, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    stock: 0,
    description: "",
    shopId: "", // Field to store the selected shop's ID
  });

  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const shopData = await getShops(); // Fetch shops
        setShops(shopData);
        setLoading(false); // Set loading to false when shops are fetched
      } catch (error) {
        console.error("Error fetching shops:", error);
        setLoading(false);
      }
    };
    fetchShops();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data including the selected shopId to the backend
      await addProduct(formData); // Assuming addProduct handles the API call
      onProductAdded(); // Refresh the product list
      onClose(); // Close the form after submission
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  if (loading) {
    return <div>Loading shops...</div>;
  }

  return (
    <div style={formWrapperStyle}>
      <h2 style={formTitleStyle}>Add Product</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter product name"
            required
            style={inputStyle}
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Price</label>
          <div style={inputGroupPriceStyle}>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter price"
              required
              style={priceInputStyle}
            />
            <span style={currencyStyle}>Ksh</span>
          </div>
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Stock Quantity</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            placeholder="Enter stock quantity"
            required
            style={inputStyle}
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter product description"
            required
            style={textareaStyle}
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Select Shop</label>
          <select
            name="shopId"
            value={formData.shopId}
            onChange={handleInputChange}
            required
            style={selectStyle}
          >
            <option value="">Select a Shop</option>
            {shops.map((shop) => (
              <option key={shop.id} value={shop.id}>
                {shop.name} - {shop.location}
              </option>
            ))}
          </select>
        </div>

        <div style={buttonContainerStyle}>
          <button type="submit" style={submitButtonStyle}>Add Product</button>
          <button type="button" onClick={onClose} style={cancelButtonStyle}>Close</button>
        </div>
      </form>
    </div>
  );
}

// Styles
const formWrapperStyle = {
  padding: "20px",
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  maxWidth: "600px",
  margin: "0 auto",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
};

const formTitleStyle = {
  textAlign: "center",
  color: "#333",
  marginBottom: "20px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
};

const inputGroupStyle = {
  marginBottom: "15px",
};

const labelStyle = {
  fontSize: "16px",
  fontWeight: "500",
  marginBottom: "5px",
  color: "#333",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ddd",
  fontSize: "16px",
  width: "100%",
};

const priceInputStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ddd",
  fontSize: "16px",
  width: "80%",
};

const inputGroupPriceStyle = {
  display: "flex",
  alignItems: "center",
  width: "100%",
};

const currencyStyle = {
  fontSize: "16px",
  fontWeight: "500",
  marginLeft: "10px",
  color: "#333",
};

const textareaStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ddd",
  fontSize: "16px",
  width: "100%",
  height: "100px",
  resize: "none",
};

const selectStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ddd",
  fontSize: "16px",
  width: "100%",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "20px",
};

const submitButtonStyle = {
  backgroundColor: "#4CAF50",
  color: "white",
  padding: "12px 25px",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
};

const cancelButtonStyle = {
  backgroundColor: "#f44336",
  color: "white",
  padding: "12px 25px",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
};
