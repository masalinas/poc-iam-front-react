import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";

import jwt_decode from "jwt-decode";

import AuthService from "../services/AuthService";

const TOKEN = "poc-token";

class RouterRender extends Component {
    constructor(props) {
      super(props);

      this.state = { authorized: null }
    }
  
    componentDidMount() {
        const tokenStr = localStorage.getItem(TOKEN);

        let currentDate = new Date();
    
        // JWT not exist
        if (tokenStr === null) {
            console.log("Token not exist.");
    
            this.setState({ authorized: false });

            return;
        }
    
        // parse JWT token and check TTL (JWT exp is in seconds)
        const token = JSON.parse(tokenStr);
        const accessToken = jwt_decode(token.access_token);
    
        if (accessToken.exp * 1000 < currentDate.getTime()) {
            console.log("Token expired.");
    
            // refresh token
            AuthService.refresh().then(
                response => {   
                    console.log("Token refreshed.");              
                    this.setState({ authorized: true });
                },
                error => {
                    // logout and trigger login view
                    AuthService.logout().then(
                        response => {
                            console.log("Logout.");
                            this.setState({ authorized: false });
                        },
                        error => {
                            console.log("Error Logout.");
                            this.setState({ authorized: false });
                        }
                    );                
                }
            );
        } else {
            console.log("Token valid");               
            this.setState({ authorized: true });
        }
    }
  
    render() {
        if(this.state.authorized === true) {
            const { component: Component, componentProps } = this.props;

            return <Component {...componentProps} />
        } else if(this.state.authorized === false) {
            return (<Redirect to={{ pathname: '/login', state: { from: this.props.location } }} />)
        }

        //return <LoadingSpinner />
        return <p>
           Refreshing token ...
        </p>
    }
  }

  const GuardedRoute = function ({ component: Component, ...rest }) {
    return (
        // render is now a function rather than a Promise.
        <Route {...rest} render={ props => 
            <RouterRender componentProps={props} component={Component} />
        } />
    )
  }

export default GuardedRoute;