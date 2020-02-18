import React, { useReducer, createContext } from "react";
// import routes from '../constants/routes.json';
import ApiService from '../utils/ApiService';
// import history from '../utils/history';
import {
  GET_VIDEO,
  GET_VIDEO_FAILED,
  GET_VIDEO_SUCCESS
} from '../constants/types';

// Define the initial state of our app
const initialState = {
    data: null,
    loggedIn: false,
    loading: false,
    error: null
};

export const VideoContext = createContext(initialState);

// Define a pure function reducer
const reducer = (state, action) => {
  switch (action.type) {
    case GET_VIDEO:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_VIDEO_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case GET_VIDEO_SUCCESS:
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
const useVideo = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const getVideo = async (data) => {
    try {
        ApiService.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('userToken')}`;
        const resp = await ApiService.get('/private/video');
        dispatch({
          type: GET_VIDEO_SUCCESS,
          payload: resp.data.video
        });
      
    } catch (err) {
      console.log('get users error :', err);
    }
  };
  const addVideo = async (data) => {
      console.log(data)
    try {
    //   ApiService.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('userToken')}`;
    //   const resp = await ApiService.post('/private/category', {...data});
    getVideo()
    } catch (err) {
      console.log('add category error :', err);
    }
  };
  const validateToken = () => {
    dispatch( {
      type: 'VALIDATE'
    })
  }
  return (
      <VideoContext.Provider value={{...state, getVideo, addVideo, validateToken}}>
          {children}
      </VideoContext.Provider>
  )
};

// Share your custom hook
export default useVideo;