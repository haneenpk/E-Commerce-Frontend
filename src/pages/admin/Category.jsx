import React, { useEffect, useState } from 'react';
import Axios from "../../api/shared/instance";
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Category = () => {
    const [query, setQuery] = useState('');
    const [categories, setCategories] = useState([]);

    const fetchCategory = async () => {
        try {
            const response = await Axios.get(`/api/admin/get-category`);
            console.log(response);
            setCategories(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();

        if (query.trim() === '') {
            // If the input is empty, reset to the original categories
            setCategories(originalCategories);
        } else {
            // Filter categories based on the query
            const filteredCategories = originalCategories.filter(category =>
                category.name.toLowerCase().includes(query.toLowerCase())
            );

            setCategories(filteredCategories);
        }
    };

    const deleteCategory = async (id) => {
        console.log(id);
        try {
            const response = await Axios.delete(`/api/admin/delete-catagory/${id}`);
            console.log(response);
            fetchCategory();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container mx-auto px-4 py-6 ">
            {/* Search Form */}
            <form onSubmit={handleSearch} className="mb-6">
                <div className="flex flex-wrap">
                    <div className="flex-1 pr-2">
                        <input
                            type="text"
                            name="query"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="form-control w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                            placeholder="Search..."
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary w-full md:w-auto md:ml-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-700"
                    >
                        Search
                    </button>
                </div>
            </form>

            {/* Add Category Button */}
            <Link to="/admin/add-category">
                <button className="mb-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-700">
                    Add Category
                </button>
            </Link>

            {/* Categories Table */}
            <div className="card mb-6 shadow-md border rounded-lg bg-white">
                <h5 className="card-header  text-lg font-semibold p-4">Categories</h5>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left text-gray-600">No</th>
                                <th className="px-4 py-2 text-left text-gray-600">Category Name</th>
                                <th className="px-4 py-2 text-left text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.length > 0 ? (
                                categories.map((category, index) => (
                                    <tr key={category._id} className="hover:bg-gray-100">
                                        <td className="px-4 py-2 font-semibold">{index + 1}</td>
                                        <td className="px-4 py-2">{category.name}</td>
                                        <td className="px-4 py-2">
                                            <NavLink to={`/admin/edit-category?id=${category._id}`} className="text-blue-500 hover:underline mr-2">
                                                Edit
                                            </NavLink>
                                            <button onClick={() => deleteCategory(category._id)} className="text-red-500 hover:underline">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center py-2 text-gray-500">
                                        No Results Found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Category;
