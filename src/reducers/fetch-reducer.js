const fetchReducer = (state = false, action) => {
  switch (action.type) {
    case "DATA_LODADED":
      return action.payload;
    default:
      return state;
  }
};

export default fetchReducer;
