import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    REG_SUCCESS,
    REG_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    GET_USER,
    LOADING,
    FOLLOWERS,
    FOLLOWING,
    FOLLOW_USER,
    UNFOLLOW_USER,
    UPDATE_USER
} from './types'
import axios from 'axios'

export const tokenConfig = getState => {
    const token = getState().auth.token;
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if(token){
        config.headers['Authorization'] = `Token ${token}`
    }
    return config
}

export const load_user = () => (dispatch, getState) => {
    dispatch({type: USER_LOADING})
    axios
    .get('/api/auth/user', tokenConfig(getState))
    .then((res) => {
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    }).catch((err) => {
        dispatch({
            type: AUTH_ERROR
        })
    })
}

export const register_user = ({username, email, password}) => (dispatch) => {
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({username, email, password})
    axios
    .post('/api/auth/register', body, config)
    .then((res) => {
        dispatch({
            type: REG_SUCCESS,
            payload: res.data
        })
    }).catch((err) => {
        dispatch({
            type: REG_FAIL,
            payload: err.response.data
        })
    })
}

export const login_user = (username, password) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({username, password})
    axios
    .post('/api/auth/login', body, config)
    .then((res) => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
    }).catch((err) => {
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data
        })
    })
}

export const logout = () => (dispatch, getState) => {
    axios
    .post('/api/auth/logout', null, tokenConfig(getState))
    .then((res) => {
        dispatch({
            type: LOGOUT_SUCCESS
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const get_user = (id) => (dispatch) => {
    axios
    .get(`api/auth/users/${id}/`)
    .then((res) => {
        dispatch({
            payload: res.data,
            type: GET_USER
        })
    }).catch((e) => {
        console.log(e.response.data)
    })
}

export const get_following = (id) => (dispatch) => {
    axios
    .get(`/api/auth/following/${id}`)
    .then((res) => {
        dispatch({
            type: FOLLOWING,
            payload: res.data
        })
    }).catch((e) => {
        console.log(e)
    })
}

export const get_followers = (id) => (dispatch) => {
    axios
    .get(`/api/auth/followers/${id}/`)
    .then((res) => {
        dispatch({
            type: FOLLOWERS,
            payload: res.data
        })
    }).catch((e) => {
        console.log(e)
    })
}

export const follow_user = (id) => (dispatch, getState) => {
    const user = getState().auth.user
    axios
    .post(`/api/auth/follow/${id}/`, null, tokenConfig(getState))
    .then((res) => {
        dispatch({
            type: FOLLOW_USER,
            payload: user
        })
    }).catch((e) => {
        console.log(e)
    })
}

export const unfollow_user = (id) => (dispatch, getState) => {
    const user = getState().auth.user
    axios
    .post(`/api/auth/unfollow/${id}/`, null, tokenConfig(getState))
    .then((res) => {
        dispatch({
            type: UNFOLLOW_USER,
            payload: user
        })
    }).catch((e) => {
        console.log(e)
    })
}

export const update_user = (body) => (dispatch, getState) => {
    axios
    .put('/api/auth/user/update/', body, tokenConfig(getState))
    .then((res) => {
        dispatch({
            type: UPDATE_USER,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err)
    })
}