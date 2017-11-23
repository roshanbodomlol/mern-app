import React, {Component} from 'react';
import './styles.css';

class ToastInfo extends Component {

    constructor() {
        super();
        this.state = {
            toast: true
        }
    }

    hideToast = () => {
        this.setState({
            toast: false
        });
    };

    render() {

        let toastClass = "";

        if (this.state.toast) {
            toastClass = "toast-info"
        } else {
            toastClass = "toast-info off"
        }

        return (
            <div>
                <div className={toastClass}>
                    <div className="-main">
                        {this.props.message}
                    </div>
                    <div className="-close">
                        <i className="icon ion-close-round" onClick={this.hideToast}/>
                    </div>
                </div>
                <div className="test"/>
            </div>
        );
    }

}

export default ToastInfo;