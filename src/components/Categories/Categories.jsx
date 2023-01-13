import React from "react";
import PropTypes from "prop-types";
import { useState, memo } from "react";
import "../Categories/categories.scss";

const Categories = memo(function Categories({ items, onSelectCat, activeCat }) {
  return (
    <div className="categories">
      <ul>
        <li
          className={`${activeCat === null ? "active" : ""}`}
          onClick={() => onSelectCat(null)}
        >
          Все
        </li>
        {items &&
          items.map((item, i) => {
            return (
              <li
                className={`${activeCat === i ? "active" : ""}`}
                key={i}
                onClick={() => onSelectCat(i)}
              >
                {item}
              </li>
            );
          })}
      </ul>
    </div>
  );
});

Categories.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectCat: PropTypes.func.isRequired,
  activeCat: PropTypes.number,
};

Categories.defaultProps = { activeCat: null, items: [] };

export default Categories;
