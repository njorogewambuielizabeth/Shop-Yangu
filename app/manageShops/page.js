"use client";

import { useEffect, useState } from "react";
import { getShops, deleteShop } from "../Services/shopService";  // Assume these services exist
import { useRouter } from "next/navigation";

export default function ManageShops() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    try {
      const shopData = await getShops(); // Fetch shop data from your API or service
      setShops(shopData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching shops:", error);
      setLoading(false);
    }
  };

  const handleDeleteShop = async (id) => {
    try {
      await deleteShop(id); // Call the delete shop service
      setShops(shops.filter(shop => shop.id !== id)); // Remove the shop from the list
    } catch (error) {
      console.error("Error deleting shop:", error);
    }
  };

  const handleEditShop = (id) => {
    router.push(`/editShop/${id}`); // Redirect to the edit shop page
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Manage Shops</h1>
      <table style={styles.shopTable}>
        <thead>
          <tr style={styles.tableHeader}>
            <th>Shop Name</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {shops.map((shop) => (
            <tr key={shop.id} style={styles.tableRow}>
              <td style={styles.tableData}>{shop.name}</td>
              <td style={styles.tableData}>{shop.location}</td>
              <td style={styles.tableData}>
                <button
                  style={styles.editBtn}
                  onClick={() => handleEditShop(shop.id)}
                >
                  Edit
                </button>
                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDeleteShop(shop.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Styling for the component
const styles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
    fontSize: "2rem",
  },
  shopTable: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  tableHeader: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px",
    textAlign: "left",
    fontWeight: "bold",
  },
  tableRow: {
    backgroundColor: "#f9f9f9",
    borderBottom: "1px solid #ddd",
  },
  tableData: {
    padding: "10px",
    textAlign: "left",
  },
  editBtn: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "8px 16px",
    cursor: "pointer",
    marginRight: "10px",
    borderRadius: "4px",
    transition: "background-color 0.3s ease",
  },
  deleteBtn: {
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    padding: "8px 16px",
    cursor: "pointer",
    borderRadius: "4px",
    transition: "background-color 0.3s ease",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontSize: "1.5rem",
    color: "#333",
  },
};

// Adding hover effect for buttons
const editBtnHover = {
  ...styles.editBtn,
  backgroundColor: "#45a049",
};

const deleteBtnHover = {
  ...styles.deleteBtn,
  backgroundColor: "#e53935",
};

styles.editBtn = { ...styles.editBtn, ":hover": editBtnHover };
styles.deleteBtn = { ...styles.deleteBtn, ":hover": deleteBtnHover };

