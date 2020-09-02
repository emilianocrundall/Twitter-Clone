import React from 'react'
import { Modal } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import '../../styles/styles.css'
import { get_tweet, post_reply } from '../../../actions/tweets'
import { withRouter } from 'react-router-dom'

class ResponseModal extends React.Component{
    static propTypes = {
        tweet: PropTypes.object.isRequired,
        auth: PropTypes.object.isRequired
    }
    state = {
        response: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const new_reply = {
            text: this.state.response
        }
        const { tweet } = this.props

        this.props.post_reply(tweet.id, new_reply)
        
        this.setState({
            response: ''
        })
        this.props.history.push(`/tweets/${tweet.id}/`)
    }

    render(){
        const { tweet } = this.props
        const { isAuthenticated } = this.props.auth
        const { goBack } = this.props.history
        if(!isAuthenticated){
            return <Redirect to='/login' />
        }else {
            return (
                <Modal dialogClassName='custom_modal' backdrop="static" show={true} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            { tweet.owner ? ( <h4>Reply to {tweet.owner.username}</h4>) : '' }
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.handleSubmit}>
                            <input
                                onChange={this.handleChange}
                                className='simple_input'
                                name='response'
                                value={this.state.response}
                                placeholder='Tweet your response'
                            />
                            <div className='text-center'>
                                <button type='submit' className='custom_button_full'>Send</button>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className='custom_button_alt' onClick={() => goBack()} >Close</button>
                    </Modal.Footer>
                </Modal>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    tweet: state.tweets.tweet,
    auth: state.auth
})

const ResponseModalWithRouter = withRouter(ResponseModal)

export default connect(mapStateToProps, { get_tweet, post_reply })(ResponseModalWithRouter)
