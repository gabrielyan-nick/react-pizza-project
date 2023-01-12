import axios from "axios";

const fetchPizzas = () => (dispatch) => {
  axios
    .get("http://localhost:3001/pizzas")
    // .then((res) => console.log(res.data.pizzas))
    .then((res) => dispatch(setPizzas(res.data)))
    .catch((e) => console.log(e));
};

function setPizzas(items) {
  return {
    type: "SET_PIZZAS",
    payload: items,
  };
}

export { setPizzas, fetchPizzas };
