import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './styles/styles.css'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login_user } from '../actions/auth'
import { Redirect } from 'react-router-dom'

export class Login extends Component {
    state = {
        username: '',
        password: '',
        fail: false
    }

    static propTypes = {
        auth: PropTypes.object.isRequired,
        login_user: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps){
        const { error } = this.props.auth
        if(error !== prevProps.error){
            if(error.non_field_errors){
                this.setState({
                    fail: error.non_field_errors
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
        const { username, password } = this.state
        this.props.login_user(username, password)
    }
    render() {
        const { username, password } = this.state
        const valid_form = username && password !== '' ? (
            <button type='submit' className='custom_button'>Login</button>
        ) : (
            <button type='submit' className='custom_button_disabled' disabled>Login</button>
        )
        if(this.props.auth.isAuthenticated){
            return <Redirect to='/'/>
        }

        return (
            <div className='cont'>
                <h2 className='text-center custom_title'>Login in Twitter</h2>
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
                                type='password'
                                onChange={this.handleChange}
                                value={password}
                                name='password'
                                className='custom_input'
                                placeholder='Password'
                            />
                        </div>
                        {valid_form}
                        {this.state.fail ?
                            <div className='custom_button_disabled mt-2 text-center'>{this.state.fail}</div>
                            : ''
                        }
                    </form>
                    <p>Don't have any account? <Link className='custom_link' to='/register'>Click here!</Link></p>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    error: state.auth.error
})

export default connect(mapStateToProps, { login_user })(Login)
