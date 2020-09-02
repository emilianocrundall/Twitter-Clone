import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { connect } from 'react-redux'
import {
    like_tweet,
    unlike_tweet,
    save_tweet,
    remove_tweet,
    do_retweet,
    undo_retweet
} from '../../actions/tweets'
import PropTypes from 'prop-types'

export class DisplayTweet extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        user_likes: PropTypes.array.isRequired,
        saved: PropTypes.array.isRequired,
        retweets: PropTypes.array.isRequired
    }

    is_liked = (id) => {
        const { user_likes } = this.props
        if(user_likes && user_likes.find((liked_tweet) => liked_tweet.tweet === id)){
            return true
        } else{
            return false
        }
    }

    is_saved = (id) => {
        const { saved } = this.props
        if(saved && saved.find((saved_tweet) => saved_tweet.id === id)){
            return true
        } else{
            return false
        }
    }

    retweeted = (id) => {
        const { retweets } = this.props
        if(retweets && retweets.find((tweet) => tweet.retweet.id === id)){
            return true
        } else {
            return false
        }
    }

    format_time = (date) => {
        const new_date = moment(date).format('MMMM Do YYYY, h:mm');
        return new_date
    }
    render() {
        const { tweet, replyto, auth } = this.props
        return (
            <React.Fragment>
            <Link className='link' to={`/tweets/${tweet.id}`}>
                <div className='user_link_sm'>
                    {tweet.owner && tweet.owner.profile_photo ? (
                        <img className='img_circle_sm' src={tweet.owner.profile_photo} alt={tweet.owner.profile_photo} />
                    ) : (<div className='circle_sm'><i className='fas fa-user'></i></div>)}
                    {tweet.owner ? (
                        <h5>{tweet.owner.username}</h5>
                    ) : ''}
                </div>
                {replyto ? (
                        <p className='reply'>in reply to 
                            <span> {replyto.owner.username}</span>
                        </p> 
                    ) : ''}
                <p className='text'>{tweet.text}</p>
                <span>{this.format_time(tweet.date)}</span>
            </Link>
            <div className='interaction'>
                <ul>
                    <li>
                        <Link to={`/tweets/${tweet.id}/reply`} className='user_actions'>
                            <i className="far fa-comment"></i>
                        </Link>
                    </li>
                    <li>
                    {this.retweeted(tweet.id) ? (
                        <button onClick={() => this.props.undo_retweet(tweet.id)} className='user_actions'>
                            <i id='retweet' className="fas fa-retweet"></i>
                        </button>
                    ) : (
                        <button onClick={() => this.props.do_retweet(tweet.id)} className='user_actions'>
                            <i className="fas fa-retweet"></i>
                        </button>
                    )}
                    </li>
                    <li>
                    {this.is_liked(tweet.id) ? (
                        <button onClick={() => this.props.unlike_tweet(tweet.id)} className='user_actions'>
                            <i id='heart' className='fas fa-heart'></i>
                        </button>
                    ) : (
                        <button onClick={() => this.props.like_tweet(tweet.id)} className='user_actions'>
                            <i className='far fa-heart'></i>
                        </button>
                    )}
                    </li>
                    <li>
                    {this.is_saved(tweet.id) ? (
                        <button onClick={() => this.props.remove_tweet(tweet.id)} className='user_actions'>
                            <i id='saved' className='fas fa-bookmark'></i>
                        </button>
                    ) : (
                        <button onClick={() => this.props.save_tweet(tweet.id)} className='user_actions'>
                            <i className='far fa-bookmark'></i>
                        </button>
                    )}
                    </li>
                </ul>
            </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    user_likes: state.tweets.user_likes,
    auth: state.auth,
    saved: state.tweets.saved,
    retweets: state.tweets.retweets
})

const mapActionsToProps = {
    like_tweet,
    unlike_tweet,
    save_tweet,
    remove_tweet,
    do_retweet,
    undo_retweet
}

export default connect(mapStateToProps, mapActionsToProps)(DisplayTweet)
