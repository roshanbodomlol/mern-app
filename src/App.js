import React, { Component } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';

import Authenticate from './Components/Authenticate/Authenticate';
import Secured from './Components/Secured/Secured';
import LoadingScreen from './Components/LoadingScreen/LoadingScreen';

import './Styles/global.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            isLoading: true
        };
    }

    componentWillMount() {
        this.refreshToken();
    }

    userLogIn() {
        this.setState({ isLoggedIn: true });
    }

    userLogOut() {
        this.setState({ isLoggedIn: false });
    }

    refreshToken() {
        const token = cookie.load('jwt');
        if (token) {
            axios({
                url: 'http://localhost:3001/api/refresh',
                method: 'POST',
                headers: {
                    Authorization: `JWT ${token}`
                }
            })
                .then((response) => {
                    if (response.data.status === 'success') {
                        this.setState({
                            isLoggedIn: true,
                            isLoading: false
                        });
                    } else {
                        this.setState({
                            isLoggedIn: false,
                            isLoading: false
                        });
                    }
                })
                .catch((err) => {
                    console.log('Error Occurred: ', err);
                    alert('An Unexpected error has occurred. Please try again later.');
                    this.setState({
                        isLoading: false
                    });
                });
        } else {
            this.setState({
                isLoggedIn: false,
                isLoading: false
            });
        }
    }


    render() {
        return (
            <div id="wrapper">
                <LoadingScreen isLoading={this.state.isLoading} />
                <div className="container-fluid">
                    {this.state.isLoggedIn
                        ? <Secured onLogout={() => this.userLogOut()} />
                        : <Authenticate onLogin={() => this.userLogIn()} />
                    }
                </div>
            </div>
        );
    }
}

export default App;
