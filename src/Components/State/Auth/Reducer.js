import { GET_USER_REQUEST, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_REQUEST, REGISTER_SUCCESS, LOGOUT } from "./ActionType";

const initialState={

    user:null,
    isLoading:false,
    error:null,
    jwt:null,
    favorites:[],
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

        case LOGOUT:
            return initialState;

        default:
            return state;
    }
}