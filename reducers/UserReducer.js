const initialState = {
  auth: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        auth: action.payload.user,
      };
    case "CLEAR_USER":
      return { ...state, auth: null };

    default:
      return state;
  }
};

export default userReducer;
