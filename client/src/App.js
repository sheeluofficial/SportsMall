import { useEffect } from "react";
import "./App.css";
import Header from "./components/layout/Header/Header.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home.js";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    // store.dispatch(loadUser());

    // getStripeApiKey();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
