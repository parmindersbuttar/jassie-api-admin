import React, { useReducer, createContext } from "react";
import routes from '../constants/routes.json';
import ApiService from '../utils/ApiService';
import history from '../utils/history';
import {
  LOGIN_USER,
  LOGIN_FAILED,
  LOGIN_SUCCESS
} from '../constants/types';
// Define the initial state of our app
const initialState = {
    data: null,
    loggedIn: false,
    loading: false,
    error: null
};

export const LoginContext = createContext(initialState);

// Define a pure function reducer
const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loading: true,
        error: null
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        data: action.payload
      }     
    default:
      return {
          ...state
      }
  }
};

// Define your custom hook that contains your state, dispatcher and actions
const useLogin = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const login = async (data) => {
    dispatch({
      type: LOGIN_USER
    });
    try {
      const resp = await ApiService.post('/public/login', { ...data });
      if(resp.status >= 400 && resp.status < 500 && resp.data) {
        dispatch({
          type: LOGIN_FAILED,
          payload: resp.data.error[0]
        });
      } else {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: resp.data
        });
        localStorage.setItem('userToken', resp.data.token);
        localStorage.setItem('userInfo', JSON.stringify(resp.data.user));
        history.push(routes.DASHBOARD)
      }
    } catch (err) {
      console.log('login :', err);
    }
  };
  const validateToken = () => {
    dispatch( {
      type: 'VALIDATE'
    })
  }
  return (
      <LoginContext.Provider value={{...state, login, validateToken}}>
          {children}
      </LoginContext.Provider>
  )
};

// Share your custom hook
export default useLogin;