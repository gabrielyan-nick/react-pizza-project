import axios from "axios";
import { useState, useEffect, useRef, useCallback } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Categories, Sort, PizzaBlock } from "../components";
import { fetchPizzas } from "../redux/actions/pizzas";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setSortBy } from "../redux/actions/filters";
import Skeleton from "../components/Skeleton";

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

function MainPage() {
  const dispatch = useDispatch();
  const items = useSelector(({ pizzas }) => pizzas.items);
  const category = useSelector(({ filter }) => filter.category);
  const sortBy = useSelector(({ filter }) => filter.sortBy);
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);

  useEffect(() => {
    dispatch(fetchPizzas());
  }, []);

  const onSelectCat = useCallback((i) => {
    dispatch(setCategory(i));
  }, []);

  const onSelectSort = useCallback((type) => {
    dispatch(setSortBy(type));
  }, []);

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories
            items={categoriesArr}
            onSelectCat={onSelectCat}
            activeCat={category}
          />
          <Sort
            items={filtersArr}
            onSelectSort={onSelectSort}
            activeSortType={sortBy}
          />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          <TransitionGroup component={null}>
            {isLoaded
              ? items.map((item, i) => {
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
                })
              : Array(10)
                  .fill(0)
                  .map((_, i) => <Skeleton key={i} />)}
          </TransitionGroup>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
