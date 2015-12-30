import React from 'react';
import { logout } from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Alert from '../components/Alert.jsx';

class Logout extends React.Component {
    componentDidMount() {
        this.props.dispatch(logout());
    }

    render() {
        return (
            <div>
                <Alert message="You are now logged out" />
                <div>
                    <Link to="/login">Back to Login</Link>
                </div>
            </div>
        );
    }
}

export default connect()(Logout);
