import React, { Component } from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { update_user } from '../../actions/auth'

export class EditProfile extends Component {
    state = {
        complete_name: this.props.user.complete_name,
        profile_photo: this.props.profile_photo,
        bio: this.props.user.bio,
        changed: false
    }
    static propTypes ={
        user: PropTypes.object.isRequired
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            changed: true
        })
    }
    handleChangeImage = (e) => {
        this.setState({
            profile_photo: e.target.files[0],
            changed: true
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { complete_name, bio, profile_photo } = this.state
        
        let user_changes = new FormData()
        user_changes.append('complete_name', complete_name)
        user_changes.append('bio', bio)
        user_changes.append('profile_photo', profile_photo, profile_photo.name)

        if(complete_name.lenght === 0 || bio.lenght == 0 || profile_photo.lenght == 0){
            this.setState({
                changed: false
            })
        } else {
            this.props.update_user(user_changes)
            const { user } = this.props
            this.props.history.push(`/users/${user.id}/`)
        }
        
    }
    render() {
        const { complete_name, bio } = this.state

        return (
            <div className='second_sub_cont'>
                <div className='current_page'>
                    <button onClick={() => this.props.history.goBack()}><i className='fas fa-arrow-left'></i></button>
                    <h5>Update Profile</h5>
                </div>
                <div className='update_form'>
                    <div className='secondary_cont'>
                        <form onSubmit={this.handleSubmit}>
                            <div className='form-group'>
                                <input
                                    type='text'
                                    onChange={this.handleChange}
                                    value={complete_name}
                                    name='complete_name'
                                    className='custom_input'
                                    placeholder='Complete Name'
                                />
                            </div>
                            <div className='form-group'>
                                <input
                                    type='text'
                                    onChange={this.handleChange}
                                    value={bio}
                                    name='bio'
                                    className='custom_input'
                                    placeholder='Biography'
                                />
                            </div>
                            <div className='form-group'>
                                <input
                                    type='file'
                                    onChange={this.handleChangeImage}
                                    name='profile_photo'
                                    className='custom_input'
                                    placeholder='Select a file'
                                />
                            </div>
                            {!this.state.changed ? (
                                <button type='submit' className='custom_button_disabled' disabled>Save</button>
                            ) : (
                                <button type='submit' className='custom_button'>Save</button>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    user: state.auth.user
})
const EditProfileWithRouter = withRouter(EditProfile)

export default connect(mapStateToProps, { update_user })(EditProfileWithRouter)
