import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  IoSearchOutline,
  IoHeartOutline,
  IoBagOutline,
  IoCloseOutline,
  IoChevronForwardOutline,
  IoMenuOutline,
} from "react-icons/io5";
import CategoriesMenu, { handleSectionClick } from "./CategoriesMenu";
import MobileCatMenu from "./MobileCatMenu";
import "./styles/Header.css";
import "./styles/MobileHeader.css";

const Header = ({ categories, currentCategory, onCategoryChange }) => {
  const handleSearchClick = () => {
    // Implement the search icon click functionality here
    console.log("Search icon clicked!");
  };

  const handleWishlistClick = () => {
    // Implement the wishlist icon click functionality here
    console.log("Wishlist icon clicked!");
  };

  const handleCartClick = () => {
    // Implement the cart icon click functionality here
    console.log("Cart icon clicked!");
  };

  /* MOBILE HEADER */

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [isFeaturedDropdownOpen, setFeaturedDropdownOpen] = useState(false);

  const toggleFeaturedDropdown = () => {
    setFeaturedDropdownOpen(!isFeaturedDropdownOpen);
  };

  const [isSaleDropdownOpen, setSaleDropdownOpen] = useState(false);

  const toggleSaleDropdown = () => {
    setSaleDropdownOpen(!isSaleDropdownOpen);
  };

  const handleCategoryClick = () => {
    setIsMenuOpen(false); // Close the mobile menu
  };

  return (
    <header className="header">
      <nav className="nav-menu">
        <Link to="/home" className="main-link">
          <img src="/logo.png" alt="" className="logo"></img>
        </Link>

        <Link
          className="main-link new"
          to="/home"
          onClick={() =>
            handleSectionClick(null, currentCategory, onCategoryChange)
          }
        >
          New & Featured
        </Link>
        <Link
          className="main-link"
          to="/sale"
          onClick={() =>
            handleSectionClick(null, currentCategory, onCategoryChange)
          }
        >
          Sale
        </Link>
        <div className="nav-icon-container">
          <div className="search-input">
            <input type="text" placeholder="Search..." />
            <button className="search-icon" onClick={handleSearchClick}>
              <IoSearchOutline />
            </button>
          </div>

          <button className="nav-icon" onClick={handleWishlistClick}>
            <IoHeartOutline />
          </button>
          <button className="nav-icon" onClick={handleCartClick}>
            <IoBagOutline />
          </button>
        </div>
      </nav>
      <div className="categories-menu-container">
        <div className="categories-menu">
          <CategoriesMenu
            categories={categories}
            currentCategory={currentCategory}
            onCategoryChange={onCategoryChange}
          />
        </div>
      </div>

      <div className="mobile-nav">
        <Link to="/home" className="main-link">
          <img src="/logo-black.png" alt="" className="mobile-logo"></img>
        </Link>
        <div className="mobile-nav-icon-container">
          <button className="search-icon" onClick={handleSearchClick}>
            <IoSearchOutline />
          </button>
          <button className="nav-icon" onClick={handleWishlistClick}>
            <IoHeartOutline />
          </button>
          <button className="nav-icon" onClick={handleCartClick}>
            <IoBagOutline />
          </button>
        </div>
        <div className={`hamburger-menu ${isMenuOpen ? "open" : ""}`}>
          <button className="hamburger-icon" onClick={toggleMenu}>
            <IoMenuOutline />
          </button>

          <div className={`mobile-dropdown ${isMenuOpen ? "open" : ""}`}>
            <button className="close-icon" onClick={toggleMenu}>
              <IoCloseOutline />
            </button>
            <div className="dropdowns">
              <button className="mobile-link" onClick={toggleFeaturedDropdown}>
                <span>New & Featured</span>
                <span className="chevron-mobile el-1">
                  <IoChevronForwardOutline />
                </span>
              </button>
              {isFeaturedDropdownOpen && (
                <MobileCatMenu
                  categories={categories}
                  currentCategory={currentCategory}
                  onCategoryChange={onCategoryChange}
                  mobileMenu={true}
                  onCategoryClick={handleCategoryClick}
                  onClick={toggleFeaturedDropdown}
                />
              )}
              <button className="mobile-link" onClick={toggleSaleDropdown}>
                <span>Sale</span>
                <span className="chevron-mobile el-2">
                  <IoChevronForwardOutline />
                </span>
              </button>
              {isSaleDropdownOpen && (
                <MobileCatMenu
                  categories={categories}
                  currentCategory={currentCategory}
                  onCategoryChange={onCategoryChange}
                  mobileMenu={true}
                  onCategoryClick={handleCategoryClick}
                  onClick={toggleFeaturedDropdown}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
