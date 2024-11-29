"use client";

import { useEffect, useState } from "react";
import { getShops } from "../Services/shopService";
import { getProducts } from "../Services/productService";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ShopForm from "../components/shopForm";
import ProductForm from "../components/productForm";
import Modal from "../components/modal"; // Import the Modal component

// Register the necessary components from Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [shops, setShops] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showShopForm, setShowShopForm] = useState(false); // Track visibility of the shop form
  const [showProductForm, setShowProductForm] = useState(false); // Track visibility of the product form

  // Fetch data when the component is mounted
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const shopData = await getShops(); // Fetch shops
      const productData = await getProducts(); // Fetch products
      setShops(shopData);
      setProducts(productData);
      setLoading(false); // Set loading to false when data is fetched
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  const onShopAdded = () => {
    fetchData(); // Refresh shop data after adding a new shop
  };

  const onProductAdded = () => {
    fetchData(); // Refresh product data after adding a new product
  };

  const handleAddShop = () => {
    setShowShopForm(true); // Show the shop form
  };

  const handleCloseShopForm = () => {
    setShowShopForm(false); // Close the shop form
  };

  const handleAddProduct = () => {
    setShowProductForm(true); // Show the product form
  };

  const handleCloseProductForm = () => {
    setShowProductForm(false); // Close the product form
  };

  // Calculating total stock
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);

  // Categorize stock status
  const stockStatus = {
    inStock: products.filter((p) => p.stock > 5).length,
    lowStock: products.filter((p) => p.stock > 0 && p.stock <= 5).length,
    outOfStock: products.filter((p) => p.stock === 0).length,
  };

  // If loading, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={dashboardStyle}>
      <h1>Dashboard</h1>

      {/* Card Section */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        {/* Total Shops Card */}
        <div style={cardStyle}>
          <h2>Total Shops</h2>
          <p style={cardTextStyle}>{shops.length}</p>
        </div>

        {/* Total Products Card */}
        <div style={cardStyle}>
          <h2>Total Products</h2>
          <p style={cardTextStyle}>{products.length}</p>
        </div>

        {/* Total Stock Card */}
        <div style={cardStyle}>
          <h2>Total Stock</h2>
          <p style={cardTextStyle}>{totalStock}</p>
        </div>
      </div>

      {/* Centered View All Card with Red Background */}
      <div style={centeredCardStyle}>
        <h1 style={{ marginBottom: "5px" }}>View All</h1>
        <div>
          <a href="/manageShops" style={linkStyle}>View All Shops</a>
          <br />
          <a href="/manageProducts" style={linkStyle}>View All Products</a>
        </div>
      </div>

      {/* Render the Bar Chart */}
      <div style={{ width: "600px", height: "400px", margin: "0 auto" }}>
        <Bar
          data={{
            labels: ["In Stock", "Low Stock", "Out of Stock"],
            datasets: [
              {
                label: "Stock Status",
                data: [stockStatus.inStock, stockStatus.lowStock, stockStatus.outOfStock],
                backgroundColor: ["green", "orange", "red"],
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: "Product Stock Status",
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    const label = context.dataset.label || "";
                    const value = context.raw;
                    return `${label}: ${value} items`;
                  },
                },
              },
            },
          }}
        />
      </div>

      {/* Add Item Buttons */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={handleAddShop} style={buttonStyle}>Add Shop</button>
        <button onClick={handleAddProduct} style={buttonStyle}>Add Product</button>
      </div>

      {/* Show the ShopForm modal when the button is clicked */}
      {showShopForm && (
        <Modal onClose={handleCloseShopForm}>
          <ShopForm onShopAdded={onShopAdded} onClose={handleCloseShopForm} />
        </Modal>
      )}

      {/* Show the ProductForm modal when the button is clicked */}
      {showProductForm && (
        <Modal onClose={handleCloseProductForm}>
          <ProductForm onProductAdded={onProductAdded} onClose={handleCloseProductForm} />
        </Modal>
      )}
    </div>
  );
}

// Inline styles for the cards
const cardStyle = {
  backgroundColor: "blue",
  color: "white",
  padding: "20px",
  borderRadius: "8px",
  textAlign: "center",
  flex: "1",
};

const cardTextStyle = {
  fontSize: "24px",
  fontWeight: "bold",
};

const buttonStyle = {
  backgroundColor: "green",
  color: "white",
  padding: "10px 20px",
  margin: "5px",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
};

const centeredCardStyle = {
  backgroundColor: "red", // Red background color
  color: "white",
  padding: "20px 30px", // More padding for a balanced look
  borderRadius: "8px",
  textAlign: "center",
  flex: "1",
  marginTop: "20px", // Add some space between the cards
  width: "300px", // Set a fixed width to avoid it becoming too large
  marginLeft: "auto", // Center horizontally
  marginRight: "auto", // Center horizontally
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

// New style to lift the Dashboard content towards the top
const dashboardStyle = {
  padding: "20px",
  marginTop: "-30px", // Move Dashboard up
};
  
const linkStyle = {
  color: "green",
  textDecoration: "underline",
  fontSize: "20px", // Slightly larger text for clarity
  marginTop: "15px", // Add some space between links
};
