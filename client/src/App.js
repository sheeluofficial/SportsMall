import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

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
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { load_UserProfile } from "./actions/userAction";
import ProfilePage from "./components/User/Profile";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";


function App() {
  const dispatch = useDispatch();
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


        </Switch>
      </Router>
    </>
  );
}

export default App;
