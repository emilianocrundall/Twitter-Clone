import {
    GET_TWEETS,
    POST_TWEET,
    DELETE_TWEET,
    GET_TWEET_DETAIL,
    GET_LIKES,
    GET_USER_TWEETS,
    GET_USER_LIKES,
    GET_SAVED,
    SAVE_TWEET,
    REMOVE_SAVED_TWEET,
    LIKE_TWEET,
    UNLIKE_TWEET,
    LIKED_TWEETS,
    POST_REPLY,
    GET_REPLIES,
    GET_USER_REPLIES,
    GET_RETWEETS,
    RETWEET,
    UNDO_RETWEET
} from '../actions/types'

const initialState = {
    tweets: [],
    tweet: {},
    likes: [],
    user_tweets: [],
    user_likes: [],
    replies: [],
    saved: [],
    liked_tweets: [],
    user_replies: [],
    retweets: []
}

export default function(state=initialState, action){
    switch(action.type){
        case GET_TWEETS:
            return{
                ...state,
                tweets: action.payload
            }
        case GET_TWEET_DETAIL:
            return {
                ...state,
                tweet: action.payload
            }
        case GET_LIKES:
            return {
                ...state,
                likes: action.payload
            }
        case GET_SAVED:
            return {
                ...state,
                saved: action.payload
            }
        case SAVE_TWEET:
            return {
                ...state,
                saved: [
                    ...state.saved,
                    action.payload
                ]
            }
        case REMOVE_SAVED_TWEET:
            return {
                ...state,
                saved: [
                    ...state.saved.filter((tweet) => tweet.id !== action.payload)
                ]
            }
        case GET_REPLIES:
            return {
                ...state,
                replies: action.payload
            }
        case LIKED_TWEETS:
            return {
                ...state,
                liked_tweets: action.payload
            }
        case GET_USER_TWEETS:
            return {
                ...state,
                user_tweets: action.payload
            }
        case GET_USER_REPLIES:
            return {
                ...state,
                user_replies: action.payload
            }
        case GET_USER_LIKES:
            return {
                ...state,
                user_likes: action.payload
            }
        case LIKE_TWEET:
            return {
                ...state,
                user_likes: [
                    ...state.user_likes,
                    action.payload
                ],
                likes: [
                    ...state.likes,
                    action.payload
                ]
            }
        case UNLIKE_TWEET:
            return {
                ...state,
                user_likes: state.user_likes.filter((like) => like.tweet !== action.payload),
                likes: state.likes.filter((like) => like.tweet !== action.payload),
                liked_tweets: state.liked_tweets.filter((like) => like.tweet.id !== action.payload)
            }
        case POST_TWEET:
            return{
                ...state,
                user_tweets:[
                    ...state.user_tweets,
                    action.payload
                ]
            }
        case DELETE_TWEET:
            return{
                ...state,
                user_tweets: state.user_tweets.filter((tweet) => tweet.id !== action.payload)
            }
        case POST_REPLY:
            return{
                ...state,
                replies:[
                    ...state.replies,
                    action.payload
                ]
            }
        case DELETE_TWEET:
            return{
                state,
                replies: state.replies.filter((reply) !== action.payload)
            }
        case GET_RETWEETS:
            return{
                ...state,
                retweets: action.payload
            }
        case RETWEET:
            return{
                ...state,
                retweets: [
                    ...state.retweets,
                    action.payload
                ]
            }
        case UNDO_RETWEET:
            return{
                ...state,
                retweets: state.retweets.filter((tweet) => tweet.retweet.id !== action.payload)
            }
        default:
            return state
    }
}