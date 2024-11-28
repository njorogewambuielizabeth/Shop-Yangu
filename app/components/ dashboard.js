'use client';
import { useEffect, useState } from "react";
import { getShops } from "../services/shopService";
import { getProducts } from "../services/productService";
import { Bar } from "react-chartjs-2";

export default function Dashboard() {
  const [shops, setShops] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: shopData } = await getShops();
    const { data: productData } = await getProducts();
    setShops(shopData);
    setProducts(productData);
  };

  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);

  const stockStatus = {
    inStock: products.filter((p) => p.stock > 5).length,
    lowStock: products.filter((p) => p.stock > 0 && p.stock <= 5).length,
    outOfStock: products.filter((p) => p.stock === 0).length,
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Total Shops: {shops.length}</p>
      <p>Total Products: {products.length}</p>
      <p>Total Stock: {totalStock}</p>

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
      />
    </div>
  );
}