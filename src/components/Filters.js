// Filters.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronDown } from "react-icons/fa";
import { setFilters, selectFilters } from "../redux/filters/filtersSlice";
import "./styles/Filters.css";

const Filters = ({ products, onFilterChange }) => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);

  const handlePriceChange = (priceRange) => {
    const updatedRanges = filters.selectedPriceRanges.includes(priceRange)
      ? filters.selectedPriceRanges.filter((range) => range !== priceRange)
      : [...filters.selectedPriceRanges, priceRange];

    applyFilters(filters.selectedColors, updatedRanges);
  };

  const handleColorChange = (color) => {
    const updatedColors = filters.selectedColors.includes(color)
      ? filters.selectedColors.filter((col) => col !== color)
      : [...filters.selectedColors, color];

    applyFilters(updatedColors, filters.selectedPriceRanges);
  };

  const applyFilters = (colors, priceRanges) => {
    let filteredProducts = [...products];

    if (priceRanges.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        priceRanges.some((range) => {
          const priceToCheck =
            product.discountedPrice !== undefined
              ? product.discountedPrice
              : product.price;
          switch (range) {
            case "under99":
              return priceToCheck <= 99.99;
            case "99to199":
              return priceToCheck >= 99.99 && priceToCheck <= 199.99;
            case "199to299":
              return priceToCheck >= 199.99 && priceToCheck <= 299.99;
            case "over299":
              return priceToCheck >= 299.99;
            default:
              return false;
          }
        })
      );
    }

    if (colors.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        colors.some((col) => {
          switch (col) {
            case "Black":
              return product.color === "Black";
            case "Blue":
              return product.color === "Blue";
            case "Brown":
              return product.color === "Brown";
            case "Green":
              return product.color === "Green";
            case "Gray":
              return product.color === "Gray";
            case "Multi-Color":
              return product.color === "Multi-Color";
            case "Orange":
              return product.color === "Orange";
            case "Pink":
              return product.color === "Pink";
            case "Purple":
              return product.color === "Purple";
            case "Red":
              return product.color === "Red";
            case "White":
              return product.color === "White";
            case "Yellow":
              return product.color === "Yellow";
            default:
              return false;
          }
        })
      );
    }

    dispatch(
      setFilters({ selectedPriceRanges: priceRanges, selectedColors: colors })
    );
    onFilterChange(filteredProducts);
  };

  const availableColors = [
    ...new Set(products.map((product) => product.color)),
  ];

  return (
    <div>
      <div className="product-filtering">
        <h3>Filter Products</h3>
        <div className="filter-wrapper">
          <div className="price-filter">
            <div className={`dropdown ${isPriceDropdownOpen ? "open" : ""}`}>
              <p
                className="dropdown-toggle"
                onClick={() => setIsPriceDropdownOpen(!isPriceDropdownOpen)}
              >
                By Price
                <span
                  className={`chevron-icon ${
                    isPriceDropdownOpen ? "rotate180" : ""
                  }`}
                >
                  <FaChevronDown />
                </span>
              </p>
              {isPriceDropdownOpen && (
                <div className="dropdown-content">
                  <div className="prices-container">
                    <label className="prices">
                      <input
                        type="checkbox"
                        value="under99"
                        checked={filters.selectedPriceRanges.includes(
                          "under99"
                        )}
                        onChange={() => handlePriceChange("under99")}
                      />
                      <span className="checkmark"></span>
                      Under 99,99 BGN
                    </label>
                    <br />
                    <label className="prices">
                      <input
                        type="checkbox"
                        value="99to199"
                        checked={filters.selectedPriceRanges.includes(
                          "99to199"
                        )}
                        onChange={() => handlePriceChange("99to199")}
                      />
                      <span className="checkmark"></span>
                      99,99 BGN - 199,99 BGN
                    </label>
                    <br />
                    <label className="prices">
                      <input
                        type="checkbox"
                        value="199to299"
                        checked={filters.selectedPriceRanges.includes(
                          "199to299"
                        )}
                        onChange={() => handlePriceChange("199to299")}
                      />
                      <span className="checkmark"></span>
                      199,99 BGN - 299,99 BGN
                    </label>
                    <br />
                    <label className="prices">
                      <input
                        type="checkbox"
                        value="over299"
                        checked={filters.selectedPriceRanges.includes(
                          "over299"
                        )}
                        onChange={() => handlePriceChange("over299")}
                      />
                      <span className="checkmark"></span>
                      Over 299,99 BGN
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="color-filtering">
            <div className="color-options">
              <div className={`dropdown ${isColorDropdownOpen ? "open" : ""}`}>
                <p
                  className="dropdown-toggle"
                  onClick={() => setIsColorDropdownOpen(!isColorDropdownOpen)}
                >
                  By Colour
                  <span
                    className={`chevron-icon ${
                      isColorDropdownOpen ? "rotate180" : ""
                    }`}
                  >
                    <FaChevronDown />
                  </span>
                </p>
                {isColorDropdownOpen && (
                  <div className="dropdown-content">
                    <div className="color-options-grid">
                      {availableColors.map((color) => (
                        <div
                          key={color}
                          className={`color-option ${
                            filters.selectedColors.includes(color)
                              ? "selected"
                              : ""
                          }`}
                          onClick={() => handleColorChange(color)}
                        >
                          <div
                            className={`color-circle ${color.toLowerCase()} ${
                              filters.selectedColors.includes(color)
                                ? "checked"
                                : ""
                            }`}
                          >
                            {filters.selectedColors.includes(color) && (
                              <span
                                className={`${
                                  color === "White"
                                    ? "black-checkmark"
                                    : "white-checkmark"
                                }`}
                              ></span>
                            )}
                          </div>
                          <p className="color">{color}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
