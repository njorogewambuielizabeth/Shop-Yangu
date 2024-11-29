import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getShopById, updateShop } from '../Services/shopService'; // Assuming services are defined

const EditShop = () => {
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query; // Get the shop ID from the URL

  useEffect(() => {
    if (id) {
      fetchShop(id); // Fetch shop details if id exists
    }
  }, [id]);

  const fetchShop = async (id) => {
    try {
      const data = await getShopById(id); // Assuming the service exists to fetch shop data by id
      setShop(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching shop:', error);
    }
  };

  const handleSave = async () => {
    try {
      await updateShop(id, shop); // Update shop data
      router.push('/manageShops'); // Redirect after save to manage shops page
    } catch (error) {
      console.error('Error updating shop:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Shop</h1>
      <form>
        <div>
          <label>Shop Name</label>
          <input
            type="text"
            value={shop.name}
            onChange={(e) => setShop({ ...shop, name: e.target.value })}
          />
        </div>
        <div>
          <label>Location</label>
          <input
            type="text"
            value={shop.location}
            onChange={(e) => setShop({ ...shop, location: e.target.value })}
          />
        </div>
        <button type="button" onClick={handleSave}>Save</button>
      </form>
    </div>
  );
};

export default EditShop;
