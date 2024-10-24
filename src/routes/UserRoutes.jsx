import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/users/Home";
import ShowProduct from "../pages/users/ProductDetail";

const ShoppingCart = lazy(() => import("../pages/users/ShoppingCart"));
const CheckOutPage = lazy(() => import("../pages/users/CheckOutPage"));
const AddAddress = lazy(() => import("../pages/users/AddAddress"));
const OrderHistory = lazy(() => import("../pages/users/OrderHistory"));

import Login from "../pages/users/auth/Login";
import SignUp from "../pages/users/auth/SignUp";
import OTP from "../pages/users/auth/VerifyOTP";
import ErrorPage from "../pages/ErrorPage";


const UserRoutes = ({ isLoggedIn }) => {

    const navigateToLogin = () => <Navigate to="/login" />;
    const navigateToHome = () => <Navigate to="/" />;

    const protectedRoutes = [
        { path: "/cart", element: isLoggedIn ? <ShoppingCart /> : navigateToLogin() },
        { path: "/checkout", element: isLoggedIn ? <CheckOutPage /> : navigateToLogin() },
        { path: "/add-address", element: isLoggedIn ? <AddAddress /> : navigateToLogin() },
        { path: "/order", element: isLoggedIn ? <OrderHistory /> : navigateToLogin() },
    ];

    const routes = [
        { path: "/", element: <Home /> },
        { path: "/home", element: <Home /> },
        { path: "/product-details", element: <ShowProduct /> },
    ];

    const authRoutes = [
        { path: "/login", element: !isLoggedIn ? <Login role={"user"} /> : navigateToHome() },
        { path: "/sign-up", element: !isLoggedIn ? <SignUp /> : navigateToHome() },
        { path: "/verify-otp", element: !isLoggedIn ? <OTP /> : navigateToHome() },
    ];

    return (
        <Routes>
            {routes.map(({ path, element }) => <Route key={path} path={path} element={element} />)}
            {protectedRoutes.map(({ path, element }) => <Route key={path} path={path} element={element} />)}
            {authRoutes.map(({ path, element }) => <Route key={path} path={path} element={element} />)}
            {/* Error Page */}
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
};

export default UserRoutes;
