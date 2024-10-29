import React, { useEffect, useState } from 'react';
import Axios from "../../api/shared/instance";
import { useNavigate } from 'react-router-dom';
import { productSchema } from "../../validations/adminValidations/productSchema";
import handleInputChange from "../../utils/formUtils/handleInputChange";
import handleFormErrors from "../../utils/formUtils/handleFormErrors";
import FormErrorDisplay from "../../components/common/FormErrorDisplay";
import { Breadcrumbs, Button } from "@material-tailwind/react";
import { NavLink } from 'react-router-dom';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    brand: '',
    stock: '',
    categoryId: '',
    images: null,
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [serverResponse, setServerResponse] = useState("");

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

  const handleChange = (e) => {
    handleInputChange(e, formData, setFormData, setServerResponse, setErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate form data against the product schema
      await productSchema.validate(formData, { abortEarly: false });

      setErrors({}); // Clear previous validation errors

      // Create FormData object to handle file uploads
      const productData = new FormData();
      productData.append('name', formData.name);
      productData.append('price', formData.price);
      productData.append('description', formData.description);
      productData.append('brand', formData.brand);
      productData.append('stock', formData.stock);
      productData.append('category', formData.categoryId);

      // Convert FileList to an array and append each image
      Array.from(formData.images).forEach((image) => {
        productData.append('images', image);
      });

      // Send product data to the server
      const response = await Axios.post(`/api/admin/add-product`, productData);
      console.log(response.data.message);

      navigate("/admin/product");

    } catch (error) {
      handleFormErrors(error, setErrors, setServerResponse);
    }
  };

  return (
    <div className="py-5 px-8">

      <Breadcrumbs className='mb-5'>
        <NavLink to="/admin/product" className="opacity-60">
          Products
        </NavLink>
        <NavLink to="/admin/add-product">Add Product</NavLink>
      </Breadcrumbs>
      <div className='flex items-center justify-center '>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-1/2">
          <NavLink to="/admin/product" >
            <Button className="bg-blue-600 text-white rounded-lg mb-4 block text-center hover:bg-blue-700 transition duration-200">
              Back to Products
            </Button>
          </NavLink>
          <label className="block text-gray-600 font-semibold text-2xl mb-2 text-center" htmlFor="categoryName">
            Add Product
          </label>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              id="name"
              name={"name"}
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <FormErrorDisplay error={errors.name} />}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="text"
              id="price"
              name={"price"}
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter product price"
              value={formData.price}
              onChange={handleChange}
            />
            {errors.price && <FormErrorDisplay error={errors.price} />}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              id="description"
              name={"description"}
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter product description"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && <FormErrorDisplay error={errors.description} />}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Brand</label>
            <input
              type="text"
              id="brand"
              name={"brand"}
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter brand name"
              value={formData.brand}
              onChange={handleChange}
            />
            {errors.brand && <FormErrorDisplay error={errors.brand} />}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Stock</label>
            <input
              type="text"
              id="stock"
              name={"stock"}
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter stock quantity"
              value={formData.stock}
              onChange={handleChange}
            />
            {errors.stock && <FormErrorDisplay error={errors.stock} />}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Images (up to 3)</label>
            <input
              type="file"
              id="images"
              name={"images"}
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              accept="image/*"
              multiple
              onChange={(e) => setFormData({ ...formData, images: e.target.files })}
            />
            {errors.images && <FormErrorDisplay error={errors.images} />}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="categoryId" id="categoryId"
              className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              value={formData.categoryId}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && <FormErrorDisplay error={errors.categoryId} />}
          </div>

          {serverResponse && (
            <div className="p-3 text-center font-bold text-red-600" role="alert">
              {serverResponse.message}
            </div>
          )}

          <div className="text-center">
            <Button
              type="submit"
              className="bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
            >
              Add Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
