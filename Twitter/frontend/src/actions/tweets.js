import {
    POST_TWEET,
    GET_TWEETS,
    GET_USER_TWEETS,
    GET_TWEET_DETAIL,
    GET_LIKES,
    DELETE_TWEET,
    GET_USER_LIKES,
    GET_USER_REPLIES,
    LIKE_TWEET,
    LIKED_TWEETS,
    UNLIKE_TWEET,
    GET_SAVED,
    SAVE_TWEET,
    REMOVE_SAVED_TWEET,
    POST_REPLY,
    GET_REPLIES,
    RETWEET,
    UNDO_RETWEET,
    GET_RETWEETS
} from './types'
import axios from 'axios'
import { tokenConfig } from './auth'

export const post_tweet = (tweet) => (dispatch, getState) => {
    axios
    .post('/api/new_tweet/', tweet, tokenConfig(getState))
    .then((res) => {
        dispatch({
            type: POST_TWEET,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err.response.data)
    })
}

export const delete_tweet = (id) => (dispatch, getState) => {
    axios
    .delete(`/api/tweets/${id}/delete/`, tokenConfig(getState))
    .then((res) => {
        dispatch({
            type: DELETE_TWEET,
            payload: id
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const get_tweets = () => (dispatch, getState) => {
    axios
    .get('/api/get_tweets/', tokenConfig(getState))
    .then((res) => {
        dispatch({
            type: GET_TWEETS,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err.response.data)
    })
}

export const get_tweet = (id) => (dispatch) => {
    axios
    .get(`/api/get_tweets/${id}/`)
    .then((res) => {
        dispatch({
            type: GET_TWEET_DETAIL,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err.response.data)
    })
}

export const get_user_tweets = (id) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    axios
    .get(`/api/users/tweets/${id}/`, config)
    .then((res) => {
        dispatch({
            type: GET_USER_TWEETS,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err.response.data)
        console.log(err)
    })
}
export const get_user_replies = (id) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    axios
    .get(`/api/users/${id}/replies/`, config)
    .then((res) => {
        dispatch({
            type: GET_USER_REPLIES,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err.response.data)
        console.log(err)
    })
}
export const get_likes = (id) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    axios
    .get(`/api/users/tweets/${id}/likes/`, config)
    .then((res) => {
        dispatch({
            type: GET_LIKES,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err.response.data)
        console.log(err)
    })
}

export const get_user_liked_tweets = () => (dispatch, getState) => {
    axios.get(`/api/user/likes/`, tokenConfig(getState))
    .then((res) => {
        dispatch({
            type: GET_USER_LIKES,
            payload: res.data
        })
    }).catch((e) => {
        console.log(e)
    })
}

export const get_liked_tweets = (id) => (dispatch, getState) => {
    axios
    .get(`/api/users/${id}/likes/`, tokenConfig(getState))
    .then((res) => {
        dispatch({
            type: LIKED_TWEETS,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const like_tweet = (id) => (dispatch, getState) => {
    axios
    .post(`/api/users/tweets/${id}/like/`, null, tokenConfig(getState))
    .then((res) => {
        dispatch({
            type: LIKE_TWEET,
            payload: res.data
        })
    }).catch((e) => {
        console.log(e)
    })
}

export const unlike_tweet = (id) => (dispatch, getState) => {
    axios
    .delete(`/api/users/tweets/${id}/unlike/`, tokenConfig(getState))
    .then((res) => {
        dispatch({
            type: UNLIKE_TWEET,
            payload: id
        })
    }).catch((e) => {
        console.log(e)
    })
}

export const post_reply = (id, reply) => (dispatch, getState) => {
    axios
    .post(`/api/get_tweets/${id}/reply/`, reply, tokenConfig(getState))
    .then((res) => {
        dispatch({
            type: POST_REPLY,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err.response.data)
    })
}

export const get_replies = (id) => (dispatch, getState) => {
    axios
    .get(`/api/get_tweets/${id}/replies/`, tokenConfig(getState))
    .then((res) => {
        dispatch({
            type: GET_REPLIES,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err.response.data)
    })
}

export const get_saved = () => (dispatch, getState) => {
    axios
    .get('/api/user/saved_tweets/', tokenConfig(getState))
    .then((res) => {
        dispatch({
            type: GET_SAVED,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err)
    })
}
 
export const save_tweet = (id) => (dispatch, getState) => {
    axios
    .post(`/api/get_tweets/${id}/save/`, null, tokenConfig(getState))
    .then((res) => {
        dispatch({
            type: SAVE_TWEET,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const remove_tweet = (id) => (dispatch, getState) => {
    axios
    .post(`/api/get_tweets/${id}/remove/`, null, tokenConfig(getState))
    .then((res) => {
        dispatch({
            type: REMOVE_SAVED_TWEET,
            payload: id
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const get_retweets = () => (dispatch, getState) => {
    axios
    .get('/api/user/retweets/', tokenConfig(getState))
    .then((res) => {
        dispatch({
            type: GET_RETWEETS,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const do_retweet = (id) => (dispatch, getState) => {
    axios
    .post(`/api/users/tweets/${id}/retweet/`, null, tokenConfig(getState))
    .then((res) => {
        dispatch({
            type: RETWEET,
            payload: res.data
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const undo_retweet = (id) => (dispatch, getState) => {
    axios
    .post(`/api/users/tweets/${id}/undo_retweet/`, null, tokenConfig(getState))
    .then((res) => {
        dispatch({
            type: UNDO_RETWEET,
            payload: id
        })
    }).catch((err) => {
        console.log(err)
    })
}