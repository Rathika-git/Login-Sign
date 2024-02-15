const initialState = {
  token: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'SIGNUP_SUCCESS':
      return { ...state, token: action.payload, error: null };
    case 'LOGIN_ERROR':
    case 'SIGNUP_ERROR':
      return { ...state, token: null, error: action.payload };
    default:
      return state;
  }
};

export default authReducer;