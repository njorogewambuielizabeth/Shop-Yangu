import { useEffect, useState } from 'react';
import { getShops } from '../../services/shopService';
import Link from 'next/link';

export default function ShopList() {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    getShops().then(setShops);
  }, []);

  return (
    <div>
      <h1>Shops</h1>
      <Link href="/shops/create">Create New Shop</Link>
      <ul>
        {shops.map(shop => (
          <li key={shop.id}>{shop.name}</li>
        ))}
      </ul>
    </div>
  );
}
