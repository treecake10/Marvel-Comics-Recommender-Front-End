import { 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    LOGIN_FAILURE, 
    REGISTER_REQUEST, 
    REGISTER_SUCCESS, 
    LOGOUT, 
    REGISTER_FAILURE, 
    GET_USER_REQUEST, 
    GET_USER_FAILURE, 
    ADD_TO_LIKED_CHARACTERS_SUCCESS, 
    ADD_TO_LIKED_CHARACTERS_REQUEST,
    CHECK_ITEM_LIKED_REQUEST, 
    CHECK_ITEM_LIKED_SUCCESS, 
    CHECK_ITEM_LIKED_FAILURE,
    UNLIKE_ITEM_SUCCESS, 
    UNLIKE_ITEM_FAILURE
} from "./ActionType"
import { API_URL, api } from "../../config/api"

export const registerUser=(reqData)=>async(dispatch)=>{
    dispatch({type:REGISTER_REQUEST})
    try {
        const {data} = await api.post(`${API_URL}/auth/signup`, reqData.userData)
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);
        }
        reqData.navigate("/")
        dispatch({type:REGISTER_SUCCESS, payload:data.jwt})
        console.log("register success", data)
    } catch (error) {
        dispatch({type:REGISTER_FAILURE, payload:error})
        console.log("error", error)
    }

}

export const loginUser=(reqData)=>async(dispatch)=>{
    dispatch({type:LOGIN_REQUEST})
    try {
        const {data} = await api.post(`${API_URL}/auth/signin`, reqData.userData)
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);
        }
        reqData.navigate("/")
        dispatch({type:LOGIN_SUCCESS, payload:data.jwt})
        console.log("login success", data)
    } catch (error) {
        dispatch({type:LOGIN_FAILURE, payload:error})
        console.log("error", error)
    }

}

export const getUser=(jwt)=>async(dispatch)=>{
    dispatch({type:GET_USER_REQUEST})
    try {
        const {data} = await api.get(`/api/users/profile`, {
            headers:{
                Authorization:`Bearer ${jwt}`
            }
        })
        
        dispatch({type:LOGIN_SUCCESS, payload:data.jwt})
        console.log("user profile", data)
    } catch (error) {
        dispatch({type:GET_USER_FAILURE, payload:error})
        console.log("error", error)
    }

}

export const logout=()=>async(dispatch)=>{
    dispatch({type:LOGOUT})
    try {
        localStorage.clear();
        dispatch({type:LOGOUT})
        console.log("logout success")
    } catch (error) {
        console.log("error", error)
    }

}

export const addToLikes=({itemId, itemType, itemName, jwt})=>async(dispatch)=>{
    dispatch({type:ADD_TO_LIKED_CHARACTERS_REQUEST})
    try {
        const res = await api.post(`/api/users/like`,
            {
                itemId: itemId,
                itemType: itemType,
                itemName: itemName
            },{
            headers:{
                Authorization:`Bearer ${jwt}`
            }
        })
        dispatch({type:ADD_TO_LIKED_CHARACTERS_SUCCESS, payload:res.data})
        console.log("liked data: ", res.data)
    } catch (error) {
        
        console.log("error", error)
    }
}

export const checkIfItemLiked = (itemId, jwt) => async (dispatch) => {
    dispatch({ type: CHECK_ITEM_LIKED_REQUEST });

    try {
        const response = await api.get(`/api/users/itemIsLiked`, {
            params: { itemId, itemType: 'character' },
            headers: { Authorization: `Bearer ${jwt}` }
        });

        dispatch({ type: CHECK_ITEM_LIKED_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: CHECK_ITEM_LIKED_FAILURE, payload: error });
        console.error('Error checking liked status:', error);
    }
};

export const unlikeItem = ({itemId, jwt}) => async (dispatch) => {
    try {
        const res = await api.delete(`/api/users/unlike`, {
            data: { itemId, itemType: 'character' },
            headers: { Authorization: `Bearer ${jwt}` },
        });
            
        dispatch({ type: UNLIKE_ITEM_SUCCESS, payload: res.data });
        console.log('Unliked item:', res.data);
    } catch (error) {
        dispatch({ type: UNLIKE_ITEM_FAILURE, payload: error });
        console.error('Error unliking item:', error);
    }
};