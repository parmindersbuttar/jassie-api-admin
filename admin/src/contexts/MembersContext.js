import React, { useReducer, createContext } from "react";
import routes from '../constants/routes.json';
import ApiService from '../utils/ApiService';
import history from '../utils/history';
import {
  GET_USER,
  GET_USER_FAILED,
  GET_USER_SUCCESS
} from '../constants/types';

// Define the initial state of our app
const initialState = {
    data: null,
    loggedIn: false,
    loading: false,
    error: null
};

export const MembersContext = createContext(initialState);

// Define a pure function reducer
const reducer = (state, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case GET_USER_SUCCESS:
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
const useUsers = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const getUsers = async (data) => {
    try {
       ApiService.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('userToken')}`;
      const resp = await ApiService.get('/private/users');
     
        dispatch({
          type: GET_USER_SUCCESS,
          payload: resp.data.users
        });
        // history.push(routes.MEMBERS)
      
    } catch (err) {
      console.log('get users error :', err);
    }
  };
  const validateToken = () => {
    dispatch( {
      type: 'VALIDATE'
    })
  }
  return (
      <MembersContext.Provider value={{...state, getUsers, validateToken}}>
          {children}
      </MembersContext.Provider>
  )
};

// Share your custom hook
export default useUsers;