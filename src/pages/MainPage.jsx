import axios from "axios";
import { v4 as uuid } from "uuid";
import { useState, useEffect, useRef, useCallback } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Categories, Sort, PizzaBlock } from "../components";
import { fetchPizzas } from "../redux/actions/pizzas";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setSortBy } from "../redux/actions/filters";
import { setLoaded } from "../redux/actions/pizzas";
import Skeleton from "../components/Skeleton/Skeleton";

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
    type: "rating",
    order: "desc",
  },
  {
    name: "цене",
    type: "price",
    order: "asc",
  },
  {
    name: "алфавиту",
    type: "name",
    order: "asc",
  },
];

function MainPage() {
  const dispatch = useDispatch();
  const items = useSelector(({ pizzas }) => pizzas.items);
  const category = useSelector(({ filter }) => filter.category);
  const sortBy = useSelector(({ filter }) => filter.sortBy);
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);

  useEffect(() => {
    dispatch(fetchPizzas(category, sortBy));
  }, [category, sortBy]);

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
                      key={uuid()}
                      classNames="pizza-block"
                      timeout={200}
                      mountOnEnter
                      unmountOnExit
                      exit={false}
                    
                    >
                      <PizzaBlock
                        key={uuid()}
                        imgUrl={item.imageUrl}
                        name={item.name}
                        types={item.types}
                        sizes={item.sizes}
                        price={item.price}
                      />
                    </CSSTransition>
                  );
                })
              : Array(items.length)
                  .fill(0)
                  .map((_, i) => (
                    <CSSTransition
                      key={uuid()}
                      classNames="pizza-block"
                      timeout={200}
                      mountOnEnter
                      unmountOnExit
                      exit={false}
                    >
                      <Skeleton key={uuid()} />
                    </CSSTransition>
                  ))}
          </TransitionGroup>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
