import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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

function App() {
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
      console.log(data);
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
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <>
                {<Header />}
                <Home />
                <Services />
                {<Footer />}
              </>
            )}
          />

          <Route
            exact
            path="/product/:id"
            render={() => (
              <>
                {<Header />}
                <ProductDetails />
                <Services />
                {<Footer />}
              </>
            )}
          />

          <Route
            exact
            path="/products"
            render={() => (
              <>
                {<Header />}
                <Products />
                <Services />
                {<Footer />}
              </>
            )}
          />

          <Route
            path="/products/:keyword"
            render={() => (
              <>
                {<Header />}
                <Products />
                <Services />
                {<Footer />}
              </>
            )}
          />

          {/*  User routes */}

          <Route
            exact
            path="/signup"
            render={() => (
              <>
                {<Header />}
                <Signup />
                <Services />
                {<Footer />}
              </>
            )}
          />

          <Route
            exact
            path="/login"
            render={() => (
              <>
                {<Header />}
                <Login />
                <Services />
                {<Footer />}
              </>
            )}
          />

          <Route
            exact
            path="/password/forgot"
            render={() => (
              <>
                {<Header />}
                <ForgetPassword />
                <Services />
                {<Footer />}
              </>
            )}
          />

          <Route
            exact
            path="/password/reset/:token"
            render={() => (
              <>
                {<Header />}
                <ResetPassword />
                <Services />
                {<Footer />}
              </>
            )}
          />

          <Route
            exact
            path="/cart"
            render={() => (
              <>
                {<Header />}
                <Cart />
                <Services />
                {<Footer />}
              </>
            )}
          />

          <Route
            exact
            path="/policy/return"
            render={() => (
              <>
                {<Header />}
                <ReturnPolicyPage />
                <Services />
                {<Footer />}
              </>
            )}
          />

          <Route
            exact
            path="/policy/Terms"
            render={() => (
              <>
                {<Header />}
                <TermsUse />
                <Services />
                {<Footer />}
              </>
            )}
          />

          <Route
            exact
            path="/policy/privacy"
            render={() => (
              <>
                {<Header />}
                <PrivacyPolicy />
                <Services />
                {<Footer />}
              </>
            )}
          />

          <Route
            exact
            path="/terms/conditions"
            render={() => (
              <>
                {<Header />}
                <TermsAndConditions />
                <Services />
                {<Footer />}
              </>
            )}
          />

          <Route
            exact
            path="/contact"
            render={() => (
              <>
                {<Header />}
                <ContactForm />

                {<Footer />}
              </>
            )}
          />

          <Route
            exact
            path="/about_us"
            render={() => (
              <>
                {<Header />}
                <AboutUsPage />

                {<Footer />}
              </>
            )}
          />

          <Route
            exact
            path="/account"
            render={() => (
              <>
                {<Header />}
                <PrivateRoute exact path="/account" component={ProfilePage} />
                <Services />
                {<Footer />}
              </>
            )}
          />

          <Route
            exact
            path="/profile/update"
            render={() => (
              <>
                {<Header />}
                <PrivateRoute
                  exact
                  path="/profile/update"
                  component={UpdateProfile}
                />
                <Services />
                {<Footer />}
              </>
            )}
          />

          <Route
            exact
            path="/password/update"
            render={() => (
              <>
                {<Header />}
                <PrivateRoute
                  exact
                  path="/password/update"
                  component={UpdatePassword}
                />
                <Services />
                {<Footer />}
              </>
            )}
          />

          <Route
            exact
            path="/shipping"
            render={() => (
              <>
                {<Header />}
                <PrivateRoute exact path="/shipping" component={Shipping} />
                <Services />
                {<Footer />}
              </>
            )}
          />

          <Route
            exact
            path="/order/confirm"
            render={() => (
              <>
                {<Header />}
                <PrivateRoute
                  exact
                  path="/order/confirm"
                  component={ConfirmOrder}
                />
                <Services />
                {<Footer />}
              </>
            )}
          />

          <Route
            exact
            path="/success"
            render={() => (
              <>
                {<Header />}
                <PrivateRoute exact path="/success" component={OrderSuccess} />
                <Services />
                {<Footer />}
              </>
            )}
          />

          <Route
            exact
            path="/orders"
            render={() => (
              <>
                {<Header />}
                <PrivateRoute exact path="/orders" component={MyOrder} />
                <Services />
                {<Footer />}
              </>
            )}
          />
        </Switch>

        <Elements stripe={loadStripe(stripeApiKey)}>
          <Route exact path="/process/payment">
            {<Header />}
            <PrivateRoute exact path="/process/payment" component={Payment} />
          </Route>
        </Elements>
      </Router>
    </>
  );
}

export default App;
// issues
// Google auth
// Mobile number add in schema
// mobile number verification & Update with otp verification
// Prduct return
// Payment refund
// Multiple address save
// payment and drop address save
// Choose presaved address when placing order or write new address
// use corrent location for address
