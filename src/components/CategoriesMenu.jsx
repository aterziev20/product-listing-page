import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles/CategoriesMenu.css";


const CategoriesMenu = ({ categories, currentCategory, onCategoryChange }) => {
  const location = useLocation();
  const isSalesPage = location.pathname.includes("/sale");

  const handleCategoryClick = (category) => {
    const isCurrentCategoryPage = currentCategory === category;

    // If the clicked category is the same as the current category, reset the category filter
    if (isCurrentCategoryPage) {
      onCategoryChange(null); // Deselect the category

      // Redirect to appropriate base URL
      const redirectTo = isSalesPage ? "/sale" : "/home";
      window.location.href = redirectTo;
      return;
    }
    onCategoryChange(category); // Select the clicked category
  };

  let basePath = "";
  if (isSalesPage === true) {
    basePath = "/sale";
  } else {
    basePath = "/home";
  }

  return (
    <nav className="category-menu">
      {categories.map((category) => (
        <div key={category} className="">
          <Link
            to={`${basePath}/${category.toLowerCase()}`}
            className={`category-item ${currentCategory === category ? "active" : ""}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </Link>
        </div>
      ))}
    </nav>
  );
};

export default CategoriesMenu;

export const handleSectionClick = (
  category,
  currentCategory,
  onCategoryChange
) => {
  const isCurrentCategoryPage = currentCategory === category;

  // If the clicked category is the same as the current category, reset the category filter
  if (isCurrentCategoryPage) {
    onCategoryChange(null); // Deselect the category
    return;
  }

  onCategoryChange(category); // Select the clicked category
};
