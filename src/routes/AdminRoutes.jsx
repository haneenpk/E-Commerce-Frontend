import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";
const Category = lazy(() => import("../pages/admin/Category"));
const AddCategory = lazy(() => import("../pages/admin/AddCategory"));
const EditCategory = lazy(() => import("../pages/admin/EditCategory"));
const Product = lazy(() => import("../pages/admin/Product"));
const AddProduct = lazy(() => import("../pages/admin/AddProduct"));
const Orders = lazy(() => import("../pages/admin/Orders"));

import Login from "../pages/users/auth/Login";
import ErrorPage from "../pages/ErrorPage";

const AdminRoutes = ({ isLoggedIn }) => {

    const navigateToLogin = () => <Navigate to="/admin/login" />;
    const navigateDashboard = () => <Navigate to="/admin/" />;

    const routes = [
        { path: "/", element: isLoggedIn ? <Dashboard /> : navigateToLogin() },
        { path: "/dashboard", element: isLoggedIn ? <Dashboard /> : navigateToLogin() },
        { path: "/category", element: isLoggedIn ? <Category /> : navigateToLogin() },
        { path: "/add-category", element: isLoggedIn ? <AddCategory /> : navigateToLogin() },
        { path: "/edit-category", element: isLoggedIn ? <EditCategory /> : navigateToLogin() },
        { path: "/product", element: isLoggedIn ? <Product /> : navigateToLogin() },
        { path: "/add-product", element: isLoggedIn ? <AddProduct /> : navigateToLogin() },
        { path: "/orders", element: isLoggedIn ? <Orders /> : navigateToLogin() },

        // Auth Route
        { path: "/login", element: !isLoggedIn ? <Login role={"admin"} /> : navigateDashboard() },
        // Error Page
        { path: "/*", element: <ErrorPage /> },
    ];

    return (
        <Routes>
            {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
            ))}
        </Routes>
    );
};

export default AdminRoutes;
