'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getShopById, updateShop } from '../../Services/shopService';

const EditShop = () => {
  const router = useRouter();
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Extract `id` from the URL query with safety check
  const { query } = router;
  const id = query?.id;

  // Only fetch shop data if `id` is available
  useEffect(() => {
    const fetchShop = async () => {
      if (!id) return; // Return early if `id` is not available
      try {
        const data = await getShopById(id);
        setShop(data);
      } catch (err) {
        console.error("Error fetching shop:", err);
        setError("Failed to load shop details.");
      } finally {
        setLoading(false);
      }
    };

    fetchShop();
  }, [id]); // Dependency array ensures this effect only runs when `id` changes

  const handleSave = async () => {
    if (!shop?.name || !shop?.location) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      setIsSaving(true); // Set saving state to true
      await updateShop(id, shop); // Send updated data to API
      router.push('/manageShops'); // Redirect to shop management page
    } catch (err) {
      console.error("Error updating shop:", err);
      alert("Failed to update shop. Please try again.");
    } finally {
      setIsSaving(false); // Set saving state back to false
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!shop) return <div>No shop data available</div>;

  return (
    <div>
      <h1>Edit Shop</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Shop Name:</label>
          <input
            type="text"
            value={shop.name}
            onChange={(e) => setShop({ ...shop, name: e.target.value })}
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            value={shop.location}
            onChange={(e) => setShop({ ...shop, location: e.target.value })}
          />
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default EditShop;
