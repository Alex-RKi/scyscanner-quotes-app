const favoritsReducer = (state = 0, action) => {
  switch (action.type) {
    case "INC_FAV":
      return state + 1;
    case "DEC_FAV":
      return state - 1;
    case "RESET_FAV":
      return 0;
    default:
      return state;
  }
};

export default favoritsReducer;
