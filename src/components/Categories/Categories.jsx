import { func } from "prop-types";
import React from "react";
import { useState } from "react";
import "../Categories/categories.scss";

function Categories({ items }) {
 const [activeItem, setActiveItem] = useState(null);

 function onSelectItem(i) {
    setActiveItem(i);
  }

  function onSelectAllItems(i) {
    setActiveItem(null);
  }


  return (
    <div className="categories">
      <ul>
        <li
          className={`${activeItem === null ? "active" : ""}`}
          onClick={onSelectAllItems}
        >
          Все
        </li>
        {items &&
          items.map((item, i) => {
            return (
              <li
                className={`${activeItem === i ? "active" : ""}`}
                key={i}
                onClick={() => onSelectItem(i)}
              >
                {item}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Categories;
