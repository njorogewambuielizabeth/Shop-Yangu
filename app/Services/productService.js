// Function to get all products
export const getProducts = async () => {
  try {
    const response = await fetch("http://localhost:5000/products"); // Replace with your actual API endpoint
    if (!response.ok) throw new Error("Failed to fetch products");
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// Function to get a single product by ID
export const getProduct = async (productId) => {
  try {
    const response = await fetch(`http://localhost:5000/products/${productId}`);
    if (!response.ok) throw new Error("Failed to fetch product");
    return await response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
  }
};

// Function to add a new product
export const addProduct = async (productData) => {
  try {
    const response = await fetch("http://localhost:5000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (response.status === 201) {
      return await response.json();
    } else {
      console.error("Unexpected response:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error adding product:", error);
    return null;
  }
};

// Function to delete a product
export const deleteProduct = async (productId) => {
  try {
    const response = await fetch(`http://localhost:5000/products/${productId}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete product");
    return await response.json();
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};

// Function to update a product
export const updateProduct = async (productId, productData) => {
  try {
    const response = await fetch(`http://localhost:5000/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error("Failed to update product");
    return await response.json();
  } catch (error) {
    console.error("Error updating product:", error);
  }
};
