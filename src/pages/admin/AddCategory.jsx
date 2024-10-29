import React, { useState } from 'react';
import Axios from "../../api/shared/instance";
import { useNavigate } from 'react-router-dom';
import { categorySchema } from "../../validations/adminValidations/categorySchema";
import handleInputChange from "../../utils/formUtils/handleInputChange";
import handleFormErrors from "../../utils/formUtils/handleFormErrors";
import FormErrorDisplay from "../../components/common/FormErrorDisplay";
import { Breadcrumbs, Button } from "@material-tailwind/react";
import { NavLink } from 'react-router-dom';

const AddCategory = () => {
    const [categoryName, setCategoryName] = useState({ name: "" });

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [serverResponse, setServerResponse] = useState("");

    const handleChange = (e) => {
        handleInputChange(e, categoryName, setCategoryName, setServerResponse, setErrors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            // Validate categoryName against the signup schema
            await categorySchema.validate(categoryName, { abortEarly: false });

            setErrors({}); // Clear previous validation errors

            // If validation passes, proceed with signup
            const response = await Axios.post(`/api/admin/add-category`, categoryName);

            console.log(response.data.message);

            navigate('/admin/category');

        } catch (error) {
            handleFormErrors(error, setErrors, setServerResponse);
        }
    };

    return (
        <div className="px-8 py-5">
            <Breadcrumbs className='mb-16'>
                <NavLink to="/admin/category" className="opacity-60">
                    Category
                </NavLink>
                <NavLink to="/admin/add-category">Add Category</NavLink>
            </Breadcrumbs>
            <div className='flex items-center justify-center'>


                <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
                    <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Add New Category</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="categoryName">
                                Category Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name={"name"}
                                value={categoryName.name}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                placeholder="Enter category name"
                            />
                            {errors.name && <FormErrorDisplay error={errors.name} />}
                        </div>

                        {serverResponse && (
                            <div className="p-3 text-center font-bold text-red-600" role="alert">
                                {serverResponse.message}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition duration-200"
                        >
                            Add Category
                        </Button>
                    </form>

                    <div className="mt-4 text-center">
                        <a href="/admin/category" className="text-blue-500 hover:underline">
                            Back to Categories
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCategory;
