import axios from "axios";
import { useState, useEffect, useRef, useCallback } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Categories, Sort, PizzaBlock } from "../components";
import { setPizzas } from "../redux/actions/pizzas";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setSortBy } from "../redux/actions/filters";

function MainPage() {
  const categoriesArr = [
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  const filtersArr = [
    {
      name: "популярности",
      type: "popular",
    },
    {
      name: "цене",
      type: "price",
    },
    {
      name: "алфавиту",
      type: "alfabet",
    },
  ];

  const dispatch = useDispatch();
  const items = useSelector(({ pizzas }) => pizzas.items);
  // const { category, sortBy } = useSelector(({ filters }) => filters);

  useEffect(() => {
    axios
      .get("http://localhost:3000/db.json")
      .then((res) => dispatch(setPizzas(res.data.pizzas)))
      .catch((e) => console.log(e));
  }, []);

  const onSelectCat = useCallback((i) => {
    dispatch(setCategory(i));
  }, []);

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories
            items={categoriesArr}
            onSelectCat={onSelectCat}
            // activeCat={category}
          />
          <Sort items={filtersArr} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          <TransitionGroup component={null}>
            {items &&
              items.map((item, i) => {
                return (
                  <CSSTransition
                    key={i}
                    classNames="pizza-block"
                    timeout={200}
                    mountOnEnter
                    unmountOnExit
                    exit={false}
                  >
                    <PizzaBlock
                      key={i}
                      imgUrl={item.imageUrl}
                      name={item.name}
                      types={item.types}
                      sizes={item.sizes}
                      price={item.price}
                    />
                  </CSSTransition>
                );
              })}
          </TransitionGroup>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
