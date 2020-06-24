export const setUser = (user) => {
  return {
    type: "SET_USER",
    payload: {
      user: user,
    },
  };
};

export const clearUser = (user) => {
  return {
    type: "CLEAR_USER",
  };
};
