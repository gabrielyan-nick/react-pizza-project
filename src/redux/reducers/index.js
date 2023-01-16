import { combineReducers } from "redux";
import filter from "./filters";
import pizzas from "./pizzas";
import card from "./card";

const rootReducer = combineReducers({
  filter,
  pizzas,
  card,
});

export default rootReducer;
