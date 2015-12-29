import React from 'react';
import { logout } from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Logout extends React.Component {
    componentDidMount() {
        localStorage.removeItem('token');
        this.props.dispatch(logout());
    }

    render() {
        return (
            <div>
                <div className="alert alert-success">You are now logged out.</div>
                <div>
                    <Link to="/login">Back to Login</Link>
                </div>
            </div>
        );
    }
}

export default connect()(Logout);
