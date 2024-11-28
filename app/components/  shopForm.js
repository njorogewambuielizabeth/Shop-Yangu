// components/ShopForm.js
import { useState } from 'react';

export default function ShopForm({ onSubmit, shopData = {} }) {
  const [name, setName] = useState(shopData.name || '');
  const [description, setDescription] = useState(shopData.description || '');
  const [logo, setLogo] = useState(shopData.logo || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, description, logo });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Shop Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required
      />
      <textarea 
        placeholder="Description" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        required
      />
      <input 
        type="text" 
        placeholder="Logo URL" 
        value={logo} 
        onChange={(e) => setLogo(e.target.value)} 
        required
      />
      <button type="submit">Save</button>
    </form>
  );
}
