import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Modal } from 'react-bootstrap'

export class RepliedByModal extends Component {

    static propTypes = {
        replies: PropTypes.array.isRequired
    }
    render() {
        const { replies } = this.props
        return (
            <Modal {...this.props} dialogClassName='custom_modal' aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Replied by
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {replies.map((reply) =>(
                <div key={reply.id}>
                    {reply.owner ? (
                    <Link className='link' to={`/users/${reply.owner.id}`}>
                        <div className='user_link_sm'>
                        {reply.owner.profile_photo ? (
                            <img className='img_circle_sm' src={reply.owner.profile_photo} alt={reply.owner.profile_photo} />
                        ) : (<div className='circle_sm'><i className='fas fa-user'></i></div>)}
                            <h5> {reply.owner.username}</h5>
                        </div>
                    </Link>
                    ) : ''}
                </div>
                ))}
                </Modal.Body>
                <Modal.Footer>
                    <button className='custom_button_alt' onClick={this.props.onHide}>Close</button>
                </Modal.Footer>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => ({
    replies: state.tweets.replies
})

export default connect(mapStateToProps)(RepliedByModal)