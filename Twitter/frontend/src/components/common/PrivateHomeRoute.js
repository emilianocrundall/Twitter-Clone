import React from 'react'
import { Route } from 'react-router';
import { connect } from 'react-redux';
import Loader from './Loader'

const PrivateHomeRoute = ({component: Component, auth, layout: Layout, ...rest}) => (
    <Route {...rest} render={props => {
            if(auth.loading){
                return <Loader />
            }else if(!auth.isAuthenticated){
                return <Redirect to='/login' />
            }else{
                return (
                    <React.Fragment>
                        <Layout />
                        <Component {...props}/>
                    </React.Fragment>
                )
            }
        }}
    />
)

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateHomeRoute)
