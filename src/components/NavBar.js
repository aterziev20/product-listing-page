// NavBar.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoSearchOutline, IoHeartOutline, IoBagOutline } from "react-icons/io5";
import { ReactComponent as Logo } from "../assets/icons/logo.svg";
import "./styles/NavBar.css";

function NavBar() {
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [visible, setVisible] = useState(true);

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

  return (
    <div>
      <div className="acc-link-container">
        <Link to="/help" className="acc-link">
          Help
        </Link>
        <Link to="/men" className="acc-link">
          Join us
        </Link>
        <Link to="/men" className="acc-link">
          Sign in
        </Link>
      </div>
      <nav className={navClassName}>
        <div className="nav-wrapper">
          <div className="nav-container">
            <div className="nav-logo-container">
              <Link to="/" className="main-link">
                <Logo className="logo" />
              </Link>
            </div>
            <div className="nav-link-container">
              <Link to="/NewFeatured" className="nav-link">
                New & Featured
              </Link>
              <Link to="/men" className="nav-link">
                Men
              </Link>
              <Link to="/women" className="nav-link">
                Women
              </Link>
              <Link to="/kids" className="nav-link">
                Kids
              </Link>
              <Link to="/sale" className="nav-link">
                Sale
              </Link>
            </div>
            <div className="nav-icon-container">
              <div className="search-input">
                <input type="text" placeholder="Search" />
                <button className="search-icon">
                  <IoSearchOutline />
                </button>
              </div>
              <Link to="/Favourites" className="nav-icon fav">
                <IoHeartOutline />
              </Link>
              <Link to="/Cart" className="nav-icon">
                <IoBagOutline />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
