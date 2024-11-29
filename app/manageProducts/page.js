"use client";

import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../Services/productService";  // Assume these services exist
import { useRouter } from "next/navigation";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on search term
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const fetchProducts = async () => {
    try {
      const productData = await getProducts(); // Fetch product data from your API or service
      setProducts(productData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id); // Call the delete product service
      setProducts(products.filter(product => product.id !== id)); // Remove the product from the list
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditProduct = (id) => {
    router.push(`/editProducts/${id}`); // Redirect to the edit product page
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div style={styles.loading}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Manage Products</h1>

      {/* Search Input */}
      <input
        type="text"
        style={styles.searchInput}
        placeholder="Search products by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Product Table */}
      <table style={styles.productTable}>
        <thead>
          <tr style={styles.tableHeader}>
            <th>Product Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.id} style={styles.tableRow}>
              <td style={styles.tableData}>{product.name}</td>
              <td style={styles.tableData}>{product.price}</td>
              <td style={styles.tableData}>{product.stock}</td>
              <td style={styles.tableData}>
                <button
                  style={styles.editBtn}
                  onClick={() => handleEditProduct(product.id)}
                >
                  Edit
                </button>
                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDeleteProduct(product.id)}
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
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          style={styles.paginationBtn}
        >
          Previous
        </button>
        <span style={styles.pageNumber}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={styles.paginationBtn}
        >
          Next
        </button>
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
    padding: "10px",
    fontSize: "1rem",
    marginBottom: "20px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  productTable: {
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
    alignItems: "center",
    marginTop: "20px",
  },
  paginationBtn: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "8px 16px",
    margin: "0 10px",
    cursor: "pointer",
    borderRadius: "4px",
  },
  pageNumber: {
    fontSize: "1rem",
    margin: "0 10px",
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
