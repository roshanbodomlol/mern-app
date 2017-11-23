import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from './Login';
import Register from './Register';

import './index.css';

class Authenticate extends Component {

    render() {
        return (
            <Switch>
                <Route path="/login" exact render={() => <Login login={this.props.onLogin} />} />
                <Route path="/register" render={() => <Register login={this.props.onLogin} />} />
                <Redirect to="/login"/>
            </Switch>
        );
    }

}

export default Authenticate;