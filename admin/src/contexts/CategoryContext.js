import React, { useReducer, createContext } from "react";
// import routes from '../constants/routes.json';
import ApiService from '../utils/ApiService';
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
  const getCategory = async (data) => {
    try {
      ApiService.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('userToken')}`;
      const resp = await ApiService.get('/private/category');
        dispatch({
          type: GET_CTG_SUCCESS,
          payload: resp.data.category
        });
      
    } catch (err) {
      console.log('get category error :', err);
    }
  };

  const addCategory = async (data) => {
    try {
      ApiService.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('userToken')}`;
      const resp = await ApiService.post('/public/category', {...data});
      getCategory()
    } catch (err) {
      console.log('add category error :', err);
    }
  };
  const updateCategory = async (data,id) => {
    try {
      ApiService.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('userToken')}`;
      const resp = await ApiService.put(`/private/category/${id}`, {...data});
      getCategory()
    } catch (err) {
      console.log('add category error :', err);
    }
  };
  const deleteCategory = async(id) => {
    try{
      ApiService.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('userToken')}`;
      const resp = await ApiService.delete(`/private/category/${id}`);
      console.log(resp)
      getCategory()
    }catch(err){
      console.log("delete category error :: ",err)
    }
  }
  const validateToken = () => {
    dispatch( {
      type: 'VALIDATE'
    })
  }
  return (
      <CategoryContext.Provider value={{...state, getCategory, addCategory, updateCategory, deleteCategory, validateToken}}>
          {children}
      </CategoryContext.Provider>
  )
};

// Share your custom hook
export default useCtg;