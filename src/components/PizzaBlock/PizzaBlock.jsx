import React from "react";
import { useState, useEffect, useCallback, memo } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";
import Button from "../Button/Button";
import "../PizzaBlock/pizzaBlock.scss";

const PizzaBlock = memo(function PizzaBlock({
  id,
  imgUrl,
  name,
  types,
  sizes,
  price,
  onAddPizza,
}) {
  const typesArr = ["тонкое", "традиционное"];
  const sizesArr = [26, 30, 40];
  const [activeSize, setSize] = useState(sizes[0]);
  const [activeType, setType] = useState(types[0]);
  const [totalPrice, setTotalPrice] = useState(price);
  const cardItems = useSelector(({ card }) => card.items);
  const objName = `${id}-${activeType === 0 ? "th" : "cl"}-${activeSize}`;
  const addPizzaCount =
    cardItems[objName] && cardItems[objName].cardItems.length;

  useEffect(() => {
    setTotalPrice(
      activeSize === 26
        ? price
        : activeSize === 30
        ? price * 1.2
        : activeSize === 40
        ? price * 1.5
        : price
    );
  }, [activeSize]);

  const onSelectSize = (item) => {
    setSize(item);
  };

  const onSelectType = (item) => {
    setType(item);
  };

  const onClickAddPizza = useCallback(() => {
    const pizzaObj = {
      id,
      name,
      imgUrl,
      totalPrice,
      size: activeSize,
      type: typesArr[activeType],
    };
    onAddPizza(pizzaObj);
  });

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imgUrl} alt={name} />
      <h4 className="pizza-block__title">{name}</h4>
      <div className="pizza-block__selector">
        <ul>
          {typesArr.map((item, i) => {
            return (
              <li
                onClick={() => onSelectType(i)}
                key={i}
                className={classNames({
                  active: activeType === i,
                  disabled: !types.includes(i),
                })}
              >
                {item}
              </li>
            );
          })}
        </ul>
        <ul>
          {sizesArr.map((el, index) => {
            return (
              <li
                key={index}
                className={`${
                  activeSize === el
                    ? "active"
                    : !sizes.includes(el)
                    ? "disabled"
                    : ""
                }`}
                onClick={() => onSelectSize(el)}
              >
                {el} см.
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">{totalPrice} ₴</div>
        <Button
          className="button--add pizza-block-btn"
          onAction={onClickAddPizza}
          outline
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {addPizzaCount && <i>{addPizzaCount}</i>}
        </Button>
      </div>
    </div>
  );
});

PizzaBlock.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  imgUrl: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(PropTypes.number).isRequired,
  sizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  onAddPizza: PropTypes.func.isRequired,
  addPizzaCount: PropTypes.number,
};

export default PizzaBlock;
