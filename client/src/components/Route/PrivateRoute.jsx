import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Route } from "react-router-dom";
import { load_UserProfile } from "../../actions/userAction";
import CricketBallLoader from "../layouts/loader/Loader";
function PrivateRoute({ isAdmin, component: Component,path, ...props }) {
  const { loading, isAuthenticated, user } = useSelector(
    (state) => state.userData
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(load_UserProfile());
  }, [dispatch]);


  if (loading) {
    return <CricketBallLoader />; 
  }

  // If the user data failed to load or the user is not authenticated, Navigate to the login page
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />;
  }

  // If isAdmin is true and the user is not an admin, Navigate to the login page
  if (isAdmin && user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  // If the user is authenticated and isAdmin check is passed, render the specified component
  return  <Component {...props} />;
}

export default PrivateRoute;
