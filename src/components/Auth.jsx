import React from 'react';

export default (ComposedComponent, roles) => {
	return class Auth extends React.Component {
		componentWillMount() {
			let authorized = false;

			if (Array.isArray(roles)) {
				authorized = this.props.isInRoles(roles);
			} else {
				authorized = this.props.isInRole(roles);
			}

			if (!authorized) {
				this.props.history.replaceState(null, '/?reason=unauthorized');
			}
		}

		render() {
			return (
				<ComposedComponent 
					{...this.props}
					roles={roles} />
			);
		}
	}
}

