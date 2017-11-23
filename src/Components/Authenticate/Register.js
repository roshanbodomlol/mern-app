import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
            isChecking: false
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            isChecking: true
        });
        const {
            name, email, password, passwordConfirm
        } = this.state;

        axios.post('http://localhost:3001/register', {
            name, email, password, passwordConfirm
        })
            .then((response) => {
                if (response.data.status === 'success') {
                    this.props.login();
                }
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    isChecking: false
                });
            });
    }

    render() {
        return (
            <div className="row align-items-center">
                <div className="col" />
                <div className="col-6">
                    <div id="register-form" className="authenticate-form form-wrapper justify-content-center">
                        <form method="POST" action="/api/register" onSubmit={event => this.handleSubmit(event)}>
                            <h1>REGISTER</h1>
                            <div className="form-inner">
                                <input type="text" placeholder="Your Name" name="name" onChange={event => this.setState({ name: event.target.value })} />
                                <input type="text" placeholder="Email Address" name="email" onChange={event => this.setState({ email: event.target.value })} />
                                <input type="password" placeholder="Password" name="password" onChange={event => this.setState({ password: event.target.value })} />
                                <input type="password" placeholder="Confirm Password" name="confirm-password" onChange={event => this.setState({ passwordConfirm: event.target.value })} />
                                {
                                    this.state.isChecking ? <input type="submit" value="Register" className="btn disabled" /> : <input type="submit" value="Register" className="btn" />
                                }
                                <p>Already registered? <NavLink to="/login">Login</NavLink></p>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col" />
            </div>
        );
    }
}

Register.propTypes = {
    login: PropTypes.func.isRequired
};

export default Register;
