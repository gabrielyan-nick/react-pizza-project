import { func } from "prop-types";
import React from "react";
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

export default Categories;
