import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../actions/auth'
import './styles/styles.css'

export class Menu extends Component {

    static propTypes = {
        location: PropTypes.object.isRequired,
        auth: PropTypes.object.isRequired
    }

    render() {
        const { location } = this.props;
        const { user } = this.props.auth

        if (location.pathname.match(/login/) || location.pathname.match(/register/)){
            return null;
        }else if(this.props.auth.loading){
            return null
        }else{
            return (
                <div className='first_sub_cont'>
                    <nav>
                        <ul>
                            <li>
                                <Link to='/' className='menu_link'>
                                    <i className='fas fa-home'></i>
                                    <span> Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link to='/explore' className='menu_link'>
                                    <i className='fas fa-hashtag'></i>
                                    <span> Explore</span>
                                </Link>
                            </li>
                            {this.props.auth.isAuthenticated ?
                                <li>
                                    <Link to={`/users/${user.id}`} className='menu_link'>
                                        <i className='fas fa-user'></i>
                                        <span> Profile</span>
                                    </Link>
                                </li>
                            : ''}
                            <li>
                                <Link to='/user/saved_tweets' className='menu_link'>
                                    <i className='fas fa-bookmark'></i>
                                    <span> Saved</span>
                                </Link>
                            </li>
                            <li>
                            {this.props.auth.isAuthenticated ? 
                                <button onClick={this.props.logout} className='menu_link'>
                                    <i className='fas fa-sign-out-alt'></i>
                                    <span> Logout</span>
                                </button>
                            : ''
                            }
                            </li>
                        </ul>
                    </nav>
                </div>
            )
        }
    }
}
const MenuwithRouter = withRouter(Menu);

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps,{logout})(MenuwithRouter)