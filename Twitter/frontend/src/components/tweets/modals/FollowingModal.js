import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import '../../styles/styles.css'

export class FollowingModal extends Component {

    static propTypes = {
        following: PropTypes.array.isRequired,
    }

    render() {
        const { following } = this.props

        return (
            <Modal {...this.props} dialogClassName='custom_modal' aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Following
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {following.map((follow) =>(
                    <div key={follow.id}>
                        <Link className='link' to={`/users/${follow.id}`} onClick={this.props.onHide}>
                            <div className='user_link_sm'>
                            {follow.profile_photo ? (
                                <img className='img_circle_sm' src={follow.profile_photo} alt={follow.profile_photo} />
                            ) : (<div className='circle_sm'><i className='fas fa-user'></i></div>)}
                                <h5> {follow.username}</h5>
                            </div>
                        </Link>
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
    following: state.auth.following,
})

export default connect(mapStateToProps)(FollowingModal)