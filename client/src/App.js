import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";

import "./App.css";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./components/Cart/Payment";

import CricketBallLoader from "./components/layouts/loader/Loader";

import Header from "./components/layouts/Header/Header";
import Home from "./components/Home/Home";
import Services from "./components/Terms&Condtions/Service";
import Footer from "./components/layouts/Footer/Footer";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";

import PrivateRoute from "./components/Route/PrivateRoute";

import ContactForm from "./components/Terms&Condtions/Contact";
import AboutUsPage from "./components/Terms&Condtions/Aboutus";
import ReturnPolicyPage from "./components/Terms&Condtions/Return";
import TermsUse from "./components/Terms&Condtions/TermsAndUse";
import TermsAndConditions from "./components/Terms&Condtions/TermsCondtion";
import PrivacyPolicy from "./components/Terms&Condtions/Privacy";

import Signup from "./components/User/SignUp";
import Login from "./components/User/Login";
import ResetPassword from "./components/User/ResetPassword";
import ForgetPassword from "./components/User/ForgetPassword";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ProfilePage from "./components/User/Profile";

import { load_UserProfile } from "./actions/userAction";

import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrder from "./components/Order/MyOrder";

const LazyDashboard = React.lazy(() => import("./components/Admin/Dashboard"));
const LazyProductList = React.lazy(() =>
  import("./components/Admin/ProductList")
);
const LazyOrderList = React.lazy(() => import("./components/Admin/OrderList"));
const LazyUserList = React.lazy(() => import("./components/Admin/UserList"));
const LazyUpdateProduct = React.lazy(() =>
  import("./components/Admin/UpdateProduct")
);
const LazyProcessOrder = React.lazy(() =>
  import("./components/Admin/ProcessOrder")
);
const LazyUpdateUser = React.lazy(() =>
  import("./components/Admin/UpdateUser")
);
const LazyNewProduct = React.lazy(() =>
  import("./components/Admin/NewProduct")
);
const LazyProductReviews = React.lazy(() =>
  import("./components/Admin/ProductReviews")
);

function App() {
  console.log(process.env.SERVER_URL);

  const [stripeApiKey, setStripeApiKey] = useState("");

  const dispatch = useDispatch();

  // get STRIPE_API_KEY for payment from backend for connection to stripe payment gateway
  async function getStripeApiKey() {
    try {
      const { data } = await axios.get("/api/v1/stripeapikey");
      if (
        data.stripeApiKey !== undefined &&
        data.stripeApiKey !== null &&
        data.stripeApiKey !== ""
      ) {
        sessionStorage.setItem(
          "stripeApiKey",
          JSON.stringify(data.stripeApiKey)
        );
      }

      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      // Handle error if the API call fails
      console.error("Error fetching Stripe API key:", error);
    }
  }

  useEffect(() => {
    const stripeApiKey = JSON.parse(sessionStorage.getItem("stripeApiKey"));
    if (stripeApiKey && stripeApiKey !== "") {
      setStripeApiKey(stripeApiKey);
    } else {
      getStripeApiKey();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(load_UserProfile());

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Router>
        <Routes>
      <Route
        path="/"
        element={
          <>
            <Header />
            <Outlet />
            <Services />
            <Footer />
          </>
        }
      >
        <Route index element={<Home />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:keyword" element={<Products />} />

        {/* User routes */}
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="password/forgot" element={<ForgetPassword />} />
        <Route path="password/reset/:token" element={<ResetPassword />} />
        <Route path="cart" element={<Cart />} />
        <Route path="policy/return" element={<ReturnPolicyPage />} />
        <Route path="policy/terms" element={<TermsUse />} />
        <Route path="policy/privacy" element={<PrivacyPolicy />} />
        <Route path="terms/conditions" element={<TermsAndConditions />} />
        <Route path="contact" element={<ContactForm />} />
        <Route path="about_us" element={<AboutUsPage />} />

        {/* Private routes */}
        <Route path="account" element={<PrivateRoute element={<ProfilePage />} />} />
        <Route path="profile/update" element={<PrivateRoute element={<UpdateProfile />} />} />
        <Route path="password/update" element={<PrivateRoute element={<UpdatePassword />} />} />
        <Route path="shipping" element={<PrivateRoute element={<Shipping />} />} />
        <Route path="order/confirm" element={<PrivateRoute element={<ConfirmOrder />} />} />
        <Route path="success" element={<PrivateRoute element={<OrderSuccess />} />} />
        <Route path="orders" element={<PrivateRoute element={<MyOrder />} />} />

        {/* Admin routes */}
        <Route path="admin/dashboard" element={<PrivateRoute isAdmin element={<LazyDashboard />} />} />
        <Route path="admin/products" element={<PrivateRoute isAdmin element={<LazyProductList />} />} />
        <Route path="admin/product/:id" element={<PrivateRoute isAdmin element={<LazyUpdateProduct />} />} />
        <Route path="admin/reviews" element={<PrivateRoute isAdmin element={<LazyProductReviews />} />} />
        <Route path="admin/orders" element={<PrivateRoute isAdmin element={<LazyOrderList />} />} />
        <Route path="admin/order/:id" element={<PrivateRoute isAdmin element={<LazyProcessOrder />} />} />
        <Route path="admin/new/product" element={<PrivateRoute isAdmin element={<LazyNewProduct />} />} />
        <Route path="admin/users" element={<PrivateRoute isAdmin element={<LazyUserList />} />} />
        <Route path="admin/user/:id" element={<PrivateRoute isAdmin element={<LazyUpdateUser />} />} />

        {/* Elements for Stripe payment */}
        <Route path="process/payment" element={<Header />}>
          <Route index element={<Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements>} />
        </Route>
      </Route>

        {/* <Suspense fallback={<CricketBallLoader />}></Suspense> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
