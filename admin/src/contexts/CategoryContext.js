import React, { useReducer, createContext } from "react";
// import routes from '../constants/routes.json';
// import ApiService from '../utils/ApiService';
// import history from '../utils/history';
import {
  GET_CTG,
  GET_CTG_FAILED,
  GET_CTG_SUCCESS
} from '../constants/types';

// Define the initial state of our app
const initialState = {
    data: null,
    loggedIn: false,
    loading: false,
    error: null
};

export const CategoryContext = createContext(initialState);

// Define a pure function reducer
const reducer = (state, action) => {
  switch (action.type) {
    case GET_CTG:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_CTG_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case GET_CTG_SUCCESS:
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
const useCtg = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const getCtg = async (data) => {
    try {
        dispatch({
          type: GET_CTG_SUCCESS,
          payload: [{
                'id':1,
                'name':'Development',
                'HOD':'abc'
            },{
                'id':2,
                'name':'Designing',
                'HOD':'abc'
            },
            {
                'id':1,
                'name':'Marketting',
                'HOD':'abc'
            }]
        });
      
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
      <CategoryContext.Provider value={{...state, getCtg, validateToken}}>
          {children}
      </CategoryContext.Provider>
  )
};

// Share your custom hook
export default useCtg;