"use client";

import { useEffect, useState } from "react";
import { getShops, deleteShop } from "../Services/shopService";  // Assume these services exist
import { useRouter } from "next/navigation";

export default function ManageShops() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage, setItemsPerPage] = useState(5); // Items per page for pagination
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

  // Filter shops based on the search term
  const filteredShops = shops.filter(
    (shop) =>
      (shop.name && shop.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (shop.location && shop.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Paginate filtered shops
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentShops = filteredShops.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(filteredShops.length / itemsPerPage);

  // Handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page on search term change
  };

  // Handle pagination change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name or location"
        value={searchTerm}
        onChange={handleSearchChange}
        style={styles.searchInput}
      />

      {/* Shops Table */}
      <table style={styles.shopTable}>
        <thead>
          <tr style={styles.tableHeader}>
            <th>Shop Name</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentShops.map((shop) => (
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

      {/* Pagination */}
      <div style={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            style={currentPage === index + 1 ? styles.pageButtonActive : styles.pageButton}
          >
            {index + 1}
          </button>
        ))}
      </div>
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
  searchInput: {
    width: "100%",
    padding: "8px 12px",
    marginBottom: "20px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
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
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  pageButton: {
    backgroundColor: "#f0f0f0",
    color: "#333",
    border: "1px solid #ccc",
    padding: "8px 16px",
    cursor: "pointer",
    borderRadius: "4px",
    margin: "0 5px",
  },
  pageButtonActive: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "1px solid #4CAF50",
    padding: "8px 16px",
    cursor: "pointer",
    borderRadius: "4px",
    margin: "0 5px",
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
