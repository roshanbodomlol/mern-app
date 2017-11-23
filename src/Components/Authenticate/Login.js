import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';

import LoadingScreen from '../LoadingScreen/LoadingScreen';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            isChecking: false
        };
    }

    handleFormSubmit(e) {
        e.preventDefault();

        if (this.state.email && this.state.password) {
            this.setState({
                isChecking: true
            });

            const { email, password } = this.state;

            axios.post('http://localhost:3001/login', { email, password })
                .then((response) => {
                    if (response.data.status === 'success') {
                        cookie.save('jwt', response.data.token);
                        this.props.login();
                    }
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({
                        isChecking: false
                    });
                });
        } else {
            alert('The email address and/or password is empty');
        }
    }

    render() {
        return (
            <div className="row align-items-center">
                <LoadingScreen isLoading={this.state.isChecking} />
                <div className="col" />
                <div className="col-6">
                    <div id="login-form" className="authenticate-form form-wrapper justify-content-center">
                        <form method="POST" action="/api/register" onSubmit={e => this.handleFormSubmit(e)}>
                            <h1>LOGIN</h1>
                            <div className="form-inner">
                                <input required type="email" placeholder="Email Address" name="email" onChange={event => this.setState({ email: event.target.value })} />
                                <input required type="password" placeholder="Password" name="password" onChange={event => this.setState({ password: event.target.value })} />
                                {
                                    this.state.isChecking ? <input type="submit" className="btn disabled" value="Login" /> : <input type="submit" className="btn" value="Login" />
                                }
                                <br />
                                <div className="text-center">
                                    <ul className="list-inline separator-list">
                                        <li className="list-inline-item"><NavLink to="/register">Register </NavLink></li>
                                        <li className="list-inline-item"><NavLink to="/"> Forgot Password</NavLink></li>
                                    </ul>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col" />
            </div>
        );
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired
};

export default Login;
