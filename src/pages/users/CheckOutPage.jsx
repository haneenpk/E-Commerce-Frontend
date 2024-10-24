import React, { useState, useEffect } from 'react';
import Axios from "../../api/shared/instance";
import { IoCloseCircleSharp } from "react-icons/io5";
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'sonner'

const CheckoutPage = () => {

    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);
    const [selectAddress, setSelectAddress] = useState(null);
    const [allAddress, setAllAddress] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

    const loadCheckoutData = async () => {
        try {
            const response = await Axios.get(`/api/user/loadCheckout`);
            const { user, selectAddress, allAddress } = response.data.data;
            setUserData(user);
            setSelectAddress(selectAddress);
            setAllAddress(allAddress);
        } catch (error) {
            console.error('Error loading checkout data:', error);
        }
    };

    useEffect(() => {
        loadCheckoutData();
    }, []);

    const handleSelectedAddress = async (id) => {
        try {
            const response = await Axios.get(`/api/user/select-address?id=${id}`);
            loadCheckoutData();
        } catch (error) {
            console.error('Error loading checkout data:', error);
        }

    }

    const handleConfirmOrder = async () => {
        if (!selectedPayment || !selectAddress) {
            setErrorMessage('Please select a payment option and delivery address.');
        } else {
            setErrorMessage('');

            const response = await Axios.post(`/api/user/order-product`, { selectedPayment });
            toast.success('Order Successfull');
            navigate('/order');
        }
    };

    const handlePaymentChange = (event) => {
        setSelectedPayment(event.target.value);
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto py-8 px-4 lg:px-0">
            <div className="flex flex-wrap">
                {/* Cart Items */}
                <div className="w-full lg:w-2/3 px-4 mb-6 lg:mb-0">
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <table className="table-auto w-full mb-4">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="py-2 px-4 text-left">Product</th>
                                    <th className="py-2 px-4"></th>
                                    <th className="py-2 px-4 text-right">Price</th>
                                    <th className="py-2 px-4 text-right">Quantity</th>
                                    <th className="py-2 px-4 text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userData.cart.map((item, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="py-2 px-4">
                                            <img src={`${import.meta.env.VITE_AXIOS_BASE_URL}/${item.product.images[0]}`} alt={item.product.name} className="rounded-sm w-12 h-12 object-cover" />
                                        </td>
                                        <td className="py-2 px-4">{item.product.name}</td>
                                        <td className="py-2 px-4 text-right">₹{item.product.price}</td>
                                        <td className="py-2 px-4 text-right">{item.quantity}</td>
                                        <td className="py-2 px-4 text-right">₹{item.total}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Selected Address */}
                        <div className="bg-gray-100 p-4 mb-4 rounded-lg">
                            {selectAddress ? (
                                <div className="flex justify-between">
                                    <div>
                                        <span className='text-lg'><u>Selected Address</u></span>
                                        <p className="font-semibold">Name: {selectAddress.name}</p>
                                        <p>{`${selectAddress.city}, ${selectAddress.state}, ${selectAddress.country}`}</p>
                                    </div>
                                </div>
                            ) : (
                                <p>Please select an address for delivery</p>
                            )}

                            {/* Button to trigger Address Modal */}
                            <button
                                type="button"
                                className="bg-blue-500 text-white mt-2 py-1 px-4 rounded"
                                onClick={() => setIsAddressModalOpen(true)}
                            >
                                Select Address
                            </button>
                        </div>

                        {/* Address Modal */}
                        {isAddressModalOpen && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75">
                                <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                                    <h5 className="text-lg font-semibold mb-4">Select Address</h5>

                                    {/* Close Button */}
                                    <button
                                        className="absolute top-4 right-4 text-gray-400"
                                        onClick={() => setIsAddressModalOpen(false)}
                                    >
                                        <IoCloseCircleSharp size={40} />
                                    </button>

                                    <div className="overflow-y-auto max-h-64">
                                        {allAddress.length ? (
                                            allAddress.map((address, index) => (
                                                <div key={index} className="mb-4 p-4 border">
                                                    <h5>Address {index + 1}</h5>
                                                    <p>{`${address.name}, ${address.city}, ${address.state}, ${address.country}`}</p>
                                                    <button
                                                        className="bg-green-500 text-white py-1 px-2 rounded mt-2"
                                                        onClick={() => {
                                                            // setSelectAddress(address);
                                                            handleSelectedAddress(address._id)
                                                            setIsAddressModalOpen(false);
                                                        }}
                                                    >
                                                        Select
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No additional addresses found. Add a new one.</p>
                                        )}
                                    </div>

                                    {/* Add New Address Button */}
                                    <div className="mt-4">
                                        <NavLink
                                            to="/add-address"
                                            className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full text-center block"
                                            onClick={() => setIsAddressModalOpen(false)} // Close modal on navigation
                                        >
                                            Add New Address
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="w-full lg:w-1/3 px-4">
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h4 className="font-semibold mb-6">Your Order</h4>
                        <div className="flex justify-between mb-4">
                            <span>Items :</span>
                            <span>{userData.cart.length}</span>
                        </div>

                        <div className="flex justify-between mb-4">
                            <span>Total :</span>
                            <span className="font-semibold">₹{userData.totalCartAmount}</span>
                        </div>

                        {/* Payment Options */}
                        <div className="mb-6">
                            <h5 className="font-semibold mb-2">Select Payment Option</h5>
                            <div>
                                <label className="block mb-2">
                                    <input
                                        type="radio"
                                        name="paymentOptions"
                                        value="Cash on delivery"
                                        checked={selectedPayment === 'Cash on delivery'}
                                        onChange={handlePaymentChange}
                                        className="mr-2"
                                    />
                                    Cash on delivery
                                </label>
                                <label className="block mb-2">
                                    <input
                                    disabled
                                        type="radio"
                                        name="paymentOptions"
                                        value="Razorpay"
                                        checked={selectedPayment === 'Razorpay'}
                                        onChange={handlePaymentChange}
                                        className="mr-2"
                                    />
                                    {"(Razorpay is Upcoming)"}
                                </label>
                            </div>
                        </div>

                        {/* Confirm Order Button */}
                        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
                        <button
                            className="bg-blue-500 text-white py-2 px-6 rounded-lg w-full"
                            onClick={handleConfirmOrder}
                        >
                            Confirm Order
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;