const usersReducer = (
  state = [{ id: 1, email: "test@test.com", pass: "qwerty78" }],
  action
) => {
  switch (action.type) {
    case "ADD_USER":
      return action.payload;
    default:
      return state;
  }
};

export default usersReducer;
