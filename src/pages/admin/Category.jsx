import React, { useEffect, useState } from 'react';
import Axios from "../../api/shared/instance";
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { Button } from "@material-tailwind/react";

const Category = () => {
    const [query, setQuery] = useState('');
    const [categories, setCategories] = useState([]);
    const [originalCategories, setOriginalCategories] = useState([]); // Store the original list of categories

    // Fetch categories from the server
    const fetchCategory = async () => {
        try {
            const response = await Axios.get(`/api/admin/get-category`);
            setCategories(response.data.data);
            setOriginalCategories(response.data.data); // Store the original list
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    const handleSearch = (e) => {
        const searchQuery = e.target.value;
        setQuery(searchQuery);

        if (searchQuery.trim() === '') {
            // If the input is empty, reset to the original categories
            setCategories(originalCategories);
        } else {
            // Filter categories based on the query
            const filteredCategories = originalCategories.filter(category =>
                category.name.toLowerCase().includes(searchQuery.toLowerCase())
            );

            setCategories(filteredCategories);
        }
    };

    const deleteCategory = async (id) => {
        try {
            await Axios.delete(`/api/admin/delete-catagory/${id}`);
            fetchCategory(); // Refetch categories after deletion
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container mx-auto px-4 py-6 ">
            {/* Search Input */}
            <div className="mb-6">
                <input
                    type="text"
                    name="query"
                    value={query}
                    onChange={handleSearch}  // Real-time filtering
                    className="form-control w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                    placeholder="Search categories..."
                />
            </div>

            {/* Add Category Button */}
            <Link to="/admin/add-category">
                <Button className="mb-4 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-200">
                    Add Category
                </Button>
            </Link>

            {/* Categories Table */}
            <div className="card mb-6 shadow-md border rounded-lg bg-white">
                <h5 className="card-header text-lg font-semibold p-4">Categories</h5>
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
                                        <td className="px-4 py-2 flex">
                                            <NavLink to={`/admin/edit-category?id=${category._id}`} className="text-blue-500 hover:underline mr-2">
                                                <CiEdit size={26} />
                                            </NavLink>
                                            <button onClick={() => deleteCategory(category._id)} className="text-red-500 hover:underline">
                                                <MdDeleteForever size={26} />
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
