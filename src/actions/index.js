export const addUser = (email, pass, prevList) => {
  const newUser = {
    email,
    pass,
  };
  const updatedList = [...prevList, newUser];
  return {
    type: "ADD_USER",
    payload: updatedList,
  };
};

export const logIn = () => {
  return {
    type: "LOG_IN",
  };
};

export const logOut = () => {
  return {
    type: "LOG_OUT",
  };
};
