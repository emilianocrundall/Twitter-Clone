import React, { Component } from 'react'
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import DisplayTweet from './DisplayTweet'

export class Responses extends Component {
    static propTypes = {
        tweet: PropTypes.object.isRequired,
        replies: PropTypes.array.isRequired
    }

    render() {
        const { replies, tweet } = this.props
        return (
            <div className='responses'>
            {replies.map((reply) => (
                <div className='tweet' key={reply.id}>
                    <DisplayTweet tweet={reply} replyto={tweet} />
                </div>
            ))}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    replies: state.tweets.replies,
    tweet: state.tweets.tweet,
})

export default connect(mapStateToProps)(Responses)
