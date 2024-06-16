import { 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    LOGIN_FAILURE, 
    REGISTER_REQUEST, 
    REGISTER_SUCCESS, 
    REGISTER_FAILURE,
    LOGOUT,  
    GET_USER_REQUEST, 
    GET_USER_FAILURE, 
    ADD_TO_LIKED_CHARACTERS_SUCCESS, 
    ADD_TO_LIKED_CHARACTERS_REQUEST,
    ADD_TO_LIKED_SERIES_SUCCESS,
    ADD_TO_LIKED_SERIES_REQUEST,
    ADD_TO_LIKED_EVENTS_SUCCESS,
    ADD_TO_LIKED_EVENTS_REQUEST,
    ADD_TO_LIKED_CREATORS_SUCCESS,
    ADD_TO_LIKED_CREATORS_REQUEST,
    ADD_TO_LIKED_COMICS_SUCCESS,
    ADD_TO_LIKED_COMICS_REQUEST,
    ADD_TO_FAVORITED_CHARACTERS_REQUEST,
    ADD_TO_FAVORITED_CHARACTERS_SUCCESS,
    ADD_TO_FAVORITED_SERIES_REQUEST,
    ADD_TO_FAVORITED_SERIES_SUCCESS,
    ADD_TO_FAVORITED_EVENTS_REQUEST,
    ADD_TO_FAVORITED_EVENTS_SUCCESS,
    ADD_TO_FAVORITED_CREATORS_REQUEST,
    ADD_TO_FAVORITED_CREATORS_SUCCESS,
    ADD_TO_FAVORITED_COMICS_REQUEST,
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
} from "./ActionType"
import { API_URL, api } from "../../config/api"

const handleApiResponse = async (apiCall, onSuccess, onFailure) => {
    try {
      const { data } = await apiCall;
      onSuccess(data);
    } catch (error) {
      onFailure(error);
    }
  };
  
  export const registerUser = (reqData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    handleApiResponse(
      api.post(`${API_URL}/auth/signup`, reqData.userData),
      (data) => {
        if (data.jwt) localStorage.setItem('jwt', data.jwt);
        reqData.navigate('/');
        dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
      },
      (error) => {
        dispatch({ type: REGISTER_FAILURE, payload: error });
      }
    );
  };
  
  export const loginUser = (reqData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    handleApiResponse(
      api.post(`${API_URL}/auth/signin`, reqData.userData),
      (data) => {
        if (data.jwt) localStorage.setItem('jwt', data.jwt);
        reqData.navigate('/');
        dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
      },
      (error) => {
        dispatch({ type: LOGIN_FAILURE, payload: error });
      }
    );
  };
  
  export const getUser = (jwt) => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    handleApiResponse(
      api.get(`/api/users/profile`, { headers: { Authorization: `Bearer ${jwt}` } }),
      (data) => {
        dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
      },
      (error) => {
        dispatch({ type: GET_USER_FAILURE, payload: error });
      }
    );
  };
  
  export const logout = () => (dispatch) => {
    localStorage.clear();
    dispatch({ type: LOGOUT });
  };
  
  const addItems = (typeRequest, typeSuccess, itemData, endpoint) => async (dispatch) => {
    dispatch({ type: typeRequest });
    handleApiResponse(
      api.post(endpoint, itemData, { headers: { Authorization: `Bearer ${itemData.jwt}` } }),
      (data) => {
        dispatch({ type: typeSuccess, payload: data });
      },
      (error) => {
        console.error('Error adding to likes:', error);
      }
    );
  };
  
  export const addToCharacterLikes = (data) => addItems(ADD_TO_LIKED_CHARACTERS_REQUEST, ADD_TO_LIKED_CHARACTERS_SUCCESS, data, '/api/users/like');
  export const addToSeriesLikes = (data) => addItems(ADD_TO_LIKED_SERIES_REQUEST, ADD_TO_LIKED_SERIES_SUCCESS, data, '/api/users/like');
  export const addToEventLikes = (data) => addItems(ADD_TO_LIKED_EVENTS_REQUEST, ADD_TO_LIKED_EVENTS_SUCCESS, data, '/api/users/like');
  export const addToCreatorLikes = (data) => addItems(ADD_TO_LIKED_CREATORS_REQUEST, ADD_TO_LIKED_CREATORS_SUCCESS, data, '/api/users/like');
  export const addToComicLikes = (data) => addItems(ADD_TO_LIKED_COMICS_REQUEST, ADD_TO_LIKED_COMICS_SUCCESS, data, '/api/users/like');

  export const addToCharacterFavorites = (data) => addItems(ADD_TO_FAVORITED_CHARACTERS_REQUEST, ADD_TO_FAVORITED_CHARACTERS_SUCCESS, data, '/api/users/favorite');
  export const addToSeriesFavorites = (data) => addItems(ADD_TO_FAVORITED_SERIES_REQUEST, ADD_TO_FAVORITED_SERIES_SUCCESS, data, '/api/users/favorite');
  export const addToEventFavorites = (data) => addItems(ADD_TO_FAVORITED_EVENTS_REQUEST, ADD_TO_FAVORITED_EVENTS_SUCCESS, data, '/api/users/favorite');
  export const addToCreatorFavorites = (data) => addItems(ADD_TO_FAVORITED_CREATORS_REQUEST, ADD_TO_FAVORITED_CREATORS_SUCCESS, data, '/api/users/favorite');
  export const addToComicFavorites = (data) => addItems(ADD_TO_FAVORITED_COMICS_REQUEST, ADD_TO_FAVORITED_COMICS_SUCCESS, data, '/api/users/favorite');
  
  export const checkIfItemLiked = (itemId, itemType, jwt) => async (dispatch) => {
    dispatch({ type: CHECK_ITEM_LIKED_REQUEST });
    handleApiResponse(
      api.get(`/api/users/itemIsLiked`, {
        params: { itemId, itemType },
        headers: { Authorization: `Bearer ${jwt}` }
      }),
      (data) => {
        dispatch({ type: CHECK_ITEM_LIKED_SUCCESS, payload: data });
      },
      (error) => {
        dispatch({ type: CHECK_ITEM_LIKED_FAILURE, payload: error });
      }
    );
  };

  export const checkIfItemFavorited = (itemId, itemType, jwt) => async (dispatch) => {
    dispatch({ type: CHECK_ITEM_FAVORITED_REQUEST });
    handleApiResponse(
      api.get(`/api/users/itemIsFavorited`, {
        params: { itemId, itemType },
        headers: { Authorization: `Bearer ${jwt}` }
      }),
      (data) => {
        dispatch({ type: CHECK_ITEM_FAVORITED_SUCCESS, payload: data });
      },
      (error) => {
        dispatch({ type: CHECK_ITEM_FAVORITED_FAILURE, payload: error });
      }
    );
  };
  
  export const unlikeItem = (data) => async (dispatch) => {
    try {
      const res = await api.delete(`/api/users/unlike`, {
        data: { itemId: data.itemId, itemType: data.itemType },
        headers: { Authorization: `Bearer ${data.jwt}` },
      });
      dispatch({ type: UNLIKE_ITEM_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: UNLIKE_ITEM_FAILURE, payload: error });
    }
  };
  
  export const unfavoriteItem = (data) => async (dispatch) => {
    try {
      const res = await api.delete(`/api/users/unfavorite`, {
        data: { itemId: data.itemId, itemType: data.itemType },
        headers: { Authorization: `Bearer ${data.jwt}` },
      });
      dispatch({ type: UNFAVORITE_ITEM_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: UNFAVORITE_ITEM_FAILURE, payload: error });
    }
  };
  
  