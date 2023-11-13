import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSortOption,
  sortAZ,
  sortZA,
  sortLowHigh,
  sortHighLow,
  selectSorting,
} from "../redux/sorting/sortingSlice";


import { FaChevronDown } from "react-icons/fa";
import "./styles/Sorting.css";


const Sorting = () => {
  const dispatch = useDispatch();
  const { sortOption } = useSelector(selectSorting);

  const handleOptionSelect = (selectedSortOption) => {
    dispatch(setSortOption(selectedSortOption));

    // Dispatch additional sorting actions here based on selectedSortOption
    switch (selectedSortOption) {
      case "priceAsc":
        dispatch(sortLowHigh());
        break;
      case "priceDesc":
        dispatch(sortHighLow());
        break;
      case "az":
        dispatch(sortAZ());
        break;
      case "za":
        dispatch(sortZA());
        break;
      default:
        break;
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const getLabelForSortOption = (option) => {
    switch (option) {
      case "priceAsc":
        return "Price: Low-High";
      case "priceDesc":
        return "Price: High-Low";
      case "az":
        return "Alphabetical A-Z";
      case "za":
        return "Alphabetical Z-A";
      default:
        return "Low-High";
    }
  };

  

  const [selectedLabel, setSelectedLabel] = useState(
    getLabelForSortOption(sortOption)
  );

  useEffect(() => {
    // Update the selected label based on the sortOption from Redux
    setSelectedLabel(getLabelForSortOption(sortOption));
  }, [sortOption]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sorting">
      <div className="dropdown">
        <div className="selected-option" onClick={toggleDropdown}>
          <span className="sortTitle">Sort By: <span className="sortLable">{selectedLabel}</span></span>
          <span className={`chevron-icon ${isOpen ? "rotate180" : ""}`}>
            <FaChevronDown />
          </span>
        </div>
        {isOpen && (
          <ul className="options">
            <li onClick={() => handleOptionSelect("priceAsc")}>Low-High</li>
            <li onClick={() => handleOptionSelect("priceDesc")}>High-Low</li>
            <li onClick={() => handleOptionSelect("az")}>Alphabetical A-Z</li>
            <li onClick={() => handleOptionSelect("za")}>Alphabetical Z-A</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sorting;
