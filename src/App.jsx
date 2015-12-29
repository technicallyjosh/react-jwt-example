import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { autoRehydrate } from 'redux-persist';
import reducers from './reducers';
import AppProvider from './containers/AppProvider.jsx';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Nav from './components/Nav.jsx';
import Home from './containers/Home.jsx';
import Login from './containers/Login.jsx';
import Logout from './containers/Logout.jsx';
import NoMatch from './containers/NoMatch.jsx';

const createStoreWithMiddleware = applyMiddleware(thunk, createLogger())(createStore);
const store = compose(autoRehydrate())(createStoreWithMiddleware)(reducers);

class App extends React.Component {
    render() {
        return (
            <div>
                <Nav {...this.props} />
                <div className="container-fluid">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

function requireAuth(nextState, replaceState) {
    const state = store.getState();

    if (!state.auth.isLoggedIn) {
        const nextPathname = nextState.location.pathname;
        replaceState({ nextPathname }, '/login');
    }
}

render((
    <AppProvider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home} onEnter={requireAuth} />
                <Route path="login" component={Login} />
                <Route path="logout" component={Logout} />
            </Route>
            <Route path="*" component={NoMatch} />
        </Router>
    </AppProvider>
), document.getElementById('App'));
