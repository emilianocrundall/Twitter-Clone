import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Modal } from 'react-bootstrap'

export class LikersModal extends Component {

    static propTypes = {
        likes: PropTypes.array.isRequired
    }
    render() {
        const { likes } = this.props
        return (
            <Modal {...this.props} dialogClassName='custom_modal' aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Liked by
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {likes.map((like) =>(
                    <div key={like.id}>
                        {like.user ? (
                            <Link className='link' to={`/users/${like.user.id}`}>
                                <div className='user_link_sm'>
                                {like.user.profile_photo ? (
                                    <img className='img_circle_sm' src={like.user.profile_photo} alt={like.user.profile_photo} />
                                ) : (<div className='circle_sm'><i className='fas fa-user'></i></div>)}
                                    <h5> {like.user.username}</h5>
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
    likes: state.tweets.likes,
})

export default connect(mapStateToProps)(LikersModal)
