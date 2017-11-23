import React, { Component } from 'react';

class Home extends Component {

    constructor() {
        super();
        this.state = {
            users: []
        }
    }

    componentWillMount() {

        fetch('/api/getdata')
            .then(res=>res.json())
            .then(users =>  this.setState({
                users
            }))
            .catch(err => console.log(err))

    }

    render() {
        return (
            <div id="wrapper">
                {
                    this.state.users.map((user, index) => {
                        return (
                            <p key={`user-${index}`}>{`My name is ${user.name}. I am ${user.age} years old`}</p>
                        )
                    })
                }
            </div>
        )
    }

}

export default Home;