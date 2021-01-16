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

export const incFav = () => {
  return {
    type: "INC_FAV",
  };
};
export const decFav = () => {
  return {
    type: "DEC_FAV",
  };
};
export const resetFavs = () => {
  return {
    type: "RESET_FAV",
  };
};
