const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};

const getTotalPrice = (arr) => {
  return arr.reduce((res, item) => res + item.totalPrice, 0);
};

const getArr = (item, i = 1) => {
  const arrOfObj = Object.values(item);
  let arr = [];
  arrOfObj.forEach((item) => {
    arr = arr.concat(item.cardItems);
  });
  return arr;
};

const getTotalCount = (item) => getArr(item).length;

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
          ? {
              cardItems: [item],
              cardPrice: getTotalPrice([item]),
            }
          : {
              cardItems: [...state.items[objName].cardItems, item],
              cardPrice: getTotalPrice([
                ...state.items[objName].cardItems,
                item,
              ]),
            },
      };

      const allPizzas = getArr(newItem);

      return {
        ...state,
        items: newItem,
        totalCount: allPizzas.length,
        totalPrice: getTotalPrice(allPizzas),
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
        totalCount: getTotalCount(itemsAfterDel),
        totalPrice: getTotalPrice(getArr(itemsAfterDel)),
      };
    case "PLUS_PIZZA_CARD":
      const newPizzaObj = JSON.parse(
        JSON.stringify(state.items[action.payload].cardItems[0])
      );
      const newPizzaItems = {
        ...state.items,
        [action.payload]: {
          cardItems: [...state.items[action.payload].cardItems, newPizzaObj],
          cardPrice: getTotalPrice([...state.items[action.payload].cardItems, newPizzaObj]),
        },
      };

      return {
        items: newPizzaItems,
        totalPrice: state.totalPrice + newPizzaObj.totalPrice,
        totalCount: state.totalCount + 1,
      };
    case "MINUS_PIZZA_CARD":
      const oldItems = state.items[action.payload].cardItems;

      const newArrItem = oldItems.length > 1 ? oldItems.slice(1) : oldItems;
      const newCardItems = {
        ...state.items,
        [action.payload]: {
          cardItems: newArrItem,
          cardPrice: getTotalPrice(newArrItem),
        },
      };

      return {
        items: newCardItems,
        totalPrice:
          oldItems.length > 1
            ? state.totalPrice - oldItems[0].totalPrice
            : state.totalPrice,
        totalCount:
          oldItems.length > 1 ? state.totalCount - 1 : state.totalCount,
      };
    default:
      return state;
  }
};

export default card;
