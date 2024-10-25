import React, { useEffect, useState } from "react";
import Axios from "../../api/shared/instance";
import { toast } from 'sonner'

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [statusFilter, setStatusFilter] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [openDropdownId, setOpenDropdownId] = useState(null); // Track open dropdown per order

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        applyFilters(); // Apply filters whenever statusFilter or searchQuery changes
    }, [statusFilter, searchQuery, orders]);

    const fetchOrders = async () => {
        try {
            const response = await Axios.get("/api/admin/order");
            setOrders(response.data.data);
            setFilteredOrders(response.data.data); // Set filtered orders initially
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const toggleDropdown = (orderId) => {
        setOpenDropdownId(prevId => (prevId === orderId ? null : orderId)); // Toggle dropdown for specific order
    };

    const updateStatus = async (orderId, action) => {
        try {
            const response = await Axios.get(`/api/admin/order/action-update?orderId=${orderId}&action=${action}`);
            toast.success('Updated Status');
            fetchOrders();
            toggleDropdown(orderId)
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    }

    const applyFilters = () => {
        let filtered = [...orders];

        // Filter by status
        if (statusFilter) {
            filtered = filtered.filter(order => order.status === statusFilter);
        }

        // Search by user
        if (searchQuery) {
            filtered = filtered.filter(order =>
                order.user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.user.email.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredOrders(filtered);
    };

    const handleStatusChange = (e) => {
        setStatusFilter(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="p-5 px-10">
            {/* Filters Section */}
            <div className="mb-4">
                <form className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search by user"
                        className="form-input p-2 rounded border border-gray-300"
                    />
                    <select
                        value={statusFilter}
                        onChange={handleStatusChange}
                        className="form-select p-2 rounded border border-gray-300"
                    >
                        <option value="">All Status</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </form>
            </div>

            {/* Orders Table */}
            <div className="bg-white shadow-md rounded p-4">
                <h2 className="text-xl font-bold mb-4">Orders</h2>
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="text-left border-b">
                            <th className="p-2">Customer</th>
                            <th className="p-2">Products</th>
                            <th className="p-2">Address</th>
                            <th className="p-2">Total</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Payment Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order) => (
                                <tr key={order?._id} className="border-b">
                                    <td className="p-2">
                                        {order?.user?.username || 'N/A'}
                                        <br />
                                        {order?.user?.email || 'N/A'}
                                    </td>
                                    <td className="p-2">
                                        {order?.products?.map((product, index) => (
                                            <div key={index}>
                                                {product?.isCancelled ? (
                                                    <del className="text-red-500">
                                                        {product?.product?.name || 'Unknown Product'} : {product?.quantity || 0}
                                                    </del>
                                                ) : (
                                                    <span>
                                                        {product?.product?.name || 'Unknown Product'} : {product?.quantity || 0}
                                                    </span>
                                                )}
                                            </div>
                                        )) || 'No products'}
                                    </td>
                                    <td className="p-2">
                                        {order?.deliveryAddress ? (
                                            <>
                                                {order.deliveryAddress.name || 'N/A'},<br />
                                                {order.deliveryAddress.mobile || 'N/A'},<br />
                                                {order.deliveryAddress.address || 'N/A'},<br />
                                                {order.deliveryAddress.city || 'N/A'},<br />
                                                {order.deliveryAddress.district || 'N/A'},<br />
                                                {order.deliveryAddress.state || 'N/A'},<br />
                                                {order.deliveryAddress.country || 'N/A'}
                                            </>
                                        ) : (
                                            'No address available'
                                        )}
                                    </td>
                                    <td className="p-2">₹{order?.totalAmount || 0}</td>
                                    <td className="p-2">
                                        {order?.status === "Delivered" ? (
                                            <span className="text-green-500">Delivered</span>
                                        ) : (
                                            <div className="relative inline-block text-left">
                                                <button
                                                    className="bg-red-500 text-white p-2 w-28 rounded "
                                                    onClick={() => toggleDropdown(order?._id)}
                                                >
                                                    {order?.status || 'Unknown'}
                                                </button>
                                                {openDropdownId === order?._id && (
                                                    <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded z-10">
                                                        <button
                                                            className="block px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100"
                                                            onClick={() => updateStatus(order._id, "Processing")}
                                                        >
                                                            Processing
                                                        </button>
                                                        <button
                                                            className="block px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100"
                                                            onClick={() => updateStatus(order._id, "Shipped")}
                                                        >
                                                            Shipped
                                                        </button>
                                                        <button
                                                            className="block px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100"
                                                            onClick={() => updateStatus(order._id, "Delivered")}
                                                        >
                                                            Delivered
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-2">{order?.paymentMethod || 'N/A'}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center p-4">
                                    No orders found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrdersPage;
