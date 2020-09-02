import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import '../../styles/styles.css'
import { Link } from 'react-router-dom'

export class FollowersModal extends Component {

    static propTypes = {
        followers: PropTypes.array.isRequired,
    }

    render() {
        const { followers } = this.props

        return (
            <Modal {...this.props} dialogClassName='custom_modal' aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Followers
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {followers.map((follower) =>(
                    <div key={follower.id}>
                        <Link className='link' to={`/users/${follower.id}`} onClick={this.props.onHide}>
                            <div className='user_link_sm'>
                            {follower.profile_photo ? (
                                <img className='img_circle_sm' src={follower.profile_photo} alt={follower.profile_photo} />
                            ) : (<div className='circle_sm'><i className='fas fa-user'></i></div>)}
                                <h5> {follower.username}</h5>
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
    followers: state.auth.followers
})

export default connect(mapStateToProps)(FollowersModal)
