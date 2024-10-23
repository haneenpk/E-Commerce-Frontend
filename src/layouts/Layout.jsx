import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MainRouter from "../routes/MainRouter";
import AdminHeader from "../components/admin/AdminHeader";
import Header from "../components/users/Header";
import Footer from "../components/users/Footer";
import { setLoggedIn, setAdminData } from "../redux/slices/adminSlice";
import { setLoggedIn as setUserLoggedIn, setUserData } from "../redux/slices/userSlice";
import { checkToDisplayHeaderFooter } from "../utils/routeUtil";
import { userRoutesToCheck, adminRoutesToCheck } from "../config/routesConfig";

const Layout = () => {

  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector(state => state.user.isLoggedIn);
  const isAdminLoggedIn = useSelector(state => state.admin.isLoggedIn);

  const location = useLocation();
  let userRole;
  if (location.pathname.startsWith("/admin")) {
    userRole = "admin"
  } else {
    userRole = "user"
  }
  // const userRole = location.pathname.startsWith("/admin") ? "admin" : "user";
  const shouldDisplayHeaderFooter = checkToDisplayHeaderFooter(
    userRole === "admin" ? adminRoutesToCheck : userRoutesToCheck,
    location
  );

  useEffect(async () => {
    if (localStorage.getItem(`${userRole}JwtToken`)) {
      if (userRole === "admin") {
        dispatch(setLoggedIn(true));
        console.log("changedA:", isAdminLoggedIn);
        dispatch(setAdminData(localStorage.getItem("adminData")));
      } else {
        dispatch(setUserLoggedIn(true));
        console.log("changedU:", isUserLoggedIn);
        dispatch(setUserData(localStorage.getItem("userData")));
      }
    }
  }, [isUserLoggedIn, isAdminLoggedIn])

  return (
    <div className="flex flex-col min-h-screen">
      {shouldDisplayHeaderFooter && (
        userRole === "admin" ? <AdminHeader /> : <Header />
      )}
      <main className="flex-1" style={{ paddingTop: shouldDisplayHeaderFooter ? 0 : 0 }}>
        <MainRouter />
      </main>
      {shouldDisplayHeaderFooter && (userRole === "user") && <Footer />}
    </div>
  );
};

export default Layout;