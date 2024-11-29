// shopService.js

// Function to get all shops
export const getShops = async () => {
  try {
    const response = await fetch("http://localhost:5000/shops");
    if (!response.ok) throw new Error("Failed to fetch shops");
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

// Function to get a shop by ID
export const getShopById = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/shops/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch shop with ID: ${id}`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

// Function to add a new shop
export const addShop = async (shopData) => {
  try {
    const response = await fetch("http://localhost:5000/shops", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shopData),
    });
    if (!response.ok) throw new Error("Failed to add shop");
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

// Function to delete a shop
export const deleteShop = async (shopId) => {
  try {
    const response = await fetch(`http://localhost:5000/shops/${shopId}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete shop");
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

// Function to update a shop
export const updateShop = async (shopId, shopData) => {
  try {
    const response = await fetch(`http://localhost:5000/shops/${shopId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shopData),
    });
    if (!response.ok) throw new Error("Failed to update shop");
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
