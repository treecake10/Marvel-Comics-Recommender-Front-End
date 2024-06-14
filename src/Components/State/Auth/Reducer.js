import { 
    GET_USER_REQUEST, 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    REGISTER_REQUEST, 
    REGISTER_SUCCESS,
    LOGOUT, 
    ADD_TO_LIKED_CHARACTERS_SUCCESS, 
    ADD_TO_LIKED_SERIES_SUCCESS,
    ADD_TO_LIKED_EVENTS_SUCCESS,
    ADD_TO_LIKED_CREATORS_SUCCESS,
    ADD_TO_LIKED_COMICS_SUCCESS,
    CHECK_ITEM_LIKED_REQUEST, 
    CHECK_ITEM_LIKED_SUCCESS, 
    CHECK_ITEM_LIKED_FAILURE,
    UNLIKE_ITEM_SUCCESS, 
    UNLIKE_ITEM_FAILURE
} from "./ActionType";

import { 
    isPresentInCharacterLikes, 
    isPresentInSeriesLikes,
    isPresentInEventLikes,
    isPresentInCreatorLikes,
    isPresentInComicLikes
} from "../../config/logic";

const initialState={
    user: null,
    isLoading: false,
    isLiked: false,
    error: null,
    jwt: null,
    likes: [],
    success: null
}

const updateLikes = (state, payload, isPresentFunc) => ({
    ...state,
    isLoading: false,
    error: null,
    likes: isPresentFunc(state.likes, payload)
      ? state.likes.filter((item) => item.id !== payload.id)
      : [payload, ...state.likes],
  });
  
  export const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case REGISTER_REQUEST:
      case LOGIN_REQUEST:
      case GET_USER_REQUEST:
        return { ...state, isLoading: true, error: null, success: null };
  
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
        return { ...state, isLoading: false, jwt: action.payload, success: 'Login Successful' };
  
      case ADD_TO_LIKED_CHARACTERS_SUCCESS:
        return updateLikes(state, action.payload, isPresentInCharacterLikes);
  
      case ADD_TO_LIKED_SERIES_SUCCESS:
        return updateLikes(state, action.payload, isPresentInSeriesLikes);
  
      case ADD_TO_LIKED_EVENTS_SUCCESS:
        return updateLikes(state, action.payload, isPresentInEventLikes);
  
      case ADD_TO_LIKED_CREATORS_SUCCESS:
        return updateLikes(state, action.payload, isPresentInCreatorLikes);
  
      case ADD_TO_LIKED_COMICS_SUCCESS:
        return updateLikes(state, action.payload, isPresentInComicLikes);
  
      case CHECK_ITEM_LIKED_REQUEST:
        return { ...state, isLoading: true, error: null };
  
      case CHECK_ITEM_LIKED_SUCCESS:
        return { ...state, isLoading: false, isLiked: action.payload };
  
      case CHECK_ITEM_LIKED_FAILURE:
        return { ...state, isLoading: false, error: action.payload };
  
      case UNLIKE_ITEM_SUCCESS:
        return { ...state, isLiked: false, likes: state.likes.filter(item => item.id !== action.payload) };
  
      case UNLIKE_ITEM_FAILURE:
        return { ...state, error: action.payload };
  
      case LOGOUT:
        return initialState;
  
      default:
        return state;
    }
  };