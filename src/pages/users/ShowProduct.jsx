import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Axios from "../../api/shared/instance";

const ShowProduct = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const productId = queryParams.get("id");

    const [product, setProduct] = useState(null);

    const fetchProduct = async () => {
        try {
            const response = await Axios.get(`/api/user/get-product/${productId}`);
            setProduct(response.data.data);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [productId]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
            <div className="container mx-auto">
                {/* Product Section */}
                <div className="flex flex-col lg:flex-row gap-10 lg:px-14">
                    {/* Product Image */}
                    <div className="w-full lg:w-1/2 justify-center items-center flex">
                        <img
                            src={`${import.meta.env.VITE_AXIOS_BASE_URL}/${product.images[0]}`}
                            alt={product.name}
                            className="w-1/2 h-96 object-cover rounded-lg shadow-lg"
                        />
                    </div>

                    {/* Product Details */}
                    <div className="w-full lg:w-1/2">
                        {/* Product Name */}
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
                        
                        {/* Brand and Category */}
                        <p className="text-lg text-gray-600 mb-2">Brand: <span className="font-medium">{product.brand}</span></p>
                        <p className="text-lg text-gray-600 mb-6">Category: <span className="font-medium">{product.categoryId?.name || 'Uncategorized'}</span></p>
                        
                        {/* Price */}
                        <p className="text-4xl font-semibold text-blue-600 mb-6">₹{product.price}</p>

                        {/* Stock Availability */}
                        <p className={`text-lg font-medium mb-6 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
                        </p>

                        {/* Product Description */}
                        <p className="text-base text-gray-700 mb-6 leading-relaxed">
                            {product.description}
                        </p>

                        {/* Add to Cart Button */}
                        <button
                            disabled={product.stock === 0}
                            className={`w-full bg-blue-500 text-white py-3 rounded-lg shadow-lg hover:bg-blue-600 transition-colors ${
                                product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ShowProduct;
