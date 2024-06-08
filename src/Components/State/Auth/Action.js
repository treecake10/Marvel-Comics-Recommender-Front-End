import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, LOGOUT, REGISTER_FAILURE, GET_USER_REQUEST, GET_USER_FAILURE, ADD_TO_LIKED_CHARACTERS_SUCCESS, ADD_TO_LIKED_CHARACTERS_REQUEST} from "./ActionType"
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

export const addToLikes=({categoryId, jwt})=>async(dispatch)=>{
    dispatch({type:ADD_TO_LIKED_CHARACTERS_REQUEST})
    try {
        const res = await api.post(`/api/users/like`,
            {
                itemId: categoryId,
                itemType: 'character'
                
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