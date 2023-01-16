const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};

const card = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PIZZA_CARD":
      const newItem = {
        ...state.items,
        [action.payload.id]: !state.items[action.payload.id]
          ? [action.payload]
          : [...state.items[action.payload.id], action.payload],
      };

      const allPizzas = [].concat.apply([], Object.values(newItem));

      const price = allPizzas.reduce((res, item) => {
        return res + item.price;
      }, 0);

      return {
        ...state,
        items: newItem,
        totalCount: [].concat.apply([], Object.values(newItem)).length,
        totalPrice: price,
      };
    default:
      return state;
  }
};

export default card;
