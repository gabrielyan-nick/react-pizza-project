import { combineReducers } from "redux";
import filterReduser from "./filters";
import pizzasReduser from "./pizzas";

const rootReduser = combineReducers({
  filter: filterReduser,
  pizzas: pizzasReduser,
});

export default rootReduser;
