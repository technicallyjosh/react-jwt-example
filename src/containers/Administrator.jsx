import React from 'react';
import { connect } from 'react-redux';
import { stateToProps, dispatchToProps } from '../utils';
import { Auth } from '../components';

class Administrator extends React.Component {
	render() {
		return (<div>Test</div>);
	}
}

export default connect(stateToProps, dispatchToProps)(Auth(Administrator, 'admin'));
