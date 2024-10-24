import React, { useState, useEffect } from 'react';
import Axios from "../../api/shared/instance";
import { Stepper, Step, Typography } from "@material-tailwind/react";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [activeStep, setActiveStep] = useState(0);

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
            <div key={order._id} className="flex flex-col lg:flex-row border p-4 mb-3 bg-white rounded-lg shadow-lg">
                <div className="lg:w-1/3 w-full flex justify-center lg:justify-start mb-5 lg:mb-0">
                    <a href={`/productDetail?id=${order.orderedProducts[0]._id}`}>
                        <img
                            src={`${import.meta.env.VITE_AXIOS_BASE_URL}/${order.orderedProducts[0].images[0]}`}
                            alt="Order Product"
                            className="w-40 h-40 object-cover rounded-md shadow-md"
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

                    <div className="mt-10">
                        <Stepper
                            activeStep={order.status === "Processing" ? 0 : order.status === "Shipped" ? 1 : 2}
                        >
                            <Step>
                                <div className="text-center -mt-16">
                                    <Typography
                                        variant="h6"
                                        color={activeStep === 0 ? "blue-gray" : "gray"}
                                    >
                                        Processing
                                    </Typography>
                                </div>
                            </Step>
                            <Step>
                                <div className="text-center -mt-16">
                                    <Typography
                                        variant="h6"
                                        color={activeStep === 1 ? "blue-gray" : "gray"}
                                    >
                                        Shipped
                                    </Typography>
                                </div>
                            </Step>
                            <Step>
                                <div className="text-center -mt-16">
                                    <Typography
                                        variant="h6"
                                        color={activeStep === 2 ? "blue-gray" : "gray"}
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
        <div className="container mx-auto px-4 lg:px-20">
            <h1 className="text-center text-2xl lg:text-3xl font-bold mb-6">Order History</h1>
            {orders.length > 0 ? renderOrders() : <p className="text-center">No orders found.</p>}
        </div>
    );
};

export default OrderHistory;
