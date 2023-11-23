import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoSearchOutline, IoHeartOutline, IoBagOutline } from "react-icons/io5";
import { ReactComponent as Logo } from "../assets/icons/logo-black.svg";
import "./styles/NavBar.css";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm, setSearchResults } from "../redux/search/searchSlice";

import productsData from "../data/productsData";

function NavBar() {
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [visible, setVisible] = useState(true);
  const [searchTermInput, setSearchTermInput] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrolledDown = prevScrollPos < currentScrollPos;

      setPrevScrollPos(currentScrollPos);
      setVisible(!isScrolledDown || currentScrollPos < 70);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  // Classnames
  const visibilityClass = visible ? "visible" : "hidden";
  const fixedClass = prevScrollPos > 30 ? "fixed" : "not-fixed";

  // Combined classname
  const navClassName = `nav-wrapper ${visibilityClass} ${fixedClass}`;

  // Search
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTermInput.trim() !== "") {
      // Extract unique values for color, description, group, and sport from productsData
      const category = [
        ...new Set(productsData.map((product) => product.category)),
      ];
      const colors = [...new Set(productsData.map((product) => product.color))];
      const descriptions = [
        ...new Set(productsData.map((product) => product.description)),
      ];
      const groups = [...new Set(productsData.map((product) => product.group))];
      const sports = [...new Set(productsData.map((product) => product.sport))];

      // Combine all unique values
      const allValues = [
        ...category,
        ...colors,
        ...descriptions,
        ...groups,
        ...sports,
      ];

      // Find values that start with the search term (case-insensitive)
      const matchingValues = allValues.filter((value) =>
        value.toLowerCase().startsWith(searchTermInput.toLowerCase())
      );

      // Dispatch actions to update Redux state
      dispatch(setSearchResults(matchingValues));
      dispatch(setSearchTerm(searchTermInput));

      // Redirect to a page displaying all matching values
      const encodedValues = matchingValues.map(encodeURIComponent).join(",");
      const path = `/shop/search-results?values=${encodedValues}&search=${encodeURIComponent(
        searchTermInput
      )}`;
      navigate(path);
      window.scrollTo(0, 0);
    } else {
      // Handle the case when the search term is empty
      console.log("Search term is empty");
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const cartItems = useSelector((state) => state.cart);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div>
      <nav className={navClassName}>
        <div className="nav-wrapper">
          <div className="nav-container">
            <div className="nav-logo-container">
              <Link to="/" className="main-link">
                <Logo className="logo" />
              </Link>
            </div>
            <div className="nav-link-container">
              <Link
                to={`/shop/${`NewFeatured`.toLowerCase()}`}
                className="nav-link"
              >
                New & Featured
              </Link>
              <Link to={`/shop/${`Men`.toLowerCase()}`} className="nav-link">
                Men
              </Link>
              <Link to={`/shop/${`Women`.toLowerCase()}`} className="nav-link">
                Women
              </Link>
              <Link to={`/shop/${`Kids`.toLowerCase()}`} className="nav-link">
                Kids
              </Link>
              <Link to={`/shop/${`Sale`.toLowerCase()}`} className="nav-link">
                Sale
              </Link>
            </div>
            <div className="nav-icon-container">
              <div className="search-input">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTermInput}
                  onChange={(e) => setSearchTermInput(e.target.value)}
                  onKeyDown={handleEnter}
                />
                <button
                  className="search-icon"
                  onClick={handleSearch}
                  disabled={!searchTermInput.trim()}
                >
                  <IoSearchOutline />
                </button>
              </div>
              <Link to={`/${`Favourites`.toLowerCase()}`} className="nav-icon">
                <IoHeartOutline />
              </Link>
              <Link to={`/${`Cart`.toLowerCase()}`} className="nav-icon">
                <IoBagOutline />
                {totalItems > 0 && <span className="cart-counter">{totalItems}</span>}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
