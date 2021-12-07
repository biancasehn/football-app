const errorMessageReducer = (state = false, action) => {
  switch (action.type) {
    case "UPDATE_ERROR_MESSAGE":
      return action.payload;
    default:
      return state;
  }
};

export default errorMessageReducer;
