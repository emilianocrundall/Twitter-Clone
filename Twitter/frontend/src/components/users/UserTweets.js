import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    get_user_tweets,
    get_saved,
    get_user_liked_tweets,
    get_retweets
} from '../../actions/tweets'
import { get_user } from '../../actions/auth'
import PropTypes from 'prop-types'
import UserHeader from './UserHeader'
import DisplayRetweet from '../tweets/DisplayRetweet'
import DisplayTweet from '../tweets/DisplayTweet'

export class UserTweets extends Component {
    static propTypes = {
        user_tweets: PropTypes.array.isRequired,
        user_detail: PropTypes.object.isRequired,
        saved: PropTypes.array.isRequired,
        user_likes: PropTypes.array.isRequired
    }
    componentDidMount(){
        this.props.get_user(this.props.match.params.id)
        this.props.get_user_tweets(this.props.match.params.id)
        this.props.get_saved()
        this.props.get_user_liked_tweets()
        this.props.get_retweets()
    }
    componentWillReceiveProps(newProps){
        if(newProps && newProps.match.params.id !== this.props.match.params.id){
            this.props.get_user(newProps.match.params.id)
            this.props.get_user_tweets(newProps.match.params.id)
        }
    }

    render() {
        const { user_tweets, user_detail } = this.props
        return (
            <React.Fragment>
            {user_detail ? <UserHeader /> : null}
            <div className='third_container'>
                <div className='feed'>
                    {user_tweets.map((tweet) => (
                        <div className='tweet' key={tweet.id}>
                            {tweet.retweet ? (
                                <DisplayRetweet tweet={tweet} />
                            ) : (
                                <DisplayTweet tweet={tweet} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    user_tweets: state.tweets.user_tweets,
    user_detail: state.auth.user_detail,
    saved: state.tweets.saved,
    user_likes: state.tweets.user_likes
})

const mapActionsToProps = {
    get_user_tweets,
    get_user,
    get_saved,
    get_user_liked_tweets,
    get_retweets
}


export default connect(mapStateToProps, mapActionsToProps)(UserTweets)
