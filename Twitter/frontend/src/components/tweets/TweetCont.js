import React, { Component } from 'react'
import TweetDetail from './TweetDetail'
import { connect } from 'react-redux'
import {
    get_tweet,
    get_replies,
    get_likes,
    get_saved,
    get_retweets,
    get_user_liked_tweets
} from '../../actions/tweets'
import Responses from './Responses'

export class TweetCont extends Component {
    componentDidMount(){
        this.props.get_tweet(this.props.match.params.id)
        this.props.get_replies(this.props.match.params.id)
        this.props.get_likes(this.props.match.params.id)
        this.props.get_user_liked_tweets()
        this.props.get_saved()
        this.props.get_retweets()
    }
    componentWillReceiveProps(newProps){
        if(newProps && newProps.match.params.id !== this.props.match.params.id){
            this.props.get_tweet(newProps.match.params.id)
            this.props.get_replies(newProps.match.params.id)
            this.props.get_likes(newProps.match.params.id)
        }
    }
    render() {
        return (
            <div className='second_sub_cont'>
                <TweetDetail />
                <Responses />
            </div>
        )
    }
}
const mapActionsToProps = {
    get_tweet,
    get_replies,
    get_likes,
    get_saved,
    get_retweets,
    get_user_liked_tweets
}

export default connect(null, mapActionsToProps)(TweetCont)
