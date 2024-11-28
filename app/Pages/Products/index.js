// /pages/products/index.js
import { useEffect, useState } from 'react';
import { getProducts } from '../../services/productService';
import Link from 'next/link';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <Link href="/products/create">
        <a>Create New Product</a>
      </Link>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Stock Level: {product.stock}</p>
            <p>Description: {product.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
