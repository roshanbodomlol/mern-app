import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import User from '../User/User';

class Secured extends Component {
    render() {
        return (
            <Switch>
                <Route path='/user' exact component={User} />
                <Redirect to='/user' />
            </Switch>
        );
    }
}

export default Secured;
