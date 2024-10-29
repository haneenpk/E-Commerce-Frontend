import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { toast } from 'sonner'
import Axios from "../../api/shared/instance";
import { Button } from "@material-tailwind/react";

const ShowProduct = () => {

    const isUserLoggedIn = useSelector(state => state.user.isLoggedIn);

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const productId = queryParams.get("id");

    const [product, setProduct] = useState(null);
    const [displayBtn, setDisplayBtn] = useState(false)

    const fetchProduct = async () => {
        try {
            const response = await Axios.get(`/api/user/get-product/${productId}?userId=${localStorage.getItem('userData')}`);
            console.log(response.data.message);
            if (response.data.message === 'already exist') {
                setDisplayBtn(true)
            }
            setProduct(response.data.data);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    const addToCart = async () => {
        try {
            if (isUserLoggedIn) {

                const response = await Axios.get(`/api/user/add-cart/${productId}`);
                fetchProduct();
                toast.success('Added To Cart');
            } else {
                navigate("/login");
            }
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    }

    useEffect(() => {
        fetchProduct();
    }, [productId]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="pb-5 md:py-10 px-4 md:px-8">
            <div className="container mx-auto">
                {/* Product Section */}
                <div className="flex flex-col lg:flex-row gap-10 lg:px-14">
                    {/* Product Image */}
                    <div className="w-full lg:w-1/2 justify-center items-center flex">
                        <img
                            src={`${import.meta.env.VITE_AXIOS_BASE_URL}/${product.images[0]}`}
                            alt={product.name}
                            className="w-full lg:w-1/2 h-96 object-cover rounded-lg shadow-lg"
                        />
                    </div>

                    {/* Product Details */}
                    <div className="w-full lg:w-1/2 bg-white shadow-md p-6 rounded-md">
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

                        {displayBtn ? (
                            <Link to="/cart">
                                <Button
                                    disabled={product.stock === 0}
                                    className={`w-full ${product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                >
                                    {product.stock > 0 ? 'Go to Cart' : 'Out of Stock'}
                                </Button>
                            </Link>
                        ) : (
                            <Button
                                onClick={addToCart}
                                disabled={product.stock === 0}
                                className={`w-full ${product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                            >
                                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                            </Button>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ShowProduct;
