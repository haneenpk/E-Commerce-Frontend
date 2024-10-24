import React, { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="bg-gray-800 py-4 px-6 flex justify-between items-center fixed top-0 w-full z-10 shadow-md">
      <h1 className="text-white text-2xl font-bold">E-Commerce</h1>
      <div className="hidden md:flex gap-6 items-center">
        <NavLink
          to="/admin/"
          className="text-white hover:text-gray-300 transition duration-300 border-b-2 border-transparent hover:border-white"
          activeClassName="border-b-2 border-white"
        >
          Home
        </NavLink>
        <NavLink
          to="/admin/category"
          className="text-white hover:text-gray-300 transition duration-300 border-b-2 border-transparent hover:border-white"
          activeClassName="border-b-2 border-white"
        >
          Category
        </NavLink>
        <NavLink
          to="/admin/product"
          className="text-white hover:text-gray-300 transition duration-300 border-b-2 border-transparent hover:border-white"
          activeClassName="border-b-2 border-white"
        >
          Products
        </NavLink>
        <NavLink
          to="/admin/orders"
          className="text-white hover:text-gray-300 transition duration-300 border-b-2 border-transparent hover:border-white"
          activeClassName="border-b-2 border-white"
        >
          Orders
        </NavLink>
        <NavLink to="/admin/profile" >
          <CgProfile className="w-9 h-9" color='white' />
        </NavLink>
      </div>

      <button
        className="md:hidden text-white focus:outline-none"
        onClick={() => setShowMenu(!showMenu)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={showMenu ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {showMenu && (
        <div className="md:hidden absolute bg-gray-800 top-full left-0 right-0 py-2 px-4">
          <ul className="flex flex-col gap-2">
            <NavLink
              to="/admin/"
              className="text-white hover:text-gray-300"
              activeClassName="underline text-white"
              onClick={() => setShowMenu(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/admin/category"
              className="text-white hover:text-gray-300"
              activeClassName="underline text-white"
              onClick={() => setShowMenu(false)}
            >
              Category
            </NavLink>
            <NavLink
              to="/admin/product"
              className="text-white hover:text-gray-300"
              activeClassName="underline text-white"
              onClick={() => setShowMenu(false)}
            >
              Product
            </NavLink>
            <NavLink
              to="/admin/orders"
              className="text-white hover:text-gray-300"
              activeClassName="underline text-white"
              onClick={() => setShowMenu(false)}
            >
              Orders
            </NavLink>
            <NavLink
              to="/admin/profile"
              className="text-white hover:text-gray-300"
              activeClassName="underline text-white"
              onClick={() => setShowMenu(false)}
            >
              Profile
            </NavLink>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;

