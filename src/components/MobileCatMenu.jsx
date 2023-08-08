import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IoChevronForwardOutline } from "react-icons/io5";
import "./styles/CategoriesMenu.css";

const MobileCatMenu = ({
  categories,
  currentCategory,
  onCategoryChange,
  onCategoryClick,
}) => {
  const location = useLocation();
  const isSalesPage = location.pathname.includes("/sale");

  const handleCategoryClick = (category) => {
    const isCurrentCategoryPage = currentCategory === category;

    if (isCurrentCategoryPage) {
      onCategoryChange(null);

      const redirectTo = isSalesPage ? "/sale" : "/home";
      window.location.href = redirectTo;
      return;
    }
    onCategoryChange(category);
    onCategoryClick();
  };

  let basePath = "";
  if (isSalesPage === true) {
    basePath = "/sale";
  } else {
    basePath = "/home";
  }

  return (
    <nav className="mobile-category-menu">
      {categories.map((category) => (
        <div key={category} className="">
          <Link
            to={`${basePath}/${category.toLowerCase()}`}
            className={`mobile-category-item ${
              currentCategory === category ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            <span>{category}</span>
            <span className="chevron-mobile-cat">
              <IoChevronForwardOutline />
            </span>
          </Link>
        </div>
      ))}
    </nav>
  );
};

export default MobileCatMenu;
