import React from 'react';
import { connect } from 'react-redux';
import { stateToProps, dispatchToProps } from '../utils';

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = { reason: null };
    }

    componentDidMount() {
        const { query } = this.props.location;

        if (!query.reason) {
            return;
        }

        switch (query.reason) {
            case 'notInRole':
                this.setState({
                    reason: 'Sorry. You do not have access to that.'
                });
                break;
            case 'Invalid token':
                this.props.logout();
                this.props.history.replaceState(null, '/login');
                break;
            default:
                console.warn('Unknown reason.');
        }
    }

    render() {
        return (
            <div>
                <h1>Welcome Home {this.props.userName}</h1>
            </div>
        );
    }
}

export default connect(stateToProps, dispatchToProps)(Home);
