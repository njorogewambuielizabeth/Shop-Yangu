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
import Modal from "../components/modal";

// Register the necessary components from Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [shops, setShops] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showShopForm, setShowShopForm] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const shopData = await getShops();
      const productData = await getProducts();
      setShops(shopData);
      setProducts(productData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleAddShop = () => setShowShopForm(true);
  const handleAddProduct = () => setShowProductForm(true);
  const handleCloseShopForm = () => setShowShopForm(false);
  const handleCloseProductForm = () => setShowProductForm(false);

  const handleProductAdded = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const totalStock = products.reduce((sum, p) => {
    const stock = Number(p.stock);
    if (!isNaN(stock)) {
      return sum + stock;
    }
    return sum;
  }, 0);

  const stockStatus = {
    inStock: products.filter((p) => p.stock > 5).length,
    lowStock: products.filter((p) => p.stock > 0 && p.stock <= 5).length,
    outOfStock: products.filter((p) => p.stock === 0).length,
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={dashboardStyle}>
      <h1>Dashboard</h1>

      <div style={cardsContainerStyle}>
        <div style={cardStyle}>
          <h2>Total Shops</h2>
          <p style={cardTextStyle}>{shops.length}</p>
        </div>
        <div style={cardStyle}>
          <h2>Total Products</h2>
          <p style={cardTextStyle}>{products.length}</p>
        </div>
        <div style={cardStyle}>
          <h2>Total Stock</h2>
          <p style={cardTextStyle}>{totalStock}</p>
        </div>
        <div style={viewAllCardStyle}>
          <h2>View All</h2>
          <a href="/manageShops" style={linkStyle}>Shops</a>
          <br />
          <a href="/manageProducts" style={linkStyle}>Products</a>
        </div>
      </div>

      <div style={chartContainerStyle}>
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
            },
          }}
        />
      </div>

      <div style={buttonsContainerStyle}>
        <button onClick={handleAddShop} style={buttonStyle}>Add Shop</button>
        <button onClick={handleAddProduct} style={buttonStyle}>Add Product</button>
      </div>

      {/* ShopForm Modal */}
      {showShopForm && (
        <Modal onClose={handleCloseShopForm}>
          <ShopForm onClose={handleCloseShopForm} />
        </Modal>
      )}

      {/* ProductForm Modal */}
      {showProductForm && (
        <Modal onClose={handleCloseProductForm}>
          <ProductForm onProductAdded={handleProductAdded} onClose={handleCloseProductForm} />
        </Modal>
      )}
    </div>
  );
}

// Styles
const dashboardStyle = {
  padding: "20px",
};

const cardsContainerStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  justifyContent: "space-between",
  marginBottom: "20px",
};

const cardStyle = {
  backgroundColor: "blue",
  color: "white",
  padding: "20px",
  borderRadius: "8px",
  textAlign: "center",
  flex: "1 1 calc(25% - 20px)", // Responsive card width
  minWidth: "200px",
  maxWidth: "300px",
};

const cardTextStyle = {
  fontSize: "24px",
  fontWeight: "bold",
};

const viewAllCardStyle = {
  ...cardStyle,
  backgroundColor: "darkred",
  color: "white",
  padding: "15px",
};

const chartContainerStyle = {
  width: "90%",
  maxWidth: "1200px", // Expand on larger screens
  height: "500px", // Larger height for better visibility
  margin: "0 auto",
};

const buttonsContainerStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "10px",
  marginTop: "20px",
};

const buttonStyle = {
  backgroundColor: "green",
  color: "white",
  padding: "10px 20px",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
};

const linkStyle = {
  color: "white",
  textDecoration: "underline",
  fontSize: "16px",
};
