function setSortBy(i) {
  return {
    type: "SET_SORT_BY",
    payload: i,
  };
}

function setCategory(i) {
  return {
    type: "SET_CATEGORY",
    payload: i,
  };
}

export { setSortBy, setCategory };
