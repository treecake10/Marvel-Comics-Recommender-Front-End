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
    ADD_TO_FAVORITED_CHARACTERS_SUCCESS, 
    ADD_TO_FAVORITED_SERIES_SUCCESS,
    ADD_TO_FAVORITED_EVENTS_SUCCESS,
    ADD_TO_FAVORITED_CREATORS_SUCCESS,
    ADD_TO_FAVORITED_COMICS_SUCCESS,
    CHECK_ITEM_LIKED_REQUEST, 
    CHECK_ITEM_LIKED_SUCCESS, 
    CHECK_ITEM_LIKED_FAILURE,
    UNLIKE_ITEM_SUCCESS, 
    UNLIKE_ITEM_FAILURE,
    CHECK_ITEM_FAVORITED_REQUEST, 
    CHECK_ITEM_FAVORITED_SUCCESS, 
    CHECK_ITEM_FAVORITED_FAILURE,
    UNFAVORITE_ITEM_SUCCESS, 
    UNFAVORITE_ITEM_FAILURE
} from "./ActionType";

import { 
    isPresentInCharacterLikes, 
    isPresentInSeriesLikes,
    isPresentInEventLikes,
    isPresentInCreatorLikes,
    isPresentInComicLikes,
    isPresentInCharacterFavorites,
    isPresentInSeriesFavorites,
    isPresentInEventFavorites,
    isPresentInCreatorFavorites,
    isPresentInComicFavorites
} from "../../config/logic";

const initialState={
    user: null,
    isLoading: false,
    isLiked: false,
    isFavorited: false,
    error: null,
    jwt: null,
    likes: [],
    favorites: [],
    success: null
}

const updateLikesOrFaves = (state, payload, isPresentFunc) => ({
    ...state,
    isLoading: false,
    error: null,
    likesOrFaves: isPresentFunc(state.likesOrFaves, payload)
      ? state.likesOrFaves.filter((item) => item.id !== payload.id)
      : [payload, ...state.likesOrFaves],
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
        return updateLikesOrFaves(state, action.payload, isPresentInCharacterLikes);
  
      case ADD_TO_LIKED_SERIES_SUCCESS:
        return updateLikesOrFaves(state, action.payload, isPresentInSeriesLikes);
  
      case ADD_TO_LIKED_EVENTS_SUCCESS:
        return updateLikesOrFaves(state, action.payload, isPresentInEventLikes);
  
      case ADD_TO_LIKED_CREATORS_SUCCESS:
        return updateLikesOrFaves(state, action.payload, isPresentInCreatorLikes);
  
      case ADD_TO_LIKED_COMICS_SUCCESS:
        return updateLikesOrFaves(state, action.payload, isPresentInComicLikes);
  
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

      case ADD_TO_FAVORITED_CHARACTERS_SUCCESS:
        return updateLikesOrFaves(state, action.payload, isPresentInCharacterFavorites);
      
      case ADD_TO_FAVORITED_SERIES_SUCCESS:
        return updateLikesOrFaves(state, action.payload, isPresentInSeriesFavorites);
      
      case ADD_TO_FAVORITED_EVENTS_SUCCESS:
        return updateLikesOrFaves(state, action.payload, isPresentInEventFavorites);
      
      case ADD_TO_FAVORITED_CREATORS_SUCCESS:
        return updateLikesOrFaves(state, action.payload, isPresentInCreatorFavorites);
      
      case ADD_TO_FAVORITED_COMICS_SUCCESS:
        return updateLikesOrFaves(state, action.payload, isPresentInComicFavorites);
      
      case CHECK_ITEM_FAVORITED_REQUEST:
        return { ...state, isLoading: true, error: null };
      
      case CHECK_ITEM_FAVORITED_SUCCESS:
        return { ...state, isLoading: false, isFavorited: action.payload };
      
      case CHECK_ITEM_FAVORITED_FAILURE:
        return { ...state, isLoading: false, error: action.payload };
      
      case UNFAVORITE_ITEM_SUCCESS:
        return { ...state, isFavorited: false, favorites: state.favorites.filter(item => item.id !== action.payload) };
      
      case UNFAVORITE_ITEM_FAILURE:
        return { ...state, error: action.payload };
      
      case LOGOUT:
        return initialState;
  
      default:
        return state;
    }
  };