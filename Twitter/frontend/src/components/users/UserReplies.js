import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    get_user_liked_tweets,
    get_user_replies,
    get_saved
} from '../../actions/tweets'
import { get_user } from '../../actions/auth'
import PropTypes from 'prop-types'
import UserHeader from './UserHeader'
import DisplayTweet from '../tweets/DisplayTweet'

export class UserReplies extends Component {

    static propTypes = {
        user_likes: PropTypes.array.isRequired,
        user_replies: PropTypes.array.isRequired,
        saved: PropTypes.array.isRequired,
        user_detail: PropTypes.object.isRequired
    }
    componentDidMount(){
        this.props.get_user(this.props.match.params.id)
        this.props.get_user_liked_tweets()
        this.props.get_user_replies(this.props.match.params.id)
        this.props.get_saved()
    }

    render() {
        const { user_replies, user_detail } = this.props
        return (
            <React.Fragment>
            {user_detail ? <UserHeader /> : null}
            <div className='third_container'>
                <div className='feed'>
                {user_replies.map((tweet) => (
                    <div className='tweet' key={tweet.id}>
                        <DisplayTweet tweet={tweet} />
                    </div>
                ))}
                </div>
            </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    user_replies: state.tweets.user_replies,
    user_likes: state.tweets.user_likes,
    user_detail: state.auth.user_detail,
    saved: state.tweets.saved
})

const mapActionsToProps = {
    get_user,
    get_user_liked_tweets,
    get_user_replies,
    get_saved
}

export default connect(mapStateToProps, mapActionsToProps)(UserReplies)
