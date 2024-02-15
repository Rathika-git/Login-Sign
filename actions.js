import axios from 'axios';

export const loginUser = (userData, navigate) => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:5000/login', userData);
    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.token });
    navigate('/home');
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', payload: error.response.data.error });
  }
};

export const signUpUser = (userData, navigate) => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:5000/signup', userData);
    dispatch({ type: 'SIGNUP_SUCCESS' });
    navigate('/');
  } catch (error) {
    dispatch({ type: 'SIGNUP_ERROR', payload: error.response.data.error });
  }
};