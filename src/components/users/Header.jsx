import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import { CgProfile } from "react-icons/cg";
import { IoMdCart } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const AdminHeader = () => {

  const isUserLoggedIn = useSelector(state => state.user.isLoggedIn);

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gray-600 shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-white">E-Commerce</h1>
        </div>
        <div className="relative">
          <nav className="flex space-x-10">
            <Link to="/" className="text-white cursor-pointer text-lg">Home</Link>
            {isUserLoggedIn && (
              <Link to="/order" className="text-white cursor-pointer text-lg">My Order</Link>
            )}
            <Link to="/about-us" className="text-white cursor-pointer text-lg">About Us</Link>
            <Link to="/contact" className="text-white cursor-pointer text-lg">Contact</Link>
            {isUserLoggedIn ? (
              <div className='flex space-x-4'>
                <Link to="/cart"><IoMdCart className='w-9 h-9' color='white' /></Link>
                <Link to="/profile"><CgProfile className='w-9 h-9' color='white' /></Link>
              </div>
            ) :
              (
                <Link className="text-white cursor-pointer text-lg" to="/login">Login</Link>
              )
            }
          </nav>
        </div>

      </div>

    </header>
  );
};

export default AdminHeader;
