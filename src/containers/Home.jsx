import React from 'react';
import { connect } from 'react-redux';
import { stateToProps, dispatchToProps } from '../utils';
import { Alert } from '../components';

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
            case 'unauthorized':
                this.setState({
					reason: 'Sorry. You do not have access to that resource.'
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
				<Alert 
					type="warning"
					message={this.state.reason} />
            </div>
        );
    }
}

export default connect(stateToProps, dispatchToProps)(Home);
