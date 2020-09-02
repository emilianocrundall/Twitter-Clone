import React, { Component } from 'react'
import './styles/styles.css'
import NewTweet from './tweets/NewTweet'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
    get_tweets,
    get_user_liked_tweets,
    get_saved,
    get_retweets
} from '../actions/tweets'
import DisplayTweet from './tweets/DisplayTweet'
import DisplayRetweet from './tweets/DisplayRetweet'

export class Dashboard extends Component {

    static propTypes = {
        tweets: PropTypes.array.isRequired,
        auth: PropTypes.object.isRequired,
        user_likes: PropTypes.array.isRequired,
        saved: PropTypes.array.isRequired,
        retweets: PropTypes.array.isRequired
    }

    componentDidMount(){
        this.props.get_tweets()
        this.props.get_user_liked_tweets()
        this.props.get_saved()
        this.props.get_retweets()
    }

    render() {
        const { tweets } = this.props
        return (
            <div className='second_sub_cont'>
                <div className='current_page'>
                    <h3>Home</h3>
                </div>
                <NewTweet />
                <div className='feed'>
                    {tweets.map((tweet) => (
                        <div className='tweet' key={tweet.id}>
                            {tweet.retweet ? (
                                <DisplayRetweet tweet={tweet} />
                            ) : ( <DisplayTweet tweet={tweet} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    tweets: state.tweets.tweets,
    user_likes: state.tweets.user_likes,
    auth: state.auth,
    saved: state.tweets.saved,
    retweets: state.tweets.retweets
})

const mapActionsToProps = {
    get_tweets,
    get_user_liked_tweets,
    get_saved,
    get_retweets,
}

export default connect(mapStateToProps, mapActionsToProps)(Dashboard)