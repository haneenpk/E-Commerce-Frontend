import * as Yup from 'yup';

export const productSchema = Yup.object({
    name: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "Product Name should contain letters and spaces only.")
        .required("Product Name is required"),

    price: Yup.string()
        .matches(/^\d+$/, "Price should contain numbers only.")
        .required("Price is required"),

    description: Yup.string()
        .matches(/^[A-Za-z0-9,.\s]+$/, "Description should contain letters, numbers, commas, full stops, and spaces only.")
        .required("Description is required"),

    brand: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "Brand should contain letters and spaces only.")
        .required("Brand is required"),

    stock: Yup.string()
        .matches(/^\d+$/, "Stock should be a valid number.")
        .required("Stock is required"),

    images: Yup.mixed()
        .required("Image path is required")
        .test('fileLength', "You can upload up to 3 images", (value) => value && value.length <= 3),
    categoryId: Yup.string()
        .required("Category is required"),
});
