// const fetchPizzas = (dispatch) => {
//   axios
//     .get("http://localhost:3000/db.json")
//     // .then((res) => console.log(res.data.pizzas))
//     .then((res) => dispatch(setPizzas(res.data.pizzas)))
//     .catch((e) => console.log(e));
// };

function setPizzas(items) {
  return {
    type: "SET_PIZZAS",
    payload: items,
  };
}


export { setPizzas };
