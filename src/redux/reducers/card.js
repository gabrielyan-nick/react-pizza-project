const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};

const card = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PIZZA_CARD":
      const item = action.payload;
      const objName = `${action.payload.id}-${
        action.payload.type === "тонкое" ? "th" : "cl"
      }-${action.payload.size}`;

      const newItem = {
        ...state.items,
        [objName]: !state.items[objName]
          ? [item]
          : [...state.items[objName], item],
      };

      const allPizzas = Object.values(newItem).flat();
      const price = allPizzas.reduce((res, item) => res + item.totalPrice, 0);

      return {
        ...state,
        items: newItem,
        totalCount: allPizzas.length,
        totalPrice: price,
      };
    case "CLEAR_CARD":
      return {
        items: {},
        totalCount: 0,
        totalPrice: 0,
      };
    case "DEL_PIZZA_CARD":
      const itemsAfterDel = { ...state.items };
      delete itemsAfterDel[action.payload];

      return {
        items: itemsAfterDel,
        totalCount: Object.values(itemsAfterDel).flat().length,
        totalPrice: Object.values(itemsAfterDel)
          .flat()
          .reduce((res, item) => res + item.totalPrice, 0),
      };
    case "PLUS_PIZZA_CARD":
      // const newObjItem = state.items[action.payload];
      // const itemsAfterPlus = 
      // return {
      //   // items: itemsAfterPlus,
      // };
    default:
      return state;
  }
};

export default card;
