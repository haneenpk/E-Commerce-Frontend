import React, { useEffect, useState } from 'react';
import Axios from "../../api/shared/instance";
import { NavLink } from 'react-router-dom';

const Home = () => {
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);

  // Fetch categories, brands, and products
  const fetchData = async () => {
    try {
      const categoryResponse = await Axios.get(`/api/user/get-category`);
      setCategories(categoryResponse.data.data);

      const productResponse = await Axios.get(`/api/user/get-products`);
      const productData = productResponse.data.data;
      setProducts(productData);

      // Extract unique brands from the products
      const uniqueBrands = [...new Set(productData.map((product) => product.brand))];
      setBrands(uniqueBrands);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter products based on selected filters and search query
  const filteredProducts = products.filter((product) => {
    return (
      (category === '' || product.categoryId?.name === category) &&
      (brand === '' || product.brand === brand) &&
      (searchQuery === '' || product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <div className="container mx-auto">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-semibold text-center mb-8 text-gray-800">Explore Our Products</h1>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search product name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Category Filter */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Brand Filter */}
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Brands</option>
            {brands.map((br, idx) => (
              <option key={idx} value={br}>
                {br}
              </option>
            ))}
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <NavLink to={`/product-details?id=${product._id}`}>
                <div key={product._id} className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  {/* Product Image */}
                  <img
                    src={`${import.meta.env.VITE_AXIOS_BASE_URL}/${product.images[0]}`}
                    alt={product.name}
                    className="w-full h-48 sm:h-56 object-cover rounded-lg mb-4"
                  />

                  {/* Product Details */}
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-lg font-bold text-blue-600 mb-4">₹{product.price}</p>
                </div>
              </NavLink>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
