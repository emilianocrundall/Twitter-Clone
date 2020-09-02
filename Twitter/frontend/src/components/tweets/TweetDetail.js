import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { withRouter } from 'react-router'
import {
    like_tweet,
    unlike_tweet,
    save_tweet,
    remove_tweet,
    do_retweet,
    undo_retweet,
    delete_tweet
} from '../../actions/tweets'
import LikersModal from './modals/LikersModal'
import RepliedByModal from './modals/RepliedByModal'

export class TweetDetail extends Component {
    state = {
        modalLikesShow: false,
        modalCommentsShow: false
    }
    static propTypes = {
        auth: PropTypes.object.isRequired,
        tweet: PropTypes.object.isRequired,
        replies: PropTypes.array.isRequired,
        user_likes: PropTypes.array.isRequired,
        saved: PropTypes.array.isRequired,
        likes: PropTypes.array.isRequired,
        retweets: PropTypes.array.isRequired
    }

    is_liked = (id) => {
        if(this.props.user_likes && this.props.user_likes.find((liked_tweet) => liked_tweet.tweet === id)){
            return true
        }else {
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
    delete = (id) => {
        this.props.delete_tweet(id)
        this.props.history.push('/')
    }

    render() {
        const { tweet, likes, replies, auth } = this.props
        
        const moment_date = moment(tweet.date).format('MMMM Do YYYY, h:mm');
        return (
            <React.Fragment>
                {tweet.owner ? (
                <div className='current_page'>
                    <button onClick={() => this.props.history.goBack()}>
                        <i className='fas fa-arrow-left'></i>
                    </button>
                    <h5>Tweet by {tweet.owner.username}</h5>
                </div>
                ) : ''}
                <div className='tweet_detail'>
                { tweet.owner ? (
                    <div className='user_link_sm'>
                        {tweet.owner.profile_photo ? (
                            <img className='img_user_pic' src={tweet.owner.profile_photo} alt={tweet.owner.profile_photo} />
                        ) : (<div className='user_pic'><i className='fas fa-user'></i></div>)
                        }
                        <Link className='custom_link_alt' to={`/users/${tweet.owner.id}`}>{tweet.owner.username}</Link>
                    </div>)
                : ''}
                { tweet.reply ? (
                    <Link className='reply_tweet' to={`/tweets/${tweet.reply}`}>View original tweet</Link>
                ) : '' }
                <h4>{tweet.text}</h4>
                <p>{moment_date}</p>
                <div className='interaction'>
                    <ul>
                        <li>
                            <button onClick={() => this.setState({modalLikesShow: true})} className='tweet_details'>
                            {likes.length} Likes</button>
                        </li>
                        <li>
                            <button onClick={() => this.setState({modalCommentsShow: true})} className='tweet_details'>
                            {replies.length} Comments</button>
                        </li>
                    </ul>
                </div>
                <div className='interaction'>
                    <ul>
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
                            <Link to={`/tweets/${tweet.id}/reply`} className='user_actions'>
                                <i className="far fa-comment"></i>
                            </Link>
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
                        {tweet.owner && tweet.owner.id === auth.user.id ? (
                            <li>
                                <button onClick={() => this.delete(tweet.id)} className='user_actions'>
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            </li>
                    ): ''}
                    </ul>
                </div>
            </div>
            <LikersModal show={this.state.modalLikesShow} onHide={()=> this.setState({modalLikesShow:false})} />
            <RepliedByModal show={this.state.modalCommentsShow} onHide={()=> this.setState({modalCommentsShow:false})}/>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    tweet: state.tweets.tweet,
    replies: state.tweets.replies,
    user_likes: state.tweets.user_likes,
    saved: state.tweets.saved,
    likes: state.tweets.likes,
    retweets: state.tweets.retweets
})
const mapActionsToProps = {
    like_tweet,
    unlike_tweet,
    save_tweet,
    remove_tweet,
    do_retweet,
    undo_retweet,
    delete_tweet
}

const TweetDetailWithRouter = withRouter(TweetDetail)

export default connect(mapStateToProps, mapActionsToProps)(TweetDetailWithRouter)
