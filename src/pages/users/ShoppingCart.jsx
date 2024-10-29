import React, { useEffect, useState } from 'react';
import Axios from '../../api/shared/instance';
import { NavLink } from 'react-router-dom';
import { Breadcrumbs, Button } from "@material-tailwind/react";
import { MdDeleteForever } from "react-icons/md";

const ShoppingCart = () => {
  const [cartData, setCartData] = useState({ cart: [], totalCartAmount: 0 });
  const [loading, setLoading] = useState(true);
  const [updateErrors, setUpdateErrors] = useState({});
  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      const response = await Axios.get(`/api/user/loadCart`);
      setCartData(response.data.data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (e, cartItemId, incOrDec) => {
    e.preventDefault();

    const data = { type: incOrDec };

    try {
      setUpdateErrors(prev => ({
        ...prev,
        [cartItemId]: ''
      }));

      const response = await Axios.post(`/api/user/update-cart/${cartItemId}`, data);
      if (response.data.data) {
        setCartData(response.data.data);
      }
    } catch (error) {
      console.error("Error updating cart item:", error);
      if (error.response?.data?.message === "Stock limit exceeded") {
        setUpdateErrors(prev => ({
          ...prev,
          [cartItemId]: "Limit exceeded"
        }));
      }
    }
  };

  const handleDeleteItem = async (e, cartId) => {
    e.preventDefault(); // Prevent default anchor behavior

    try {
      setDeleteError('');
      const response = await Axios.get(`/api/user/delete-cart?cartId=${cartId}`);
      fetchCartData()
    } catch (error) {
      console.error("Error deleting cart item:", error);
      setDeleteError('Failed to delete item. Please try again.');
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="bg-gray-100 px-8 pb-5">
      <Breadcrumbs className='mb-3'>
        <NavLink to="/" className="opacity-60">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </NavLink>
        <NavLink to="/cart">Cart</NavLink>
      </Breadcrumbs>
      <div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
        {deleteError && (
          <div className="text-red-500 mb-4">{deleteError}</div>
        )}
        {cartData.cart.length > 0 ? (
          <>
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4">Product</th>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Price</th>
                  <th className="py-2 px-4">Quantity</th>
                  <th className="">Total</th>
                </tr>
              </thead>
              <tbody>
                {cartData.cart.map((item) => (
                  <tr key={item._id} className="border-b text-center hover:bg-gray-50">
                    <td className="py-4 px-4 flex">
                      <button
                        onClick={(e) => handleDeleteItem(e, item._id)}
                        className="text-red-600 hover:text-red-800 mr-2"
                      >
                        <MdDeleteForever size={26} />
                      </button>
                      <img
                        src={`${import.meta.env.VITE_AXIOS_BASE_URL}/${item.product.images[0]}`}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover shadow-md"
                      />
                    </td>
                    <td className="py-4 px-4">
                      <NavLink to={`/product-details?id=${item.product._id}`} className="text-gray-700 hover:underline">
                        {item.product.name}
                      </NavLink>
                    </td>
                    <td className="py-4 px-4">₹{item.product.price}</td>
                    <td className="w-44">
                      <div className="flex items-center justify-center">
                        <button
                          type="button"
                          className="bg-gray-200 p-2 rounded-l"
                          onClick={(e) => updateCartItem(e, item.product._id, 'decrement')}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          min="1"
                          className="w-12 p-1 text-center border"
                          disabled
                        />
                        <button
                          type="button"
                          className="bg-gray-200 p-2 rounded-r"
                          onClick={(e) => updateCartItem(e, item.product._id, 'increment')}
                        >
                          +
                        </button>
                      </div>
                      {updateErrors[item.product._id] && (
                        <span className='text-red-500 text-sm mt-1 block'>
                          {updateErrors[item.product._id]}
                        </span>
                      )}
                    </td>
                    <td className="w-32">₹<span>{item.total}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4">
              <h4 className="text-lg font-bold">Cart Totals</h4>
              <div className="flex justify-between mt-2">
                <span>Items:</span>
                <span>{cartData.cart.length}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Total:</span>
                <span>₹{cartData.totalCartAmount}</span>
              </div>
              <NavLink to={`/checkout`} className="mt-4 block text-white text-center py-2 ">
                <Button>Proceed to Checkout</Button>
              </NavLink>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <p className="text-lg font-semibold">No items added</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;