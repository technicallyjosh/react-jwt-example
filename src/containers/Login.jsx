import React from 'react';
import { connect } from 'react-redux';
import { stateToProps } from '../utils';
import { login } from '../actions';
import { Alert } from '../components';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            error: null
        };
    }

    onSubmit(e) {
        e.preventDefault();

        const { username, password } = this.state;

        this.props
            .login(username, password)
            .then(() => {
                const { location } = this.props;

                // NOTE: here we use replaceState since it's login and discourage going "back"
                if (location.state && location.state.nextPathname) {
                    this.props.history.replaceState(null, location.state.nextPathname);
                } else {
                    this.props.history.replaceState(null, '/');
                }
            })
            .catch(err => {
                this.setState({
                    error: err.message
                });
            });
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div className="col-md-4">
                <h1>Log In</h1>
                <Alert type="danger" message={this.state.error} />
                <form noValidate onSubmit={e => this.onSubmit(e)}>
                    <div className="form-group">
                        <label className="control-label">Username</label>
                        <input
                            type="text"
                            name="username"
                            className="form-control"
                            onChange={e => this.onChange(e)} />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Username</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            onChange={e => this.onChange(e)} />
                    </div>
                    <button className="btn btn-primary">Log In</button>
                </form>
            </div>
        );
    }
}

function dispatchToProps(dispatch) {
    return {
        login: (username, password) => dispatch(login(username, password))
    };
}

export default connect(stateToProps, dispatchToProps)(Login);
