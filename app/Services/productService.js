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
      // Product added successfully
      return await response.json();
    } else if (response.status >= 400 && response.status < 500) {
      // Client-side error
      const error = await response.json();
      console.error("Client error:", error); // Log the error message
      return null; // Return null to indicate the error
    } else if (response.status >= 500) {
      // Server-side error
      console.error("Server error:", response.status);
      return null; // Return null for server error
    }

    // Handle other cases, unexpected responses
    console.error("Unexpected response:", response.status);
    return null;
  } catch (error) {
    console.error("Add Product Error:", error);
    return null; // Return null on unexpected errors as well
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
    console.error(error);
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
    console.error(error);
  }
};
