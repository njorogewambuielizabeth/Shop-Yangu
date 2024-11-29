"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Correct import for router
import { getProduct, updateProduct } from "../../Services/productService"; // Adjust based on your service
import { useRouter } from "next/router";

export default function EditProduct() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { query } = useRouter(); // Using query to get the dynamic `id`
  const { id } = query; // Extract `id` from the URL

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (id) => {
    try {
      const productData = await getProduct(id); // Fetch the product by id from your service
      setProduct(productData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await updateProduct(id, product); // Update the product
      alert("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={handleSave}>
        <div>
          <label>Product Name</label>
          <input
            type="text"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
        </div>
        <div>
          <label>Stock</label>
          <input
            type="number"
            value={product.stock}
            onChange={(e) => setProduct({ ...product, stock: e.target.value })}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
