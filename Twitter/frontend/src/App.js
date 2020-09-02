import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Menu from './components/Menu'
import Login from './pages/Login'
import Register from './pages/Register'
import { Provider } from 'react-redux'
import store from './store'
import { load_user } from './actions/auth'
import PrivateRoute from './components/common/PrivateRoute'
import './components/styles/styles.css'
import Explore from './components/users/Explore'
import "@babel/polyfill"
import TweetCont from './components/tweets/TweetCont'
import UserLikes from './components/users/UserLikes'
import UserTweets from './components/users/UserTweets'
import { ModalContainer, ModalRoute } from 'react-router-modal';
import 'react-router-modal/css/react-router-modal.css'
import ResponseModal from './components/tweets/modals/ResponseModal'
import SavedTweets from './components/users/SavedTweets'
import UserReplies from './components/users/UserReplies'
import EditProfile from './components/users/EditProfile'

export class App extends Component {

    componentDidMount(){
        store.dispatch(load_user());
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className='principal_container'>
                        <Menu />
                        <Switch>
                            <PrivateRoute exact path='/' component={Dashboard} />
                            <PrivateRoute exact path='/users/:id' component={UserTweets} />
                            <PrivateRoute exact path='/users/:id/likes' component={UserLikes} />
                            <PrivateRoute exact path='/users/:id/replies'component={UserReplies} />
                            <PrivateRoute exact path='/explore' component={Explore} />
                            <PrivateRoute path='/tweets/:id' component={TweetCont} />
                            <PrivateRoute exact path='/user/saved_tweets' component={SavedTweets} />
                            <Route exact path='/login' component={Login}/>
                            <Route exact path='/register' component={Register}/>
                            <PrivateRoute exact path='/user/edit_profile' component={EditProfile} />
                        </Switch>
                    </div>
                    <ModalRoute path='/tweets/:id/reply' component={ResponseModal} className='test-modal'/>
                    <ModalContainer />
                </Router>
            </Provider>
        )
    }
}

export default App
