// utils/validation.js
export const validateShopForm = ({ name, description, logo }) => {
    if (!name || !description || !logo) {
      return "All fields are required!";
    }
    return null;
  };
  