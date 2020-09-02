import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../styles/styles.css'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { follow_user, unfollow_user, get_followers, get_following } from '../../actions/auth'
import { withRouter } from "react-router";
import FollowingModal from '../tweets/modals/FollowingModal'
import FollowersModal from '../tweets/modals/FollowersModal'

export class UserHeader extends Component {
    state= {
        modalFollowers: false,
        modalFollowing: false
    }

    static propTypes = {
        auth: PropTypes.object.isRequired,
        user_detail: PropTypes.object.isRequired,
        followers: PropTypes.array.isRequired,
        following: PropTypes.array.isRequired
    }
    componentDidMount(){
        this.props.get_followers(this.props.match.params.id)
        this.props.get_following(this.props.match.params.id)
    }
    componentWillReceiveProps(newProps){
        if(newProps && newProps.match.params.id !== this.props.match.params.id){
            this.props.get_followers(newProps.match.params.id)
            this.props.get_following(newProps.match.params.id)
        }
    }

    is_follower = () => {
        const { followers } = this.props
        const { user } = this.props.auth
        if(followers && followers.find((user_d) => user_d.id === user.id)){
            return true;
        }else{
            return false
        }
    }
    follow = () => {
        this.props.follow_user(this.props.user_detail.id)
    }
    unfollow = () => {
        this.props.unfollow_user(this.props.user_detail.id)
    }

    render() {
        const { user_detail, followers, following } = this.props
        const { user } = this.props.auth
        
        const follow_button = this.is_follower() ? (
            <button onClick={this.unfollow} className='custom_button_full'>Unfollow</button>
        ) : (<button onClick={this.follow} className='custom_button_alt'>Follow</button>)

        return (
            <React.Fragment>
            <div className='second_sub_cont'>
                <div className='current_page'>
                    <button onClick={() => this.props.history.goBack()}><i className='fas fa-arrow-left'></i></button>
                    <h5>{user_detail.username}</h5>
                </div>
                <div className='profile_header'>
                    {user_detail.profile_photo ? (
                        <img className='img_circle' src={user_detail.profile_photo} alt={user_detail.profile_photo}/>
                    ) : (<div className="circle"><i className="fas fa-user"></i></div>)
                    }
                    {user_detail.complete_name ? (<h5>{user_detail.complete_name}</h5>) : ''}
                    <span>@{user_detail.username}</span>
                    {user_detail.bio ? (<p>{user_detail.bio}</p>) : ''}
                    <div className='user_interaction'>
                        <button onClick={() => this.setState({modalFollowers: true})} className='user_link_alt'>{followers.length} Followers</button>
                        <button onClick={() => this.setState({modalFollowing: true})} className='user_link_alt'>{following.length} Following</button>
                    </div>
                    <div className='edit_profile'>
                        {user_detail.id == user.id ?
                            <Link className='custom_button_alt' to='/user/edit_profile/'>Edit Profile</Link>
                        : follow_button }
                    </div>
                    <div className='user_links'>
                        <ul>
                            <li><Link className='user_link' to={`/users/${user_detail.id}`}>Tweets</Link></li>
                            <li><Link className='user_link' to={`/users/${user_detail.id}/replies`}>Responses</Link></li>
                            <li><Link className='user_link' to={`/users/${user_detail.id}/likes`}>Likes</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <FollowersModal show={this.state.modalFollowers}  onHide={()=> this.setState({modalFollowers:false})}/>
            <FollowingModal show={this.state.modalFollowing} onHide={()=> this.setState({modalFollowing:false})}/>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    user_detail: state.auth.user_detail,
    followers: state.auth.followers,
    following: state.auth.following
})

const mapActionsToProps = {
    follow_user,
    unfollow_user,
    get_followers,
    get_following
}
const UserHeaderWithRouter = withRouter(UserHeader);

export default connect(mapStateToProps, mapActionsToProps)(UserHeaderWithRouter)
