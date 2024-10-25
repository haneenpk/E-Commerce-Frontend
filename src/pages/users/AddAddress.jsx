import React, { useState } from 'react';
import Axios from "../../api/shared/instance";
import { useNavigate, NavLink } from 'react-router-dom';
import { Breadcrumbs, Button } from "@material-tailwind/react";

const AddAddress = () => {
    const navigate = useNavigate();

    // State to store form input values
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        country: '',
        state: '',
        district: '',
        city: '',
        pincode: '',
        address: ''
    });

    const [errorMessage, setErrorMessage] = useState('');

    // Handle input changes
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate mobile number
        const { mobile } = formData;
        if (!/^\d{10}$/.test(mobile)) {
            setErrorMessage('Mobile number should be 10 digits.');
            return;
        }

        try {
            // Make POST request to add address
            console.log(formData);

            await Axios.post('/api/user/add-address-checkout', formData);

            // Redirect to the checkout page
            navigate('/checkout');
        } catch (error) {
            setErrorMessage('Error adding address. Please try again.');
            console.error('Error:', error);
        }
    };

    return (
        <section className="bg-gray-100 p-4">
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
                <NavLink to="/checkout">Checkout</NavLink>
                <NavLink to="/add-address">Add Address</NavLink>
            </Breadcrumbs>
            <div className="container mx-auto mb-4">
                <div className="flex justify-center">
                    <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
                        <Button
                            onClick={() => navigate('/checkout')}
                            className="text-white px-4 py-2 rounded mb-4"
                        >
                            Back to Checkout
                        </Button>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="username" className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="w-full p-2 border rounded"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="mobile" className="block text-gray-700">Phone Number</label>
                                <input
                                    type="tel"
                                    name="mobile"
                                    className="w-full p-2 border rounded"
                                    placeholder="Phone Number"
                                    value={formData.mobile}
                                    onChange={handleInputChange}
                                    pattern="[0-9]*"
                                    inputMode="numeric"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="country" className="block text-gray-700">Country</label>
                                <input
                                    type="text"
                                    name="country"
                                    className="w-full p-2 border rounded"
                                    placeholder="Country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="state" className="block text-gray-700">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    className="w-full p-2 border rounded"
                                    placeholder="State"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="district" className="block text-gray-700">District</label>
                                <input
                                    type="text"
                                    name="district"
                                    className="w-full p-2 border rounded"
                                    placeholder="District"
                                    value={formData.district}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="city" className="block text-gray-700">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    className="w-full p-2 border rounded"
                                    placeholder="City"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="pincode" className="block text-gray-700">Pincode</label>
                                <input
                                    type="text"
                                    name="pincode"
                                    className="w-full p-2 border rounded"
                                    placeholder="Pincode"
                                    value={formData.pincode}
                                    onChange={handleInputChange}
                                    pattern="[0-9]*"
                                    inputMode="numeric"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="address" className="block text-gray-700">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    className="w-full p-2 border rounded"
                                    placeholder="Your Address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            {errorMessage && (
                                <div className="text-red-500 text-center font-semibold mb-4">
                                    {errorMessage}
                                </div>
                            )}
                            <Button type="submit" className="bg-green-500 w-full">
                                Add Address
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AddAddress;
