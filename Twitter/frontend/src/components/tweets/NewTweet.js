import React, { Component } from 'react'
import '../styles/styles.css'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { post_tweet } from '../../actions/tweets'

export class NewTweet extends Component {
    state = {
        text: ''
    }
    static propTypes = {
        post_tweet: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const new_tweet = {
            text: this.state.text
        }
        this.props.post_tweet(new_tweet)
        this.setState({
            text: ''
        })
    }

    render() {
        const { text } = this.state
        const valid_tweet = text == '' ?
            <button className='custom_button_full_d' disabled>Tweet</button> :
            <button className='custom_button_full'>Tweet</button>
        return (
            <div className='new_tweet_cont'>
                <form onSubmit={this.handleSubmit}>
                    <input
                        onChange={this.handleChange}
                        placeholder="What's happening?"
                        name='text'
                        value={text}
                    />
                    {this.props.auth.isAuthenticated ? valid_tweet : ''}
                </form>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, {post_tweet})(NewTweet)