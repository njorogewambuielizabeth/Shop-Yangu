// /pages/products/create.js
import { createProduct } from '../../services/productService';
import ProductForm from '../../components/ProductForm';

export default function CreateProduct() {
  const handleSubmit = (data) => {
    createProduct(data);
  };

  return <ProductForm onSubmit={handleSubmit} />;
}
