const SET_IS_AUTHENTICATED = "SET_IS_AUTHENTICATED";

const setIsAuthenticated = (isAuthenticated, user) => {
  let action = {
    type: SET_IS_AUTHENTICATED,
    isAuthenticated: isAuthenticated,
    user: user
  };
  return action;
};

export {SET_IS_AUTHENTICATED, setIsAuthenticated}
