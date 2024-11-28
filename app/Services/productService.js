// /services/productService.js

export const getProducts = async () => {
    const response = await fetch('http://localhost:5000/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  };
  
  export const createProduct = async (productData) => {
    const response = await fetch('http://localhost:5000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
  
    if (!response.ok) {
      throw new Error('Failed to create product');
    }
    return await response.json();
  };
  