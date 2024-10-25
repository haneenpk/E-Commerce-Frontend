import React, { useState, useEffect } from 'react';
import Axios from "../../api/shared/instance";
import { Stepper, Step, Typography } from "@material-tailwind/react";
import { Breadcrumbs } from "@material-tailwind/react";
import { NavLink } from 'react-router-dom';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await Axios.get('/api/user/order');
                setOrders(response.data.orders);
            } catch (error) {
                console.error(error);
                // Handle errors appropriately
            }
        };

        fetchOrders();
    }, []);

    const renderOrders = () => {
        return orders.map((order) => (
            <div key={`${order._id}-${order.orderedProducts[0]._id}`} className="flex flex-col lg:flex-row border p-4 mb-3 bg-white rounded-lg shadow-lg">
                <div className="lg:w-1/3 w-full flex justify-center lg:justify-start items-center mb-5 lg:mb-0">
                    <a href={`/productDetail?id=${order.orderedProducts[0]._id}`}>
                        <img
                            src={`${import.meta.env.VITE_AXIOS_BASE_URL}/${order.orderedProducts[0].images[0]}`}
                            alt="Order Product"
                            className="w-60 h-60 object-cover rounded-md shadow-md"
                        />
                    </a>
                </div>
                <div className="lg:w-2/3 w-full">
                    <h2 className="text-primary text-xl font-semibold">
                        {order.orderedProducts[0].name}
                    </h2>
                    <p className="mt-2">
                        <span className="font-semibold">Price:</span> ₹{order.products.total}, <span className="font-semibold">Quantity:</span> {order.products.quantity}<br />
                        <span className="font-semibold">Payment Method:</span> {order.paymentMethod}<br />
                        <span className="font-semibold">Delivery Address:</span> {`${order.deliveryAddress.city}, ${order.deliveryAddress.pincode}, ${order.deliveryAddress.district}, ${order.deliveryAddress.state}, ${order.deliveryAddress.country}`}
                    </p>
                    <div className="mt-3">
                        <p className="text-black">
                            <span className="font-semibold">Order Confirmed:</span> {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : "Awaiting confirmation"}
                        </p>
                        <p className="text-black">
                            <span className="font-semibold">Delivery:</span> {order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString() : "Awaiting delivery"}
                        </p>
                        <p className="text-black mt-2">
                            <span className="font-semibold">Status:</span> <span className={`text-blue-400`}>{order.status}</span>
                        </p>
                    </div>

                    <div className="mt-10 mr-8">
                        <Stepper
                            color='green'
                            activeStep={order.status === "Delivered" ? 3 : order.status === "Shipped" ? 1 : 0}
                        >
                            <Step color='green'>
                                <div className="text-center -mt-16">
                                    <Typography
                                        variant="h6"
                                        color={order.status ? "amber" : "gray"}
                                    >
                                        Processing
                                    </Typography>
                                </div>
                            </Step>
                            <Step color='green'>
                                <div className="text-center -mt-16">
                                    <Typography
                                        variant="h6"
                                        color={order.status === "Shipped" || order.status === "Delivered" ? "green" : "gray"}
                                    >
                                        Shipped
                                    </Typography>
                                </div>
                            </Step>
                            <Step color='green'>
                                <div className="text-center -mt-16">
                                    <Typography
                                        variant="h6"
                                        color={order.status === "Delivered" ? "green" : "gray"}
                                    >
                                        Delivered
                                    </Typography>
                                </div>
                            </Step>
                        </Stepper>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div className="container mx-auto px-4 lg:px-20 pb-5">
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
                <NavLink to="/order">My Order</NavLink>
            </Breadcrumbs>
            {orders.length > 0 ? renderOrders() : <p className="text-center">No orders found.</p>}
        </div>
    );
};

export default OrderHistory;
