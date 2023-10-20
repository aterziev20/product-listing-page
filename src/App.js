import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import NewFeatured from "./pages/NewFeatured";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Kids from "./pages/Kids";
import Sale from "./pages/Sale";
import Football from "./pages/Football";
import Basketball from "./pages/Basketball";
import Tennis from "./pages/Tennis";
import Running from "./pages/Running";

import ProductList from "./components/ProductList";

import Favourites from "./pages/Favourites";
import Cart from "./pages/Cart";

import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles.css";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path={`/shop/${`NewFeatured`.toLowerCase()}`}
              element={<NewFeatured />}
            />
            <Route path={`/shop/${`Men`.toLowerCase()}`} element={<Men />} />
            <Route
              path={`/shop/${`Women`.toLowerCase()}`}
              element={<Women />}
            />
            <Route path={`/shop/${`Kids`.toLowerCase()}`} element={<Kids />} />
            <Route path={`/shop/${`Sale`.toLowerCase()}`} element={<Sale />} />
            <Route
              path={`/${`Favourites`.toLowerCase()}`}
              element={<Favourites />}
            />
            <Route path={`/${`Cart`.toLowerCase()}`} element={<Cart />} />
            <Route
              path={`/shop/${`Football`.toLowerCase()}`}
              element={<Football />}
            />
            <Route
              path={`/shop/${`Basketball`.toLowerCase()}`}
              element={<Basketball />}
            />
            <Route
              path={`/shop/${`Tennis`.toLowerCase()}`}
              element={<Tennis />}
            />
            <Route
              path={`/shop/${`Running`.toLowerCase()}`}
              element={<Running />}
            />

            <Route path="/shop/search-results" element={<ProductList />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
