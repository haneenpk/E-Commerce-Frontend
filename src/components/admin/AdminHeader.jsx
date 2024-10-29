import React, { useEffect, useState } from 'react';
import Axios from "../../api/shared/instance";
import { toast } from 'sonner';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetAdminState } from '../../redux/slices/adminSlice';
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";


const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);
  const [admin, setAdmin] = useState({});

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('adminData');
    localStorage.removeItem('adminJwtToken');
    dispatch(resetAdminState());
    toast.success('Logout successful');
    navigate("/admin/login");
  };

  const fetchAdmin = async () => {
    try {
      const response = await Axios.get(`/api/admin/getData`);
      setAdmin(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAdmin()
  }, [])

  return (
    <header className="bg-[#003135] py-4 px-6 flex justify-between items-center fixed top-0 w-full z-10 shadow-md">
      <h1 className="text-white text-2xl font-bold">E-Commerce</h1>
      <div className="hidden md:flex gap-6 items-center">
        <NavLink
          to="/admin/"
          className="text-white hover:text-gray-300 transition duration-300 border-b-2 border-transparent hover:border-white"
        >
          Home
        </NavLink>
        <NavLink
          to="/admin/category"
          className="text-white hover:text-gray-300 transition duration-300 border-b-2 border-transparent hover:border-white"
        >
          Category
        </NavLink>
        <NavLink
          to="/admin/product"
          className="text-white hover:text-gray-300 transition duration-300 border-b-2 border-transparent hover:border-white"
        >
          Products
        </NavLink>
        <NavLink
          to="/admin/orders"
          className="text-white hover:text-gray-300 transition duration-300 border-b-2 border-transparent hover:border-white"
        >
          Orders
        </NavLink>

        <Popover placement="bottom-end">
          <PopoverHandler>
            <Avatar
              variant="circular"
              alt="tania andrew"
              className="cursor-pointer"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            />
          </PopoverHandler>
          <PopoverContent className="w-72 z-50">
            <div className="mb-4 flex items-center gap-4 border-b border-blue-gray-50 pb-4">
              <Avatar
                variant="circular"
                alt="tania andrew"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              />
              <div>
                <Typography variant="h6" color="blue-gray">
                  {admin.name || "Admin Name"}  {/* Provide a default if admin.name is undefined */}
                </Typography>
                <Typography variant="small" color="gray" className="font-medium text-blue-gray-500">
                  {admin.email || "admin@example.com"} {/* Provide a default if admin.email is undefined */}
                </Typography>
              </div>
            </div>
            <List className="p-0">
              <ListItem onClick={handleLogout}>
                <ListItemPrefix>
                  <svg
                    width="16"
                    height="14"
                    viewBox="0 0 16 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1 0C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1V13C0 13.2652 0.105357 13.5196 0.292893 13.7071C0.48043 13.8946 0.734784 14 1 14C1.26522 14 1.51957 13.8946 1.70711 13.7071C1.89464 13.5196 2 13.2652 2 13V1C2 0.734784 1.89464 0.48043 1.70711 0.292893C1.51957 0.105357 1.26522 0 1 0ZM11.293 9.293C11.1108 9.4816 11.01 9.7342 11.0123 9.9964C11.0146 10.2586 11.1198 10.5094 11.3052 10.6948C11.4906 10.8802 11.7414 10.9854 12.0036 10.9877C12.2658 10.99 12.5184 10.8892 12.707 10.707L15.707 7.707C15.8945 7.51947 15.9998 7.26516 15.9998 7C15.9998 6.73484 15.8945 6.48053 15.707 6.293L12.707 3.293C12.6148 3.19749 12.5044 3.12131 12.3824 3.0689C12.2604 3.01649 12.1292 2.9889 11.9964 2.98775C11.8636 2.9866 11.7319 3.0119 11.609 3.06218C11.4861 3.11246 11.3745 3.18671 11.2806 3.2806C11.1867 3.3745 11.1125 3.48615 11.0622 3.60905C11.0119 3.73194 10.9866 3.86362 10.9877 3.9964C10.9889 4.12918 11.0165 4.2604 11.0689 4.3824C11.1213 4.50441 11.1975 4.61475 11.293 4.707L12.586 6H5C4.73478 6 4.48043 6.10536 4.29289 6.29289C4.10536 6.48043 4 6.73478 4 7C4 7.26522 4.10536 7.51957 4.29289 7.70711C4.48043 7.89464 4.73478 8 5 8H12.586L11.293 9.293Z"
                      fill="#90A4AE"
                    />
                  </svg>
                </ListItemPrefix>
                Sign Out
              </ListItem>
            </List>
          </PopoverContent>
        </Popover>
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
        <div className="md:hidden absolute bg-[#024950] top-full left-0 right-0 py-2 px-4">
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
            <button
              className="text-white hover:text-gray-300"
              activeClassName="underline text-white"
              onClick={handleLogout}
            >
              Logout
            </button>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;

