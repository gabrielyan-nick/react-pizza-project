export const addPizzaCard = (pizzaObj) => ({
  type: "ADD_PIZZA_CARD",
  payload: pizzaObj,
});

export const clearCard = () => ({
  type: "CLEAR_CARD",
});

export const delPizzaCard = (item) => ({
  type: "DEL_PIZZA_CARD",
  payload: item,
});

export const plusPizzaCard = (item) => ({
  type: "PLUS_PIZZA_CARD",
  payload: item,
});

export const minusPizzaCard = (item) => ({
  type: "MINUS_PIZZA_CARD",
  payload: item,
});

