import React, { useState, useEffect } from 'react';
import Axios from "../../api/shared/instance";

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
            <div key={order._id} className="flex gap-10 flex-column flex-md-row border p-3 mb-3 bg-white rounded-lg">
                <div className="col-md-3 col-12 d-flex justify-content-center mb-5">
                    <a href={`/productDetail?id=${order.orderedProducts[0]._id}`}>
                        <img
                            src={`${import.meta.env.VITE_AXIOS_BASE_URL}/${order.orderedProducts[0].images[0]}`}
                            alt="Image"
                            height="180px"
                            width="180px"
                            className="img-fluid rounded-md shadow-md"
                        />
                    </a>
                </div>
                <div className="col-md-6">
                    <span className="d-block text-primary h6 text-uppercase">
                        {order.orderedProducts[0].name}
                    </span>
                    <p>
                        Price: ₹{order.products.total}, Quantity: {order.products.quantity},<br />
                        Payment Method: {order.paymentMethod},<br />
                        Delivery Address: {`${order.deliveryAddress.city}, ${order.deliveryAddress.pincode}, ${order.deliveryAddress.district}, ${order.deliveryAddress.state}, ${order.deliveryAddress.country}`}<br />
                    </p>
                    <div className="d-flex">
                        <div>
                            <p className="text-black">
                                Order Confirmed: {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : "Awaiting confirmation"}
                            </p>
                            <p className="text-black">
                                Delivery: {order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString() : "Awaiting delivery"}<br />
                            </p>
                            <p className="text-black mt-3">
                                Status: <span className='text-blue-400'>{order.status}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        ));
    };

    const calculateSevenDaysAfterDelivery = (deliveryDate) => {
        const currentDate = new Date();
        const sevenDaysAfterDelivery = new Date(deliveryDate);
        sevenDaysAfterDelivery.setDate(sevenDaysAfterDelivery.getDate() + 7);
        return currentDate <= sevenDaysAfterDelivery;
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-center text-2xl font-bold mb-4">Order History</h1>
            {renderOrders()}
        </div>
    );
};

export default OrderHistory;