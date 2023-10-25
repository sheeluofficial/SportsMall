
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

import Header from "./components/layouts/Header/Header";

import Home from "./components/Home/Home";
import Services from "./components/Terms&Condtions/Service";
import Footer from "./components/layouts/Footer/Footer";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";



import ContactForm from "./components/Terms&Condtions/Contact";
import AboutUsPage from "./components/Terms&Condtions/Aboutus";
import ReturnPolicyPage from "./components/Terms&Condtions/Return";
import TermsUse from "./components/Terms&Condtions/TermsAndUse";
import TermsAndConditions from "./components/Terms&Condtions/TermsCondtion";
import PrivacyPolicy from "./components/Terms&Condtions/Privacy";

function App() {
 

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

     
        </Switch>

     
        
      </Router>
    </>
  );
}

export default App;
