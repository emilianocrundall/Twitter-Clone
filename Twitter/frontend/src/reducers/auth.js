import {
    AUTH_ERROR,
    REG_SUCCESS,
    REG_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    USER_LOADING,
    USER_LOADED,
    GET_USER,
    LOADING,
    FOLLOWERS,
    FOLLOWING,
    FOLLOW_USER,
    UNFOLLOW_USER,
    UPDATE_USER
} from '../actions/types'

const initialState = {
    user: null,
    token: localStorage.getItem('token'),
    loading: true,
    isAuthenticated: false,
    error: false,
    user_detail: {},
    followers: [],
    following: []
}

export default function(state=initialState, action){
    switch(action.type){
        case USER_LOADING:
        case LOADING:
            return {
                ...state,
                loading: true
            }
        case USER_LOADED:
            return {
                ...state, user: action.payload, isAuthenticated: true, loading: false
            }
        case GET_USER:
            return {
                ...state,
                user_detail: action.payload, loading: false
            }
        case REG_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state, ...action.payload, isAuthenticated: true, loading: false
            }
        case LOGIN_FAIL:
        case REG_FAIL:
            localStorage.removeItem('token')
            return {
                ...state, loading: false, isAuthenticated:false, error: action.payload
            }
        case AUTH_ERROR:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token')
            return {
                ...state, loading: false, isAuthenticated:false, error: false
            }
        case FOLLOWERS:
            return {
                ...state,
                followers: action.payload
            }
        case FOLLOWING:
            return {
                ...state,
                following: action.payload
            }
        case FOLLOW_USER:
            return {
                ...state,
                followers:[
                    ...state.followers,
                    action.payload
                ]
            }
        case UNFOLLOW_USER:
            return {
                ...state,
                followers: state.followers.filter((user) => user.id !== action.payload.id)
            }
        case UPDATE_USER:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}