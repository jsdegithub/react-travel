const initialState = {
  loading: false,
  error: null,
};

export const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "registerStart":
      return { ...state, loading: true };
    case "registerSuccess":
      return { ...state, loading: false };
    case "registerFailed":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
