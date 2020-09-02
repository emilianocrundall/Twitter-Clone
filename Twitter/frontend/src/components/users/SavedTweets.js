import React, { Component } from 'react'
import { get_saved, get_user_liked_tweets } from '../../actions/tweets'
import PropTypes from 'prop-types'
import '../styles/styles.css'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import DisplayTweet from '../tweets/DisplayTweet'

export class SavedTweets extends Component {
    static propTypes = {
        saved: PropTypes.array.isRequired,
        user_likes: PropTypes.array.isRequired
    }

    componentDidMount(){
        this.props.get_saved()
        this.props.get_user_liked_tweets()
    }
    render() {
        const { saved } = this.props
        return (
            <div className='second_sub_cont'>
                <div className='current_page'>
                    <button onClick={() => this.props.history.goBack()}><i className='fas fa-arrow-left'></i></button>
                    <h5>Saved Tweets</h5>
                </div>
                <div className='feed'>
                    {saved.map((tweet) => (
                        <div className='tweet' key={tweet.id}>
                            <DisplayTweet tweet={tweet} />
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    saved: state.tweets.saved,
    user_likes: state.tweets.user_likes
})
const mapActionsToProps = {
    get_saved,
    get_user_liked_tweets
}

const SavedTweetWithRouter = withRouter(SavedTweets)

export default connect(mapStateToProps, mapActionsToProps)(SavedTweetWithRouter)
