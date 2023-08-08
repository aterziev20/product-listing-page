// components/ProductSorting.js
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import "./styles/ProductSorting.css";

const ProductSorting = ({ sortOption, handleSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setIsOpen(false);
    handleSortChange(option); // Just send the option, not the entire event object
  };

  const getSortLabel = () => {
    switch (sortOption) {
      case "default":
        return "Sort By";
      case "az":
        return "Sort By: Alphabetical A-Z";
      case "za":
        return "Sort By: Alphabetical Z-A";
      case "priceAsc":
        return "Sort By: Price: Low-High";
      case "priceDesc":
        return "Sort By: Price: High-Low";
      default:
        return "Sort By";
    }
  };

  return (
    <div className="sorting">
      <div className="dropdown">
        <div className="selected-option" onClick={toggleDropdown}>
          {getSortLabel()}{" "}
          <span
            className={`chevron-icon ${isOpen ? "rotate180" : ""}`}
          >
            <FaChevronDown />
          </span>
        </div>
        {isOpen && (
          <ul className="options">
            <li onClick={() => handleOptionSelect("default")}>Default</li>
            <li onClick={() => handleOptionSelect("az")}>Alphabetical A-Z</li>
            <li onClick={() => handleOptionSelect("za")}>Alphabetical Z-A</li>
            <li onClick={() => handleOptionSelect("priceAsc")}>
              Low-High
            </li>
            <li onClick={() => handleOptionSelect("priceDesc")}>
              High-Low
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProductSorting;
