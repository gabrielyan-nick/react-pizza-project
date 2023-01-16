function setSortBy({ type, order }) {
  return {
    type: "SET_SORT_BY",
    payload: { type, order },
  };
}

function setCategory(i) {
  return {
    type: "SET_CATEGORY",
    payload: i,
  };
}

export { setSortBy, setCategory };
