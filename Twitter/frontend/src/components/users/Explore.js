import React, { Component } from 'react'
import axios from 'axios'
import DisplayTweet from '../tweets/DisplayTweet'
import Loader from '../common/Loader'

export class Explore extends Component {

    state = {
        tweet: '',
        tweets: null,
        loading: false
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({
            loading: true
        })
        const { tweet } = this.state
        axios
        .get(`/api/tweets/?search=${tweet}`)
        .then((res) => {
            this.setState({
                tweets: res.data,
                loading: false
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    render() {
        return (
            <div className='second_sub_cont'>
                <div className='current_page'>
                    <button onClick={() => this.props.history.goBack()}><i className='fas fa-arrow-left'></i></button>
                    <h5>Explore</h5>
                </div>
                <div className='search_cont'>
                    <form onSubmit={this.handleSubmit}>
                        <div className='form-group'>
                            <input
                                className='search_input'
                                type='text'
                                placeholder='Search tweets...'
                                onChange={this.handleChange}
                                value={this.state.tweet}
                                name='tweet'
                            />
                            {this.state.tweet.length == 0 ? (
                                <button className='search_button_d' type='submit' disabled><i className='fas fa-search'></i></button>
                            ) : (
                                <button className='search_button' type='submit'><i className='fas fa-search'></i></button>
                            )}
                         </div>
                    </form>
                </div>
                {this.state.loading ? (
                    <Loader />
                ) : ''}
                <div className='feed'>
                    {!this.state.loading && this.state.tweets ? (
                        this.state.tweets.map((tweet) => (
                            <div className='tweet' key={tweet.id}>
                                <DisplayTweet tweet={tweet}/>
                            </div>
                        ))
                    ): ''}
                </div>
            </div>
        )
    }
}

export default Explore
