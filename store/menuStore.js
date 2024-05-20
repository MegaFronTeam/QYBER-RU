import { useState } from 'react';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const useMenuStore = defineStore('global', () => {
  // Define your state variables here
  const [menuItems, setMenuItems] = useState([]);

  const getMenu = await () =>{
    const  response = await $fetch(`${BASE_URL}/menu/v1/main`);
    const data = response.data; 
    for (const item of data) {
      menuItems.push({
        label: item.title,
        href: item.url,
        icon: '',
      });
    }
  }

  if(menuItems.length === 0) {
    getMenu()
  }
  

  return {
    menuItems,
    setMenuItems,
    // Add more functions or variables here as needed
  };
};

export default useMenuStore;