import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import { CgProfile } from "react-icons/cg";

const AdminHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gray-600 shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        </div>
        
        <nav className="flex space-x-10">
          <Link to="/admin/" className="text-white cursor-pointer text-lg">Home</Link>
          <Link to="/admin/category" className="text-white cursor-pointer text-lg">Category</Link>
          <Link to="/admin/products" className="text-white cursor-pointer text-lg">Products</Link>
          <Link to="/admin/orders" className="text-white cursor-pointer text-lg">Orders</Link>
        </nav>

        <div className="relative">
            <Link to="/profile"><CgProfile className='w-10 h-10' color='white'/></Link>
        </div>

      </div>

    </header>
  );
};

export default AdminHeader;
