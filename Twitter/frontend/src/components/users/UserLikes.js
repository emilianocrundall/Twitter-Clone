import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
    get_liked_tweets,
    get_user_liked_tweets,
    get_saved
} from '../../actions/tweets'
import { get_user } from '../../actions/auth'
import '../styles/styles.css'
import UserHeader from './UserHeader'
import DisplayTweet from '../tweets/DisplayTweet'

export class UserLikes extends Component {

    static propTypes = {
        user_detail: PropTypes.object.isRequired,
        user_likes: PropTypes.array.isRequired,
        saved: PropTypes.array.isRequired,
        liked_tweets: PropTypes.array.isRequired
    }

    componentDidMount(){
        this.props.get_user(this.props.match.params.id)
        this.props.get_liked_tweets(this.props.match.params.id)
        this.props.get_saved()
        this.props.get_user_liked_tweets()
    }

    render() {
        const { liked_tweets } = this.props
        return (
            <React.Fragment >
            { this.props.user_detail ? <UserHeader /> : '' }
            <div className='third_container'>
                <div className='feed'>
                {liked_tweets ? liked_tweets.map((tweet) => (
                    <div className='tweet' key={tweet.tweet.id}>
                        <DisplayTweet tweet={tweet.tweet} />
                    </div>
                )) : ''}
                </div>
            </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    user_detail: state.auth.user_detail,
    user_likes: state.tweets.user_likes,
    liked_tweets: state.tweets.liked_tweets,
    saved: state.tweets.saved
})

const mapActionsToProps = {
    get_user,
    get_user_liked_tweets,
    get_liked_tweets,
    get_saved
}

export default connect(mapStateToProps, mapActionsToProps)(UserLikes)
