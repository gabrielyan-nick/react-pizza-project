import { useState, useEffect, useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PropTypes from "prop-types";
import { Categories, Sort, PizzaBlock } from "../components";

function MainPage(props) {
  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories
            items={["Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"]}
          />
          <Sort
            items={[
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
            ]}
          />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          <TransitionGroup component={null}>
            {props.data &&
              props.data.map((item, i) => {
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

MainPage.propTypes = {
  data: PropTypes.array.isRequired,
};

export default MainPage;
