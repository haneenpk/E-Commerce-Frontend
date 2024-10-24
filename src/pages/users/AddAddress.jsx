import React, { useState } from 'react';
import Axios from "../../api/shared/instance";
import { useNavigate } from 'react-router-dom';

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
            <div className="container mx-auto mb-4">
                <h2 className="text-2xl font-semibold mb-4">Add Address</h2>
                <div className="flex justify-center">
                    <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
                        <button
                            onClick={() => navigate('/checkout')}
                            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                        >
                            Back to Checkout
                        </button>

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
                            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">
                                Add Address
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AddAddress;
