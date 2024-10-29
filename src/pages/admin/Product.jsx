import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from "../../api/shared/instance";
import { Button } from "@material-tailwind/react";

const Product = () => {
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([]);

    const fetchData = async () => {
        try {
            const response1 = await Axios.get(`/api/admin/get-category`);
            setCategories(response1.data.data);

            const response2 = await Axios.get(`/api/admin/get-products`);
            const productData = response2.data.data;
            setProducts(productData);

            // Extract unique brands from products
            const uniqueBrands = [...new Set(productData.map((product) => product.brand))];
            setBrands(uniqueBrands);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredProducts = products.filter((product) => {
        return (
            (category === '' || product.categoryId?.name === category) &&
            (brand === '' || product.brand === brand) &&
            (searchQuery === '' || product.name.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    });

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleBrandChange = (e) => {
        setBrand(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="container py-8 px-8">

            {/* Filter Section */}
            <div className="flex justify-between mb-6 gap-x-4">
                <input
                    type="text"
                    placeholder="Search product name..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                />
                <div className="w-full ">
                    <select
                        value={category}
                        onChange={handleCategoryChange}
                        className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                    >
                        <option value="">All Categories</option>
                        {categories.map((cat, idx) => (
                            <option key={idx} value={cat.name}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="w-full ">
                    <select
                        value={brand}
                        onChange={handleBrandChange}
                        className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                    >
                        <option value="">All Brands</option>
                        {brands.map((br, idx) => (
                            <option key={idx} value={br}>
                                {br}
                            </option>
                        ))}
                    </select>
                </div>

            </div>

            <Link to="/admin/add-product">
                <Button className="bg-blue-600 text-white mb-8 rounded-lg shadow hover:bg-blue-700 transition duration-200">
                    Add Product
                </Button>
            </Link>

            {/* Products Table */}
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="table-auto w-full divide-y">
                    <thead>
                        <tr className="text-gray-700">
                            <th className="p-3">Product Image</th>
                            <th className="p-3">Product Name</th>
                            <th className="p-3">Brand</th>
                            <th className="p-3">Category</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <tr key={product._id} className="border-b hover:bg-gray-50 transition duration-200 text-center">
                                    <td className="p-3">
                                        <img
                                            src={`${import.meta.env.VITE_AXIOS_BASE_URL}/${product.images[0]}`}
                                            alt={product.images[0]}
                                            className="w-16 h-20 object-cover rounded-sm shadow-sm"
                                        />
                                    </td>
                                    <td className="p-3">{product.name}</td>
                                    <td className="p-3">{product.brand}</td>
                                    {/* Fallback if category or category name is missing */}
                                    <td className="p-3">{product.categoryId?.name || "Uncategorized"}</td>
                                    <td className="p-3">₹{product.price}</td>
                                    <td className="p-3">{product.stock}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center p-3">
                                    No products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Product;
