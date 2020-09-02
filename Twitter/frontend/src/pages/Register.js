import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { register_user } from '../actions/auth'
import './styles/styles.css'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class Register extends Component {

    static propTypes = {
        register_user: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired
    }

    state = {
        username: '',
        email: '',
        password: '',
        password2:  '',
        fail: false
    }

    componentDidUpdate(prevProps){
        const { error } = this.props.auth
        if(error !== prevProps.error){
            if(error.username){
                this.setState({
                    fail: error.username
                })
            }else if(error.email){
                this.setState({
                    fail: error.email
                })
            }
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { username, email, password, password2 } = this.state
        if(password !== password2){
            this.setState({
                fail: 'Passwords do not match'
            })
        }else if(password.length < 6){
            this.setState({
                fail: 'Password too short!'
            })
        }else{
            const user = { username, email, password }
            this.props.register_user(user)
        }
    }

    render() {
        const { username, email, password, password2 } = this.state

        const valid_form = username && email && password && password2 !== '' ? (
            <button type='submit' className='custom_button'>Register</button>
        ) : (
            <button type='submit' className='custom_button_disabled' disabled>Register</button>
        )

        if(this.props.auth.isAuthenticated){
            return <Redirect to='/'/>
        }
        return (
            <div className='cont'>
                <h2 className='text-center custom_title'>Register in Twitter</h2>
                <div className='secondary_cont'>
                    <form onSubmit={this.handleSubmit}>
                        <div className='form-group'>
                            <input
                                type='text'
                                onChange={this.handleChange}
                                value={username}
                                name='username'
                                className='custom_input'
                                placeholder='Username'
                            />
                        </div>
                        <div className='form-group'>
                            <input
                                type='text'
                                onChange={this.handleChange}
                                value={email}
                                name='email'
                                className='custom_input'
                                placeholder='Email'
                            />
                        </div>
                        <div className='form-group'>
                            <input
                                type='password'
                                onChange={this.handleChange}
                                value={password}
                                name='password'
                                className='custom_input'
                                placeholder='Password'
                            />
                        </div>
                        <div className='form-group'>
                            <input
                                type='password'
                                onChange={this.handleChange}
                                value={password2}
                                name='password2'
                                className='custom_input'
                                placeholder='Confirm Password'
                            />
                        </div>
                        {valid_form}
                    </form>
                    {this.state.fail ?
                        <div className='custom_button_disabled mt-2 text-center'>{this.state.fail}</div>
                        : ''
                    }
                    <p>Already have an account? <Link className='custom_link' to='/login'>Click here!</Link></p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    error: state.auth.error
})

export default connect(mapStateToProps, {register_user})(Register)