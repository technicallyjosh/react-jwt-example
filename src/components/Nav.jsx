import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { stateToProps, dispatchToProps } from '../utils';

class Nav extends React.Component {
	isAdmin() {
		return this.props.isInRole('admin');
	}

	render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="/">
                            React JWT Example
						</a>
						<ul className="nav navbar-nav navbar-left">
							{
								this.props.isLoggedIn && this.isAdmin()
									? (<li><Link to="/administrator">Administrator</Link></li>)
									: null
							}
						</ul>
                    </div>
                    <div>
                        {
							this.props.isLoggedIn
								?
									(
										<ul className="nav navbar-nav navbar-right">
											<li>
												<Link to="/logout">Log Out</Link>

                                            </li>
										</ul>
									)
                                : null
                        }
                    </div>
                </div>
            </nav>
        );
    }
}

export default connect(stateToProps, dispatchToProps)(Nav);
