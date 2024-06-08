import { isPresentInCharacterLikes } from "../../config/logic";
import { GET_USER_REQUEST, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_REQUEST, REGISTER_SUCCESS, ADD_TO_LIKED_CHARACTERS_SUCCESS, LOGOUT } from "./ActionType";

const initialState={

    user:null,
    isLoading:false,
    error:null,
    jwt:null,
    likes:[],
    success:null

}
export const authReducer = (state=initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
            return {...state, isLoading:true, error:null, success:null}
        
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {...state, isLoading:false, jwt:action.payload, success:"Login Successful"}

        case ADD_TO_LIKED_CHARACTERS_SUCCESS:
            return {
                ...state,
                isLoading:false,
                error:null,
                likes:isPresentInCharacterLikes(state.likes, action.payload)
                ? state.likes.filter((item)=>item.id!==action.payload.id)
                :[action.payload,...state.likes]
            }

        case LOGOUT:
            return initialState;

        default:
            return state;
    }
}