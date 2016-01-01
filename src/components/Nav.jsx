import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { stateToProps } from '../utils';

class Nav extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="/">
                            React JWT Example
						</a>
						<ul className="nav navbar-nav navbar-left">
							<li><Link to="/administrator">Administrator</Link></li>
						</ul>
                    </div>
                    <div>
                        {
                            this.props.isLoggedIn
                                ? (
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

export default connect(stateToProps)(Nav);
