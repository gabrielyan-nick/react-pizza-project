import axios from "axios";

const fetchPizzas = (category, sortBy) => (dispatch) => {
  dispatch(setLoaded(false));
  axios
    .get(
      `https://json-server-abjv.onrender.com/pizzas?${
        category !== null ? `category=${category}` : ""
      }&_sort=${sortBy.type}&_order=${sortBy.order}`
    )

    .then((res) => dispatch(setPizzas(res.data)))
    .catch((e) => console.log(e));
};

const setLoaded = (payload) => {
  return {
    type: "SET_LOADED",
    payload,
  };
};

const setPizzas = (items) => {
  return {
    type: "SET_PIZZAS",
    payload: items,
  };
};

export { setPizzas, fetchPizzas, setLoaded };
