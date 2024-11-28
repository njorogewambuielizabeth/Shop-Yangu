import { createShop } from '../../services/shopService';
import ShopForm from '../../components/ShopForm';

export default function CreateShop() {
  const handleSubmit = (data) => {
    createShop(data);
  };

  return <ShopForm onSubmit={handleSubmit} />;
}
