import { 
    GET_USER_REQUEST, 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    REGISTER_REQUEST, 
    REGISTER_SUCCESS,
    LOGOUT, 
    ADD_TO_BOOKMARKED_SERIES_SUCCESS,
    ADD_TO_LIKED_CHARACTERS_SUCCESS, 
    ADD_TO_LIKED_EVENTS_SUCCESS,
    ADD_TO_LIKED_CREATORS_SUCCESS,
    ADD_TO_LIKED_COMICS_SUCCESS,
    ADD_TO_FAVORITED_CHARACTERS_SUCCESS, 
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
    UNFAVORITE_ITEM_FAILURE,
    CHECK_ITEM_BOOKMARKED_REQUEST,
    CHECK_ITEM_BOOKMARKED_SUCCESS,
    CHECK_ITEM_BOOKMARKED_FAILURE,
    UNBOOKMARK_ITEM_SUCCESS,
    UNBOOKMARK_ITEM_FAILURE,
    GET_BOOKMARKED_ITEMS_REQUEST,
    GET_BOOKMARKED_ITEMS_SUCCESS,
    GET_BOOKMARKED_ITEMS_FAILURE
} from "./ActionType";

import { 
    isPresentInSeriesBookmarks,
    isPresentInCharacterLikes, 
    isPresentInEventLikes,
    isPresentInCreatorLikes,
    isPresentInComicLikes,
    isPresentInCharacterFavorites,
    isPresentInEventFavorites,
    isPresentInCreatorFavorites,
    isPresentInComicFavorites
} from "../../config/logic";

const initialState={
    user: null,
    isLoading: false,
    isLiked: false,
    isFavorited: false,
    isBookmarked: false,
    error: null,
    jwt: null,
    likes: [],
    favorites: [],
    bookmarks: [],
    bookmarkedItems: [],
    success: null
}

const updateLikesFavesMarks = (state, payload, isPresentFunc) => ({
    ...state,
    isLoading: false,
    error: null,
    likesFavesMarks: isPresentFunc(state.likesFavesMarks, payload)
      ? state.likesFavesMarks.filter((item) => item.id !== payload.id)
      : [payload, ...state.likesFavesMarks],
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

      case ADD_TO_BOOKMARKED_SERIES_SUCCESS:
        return updateLikesFavesMarks(state, action.payload, isPresentInSeriesBookmarks);
  
      case ADD_TO_LIKED_CHARACTERS_SUCCESS:
        return updateLikesFavesMarks(state, action.payload, isPresentInCharacterLikes);
  
      case ADD_TO_LIKED_EVENTS_SUCCESS:
        return updateLikesFavesMarks(state, action.payload, isPresentInEventLikes);
  
      case ADD_TO_LIKED_CREATORS_SUCCESS:
        return updateLikesFavesMarks(state, action.payload, isPresentInCreatorLikes);
  
      case ADD_TO_LIKED_COMICS_SUCCESS:
        return updateLikesFavesMarks(state, action.payload, isPresentInComicLikes);
  
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
        return updateLikesFavesMarks(state, action.payload, isPresentInCharacterFavorites);
      
      case ADD_TO_FAVORITED_EVENTS_SUCCESS:
        return updateLikesFavesMarks(state, action.payload, isPresentInEventFavorites);
      
      case ADD_TO_FAVORITED_CREATORS_SUCCESS:
        return updateLikesFavesMarks(state, action.payload, isPresentInCreatorFavorites);
      
      case ADD_TO_FAVORITED_COMICS_SUCCESS:
        return updateLikesFavesMarks(state, action.payload, isPresentInComicFavorites);
      
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

      case ADD_TO_BOOKMARKED_SERIES_SUCCESS:
        return updateLikesFavesMarks(state, action.payload, isPresentInSeriesBookmarks);
      
      case CHECK_ITEM_BOOKMARKED_REQUEST:
        return { ...state, isLoading: true, error: null };
      
      case CHECK_ITEM_BOOKMARKED_SUCCESS:
        return { ...state, isLoading: false, isBookmarked: action.payload };
      
      case CHECK_ITEM_BOOKMARKED_FAILURE:
        return { ...state, isLoading: false, error: action.payload };
      
      case UNBOOKMARK_ITEM_SUCCESS:
        return { ...state, isBookmarked: false, bookmarks: state.bookmarks.filter(item => item.id !== action.payload) };
      
      case UNBOOKMARK_ITEM_FAILURE:
        return { ...state, error: action.payload };

      case GET_BOOKMARKED_ITEMS_REQUEST:
        return { ...state, isLoading: true, error: null };

      case GET_BOOKMARKED_ITEMS_SUCCESS:
        return { ...state, isLoading: false, bookmarkedItems: action.payload };

      case GET_BOOKMARKED_ITEMS_FAILURE:
        return { ...state, isLoading: false, error: action.payload };

      case LOGOUT:
        return initialState;
  
      default:
        return state;
    }
  };