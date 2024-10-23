import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingSpinner from "../components/common/LoadingSpinner";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";

const MainRouter = () => {

  const isLoading = useSelector(state => state.common.loading);
  const isAdminLoggedIn = useSelector(state => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector(state => state.user.isLoggedIn);


  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route
          path="/admin/*"
          element={<AdminRoutes isLoggedIn={isAdminLoggedIn} />}
        />
        <Route
          path="/*"
          element={<UserRoutes isLoggedIn={isUserLoggedIn} />}
        />
      </Routes>
    </Suspense>
  );
};

export default MainRouter;