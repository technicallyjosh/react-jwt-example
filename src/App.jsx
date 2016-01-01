import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { autoRehydrate } from 'redux-persist';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { Router, Route, IndexRoute } from 'react-router';
import { Nav } from './components';
import {
    AppProvider,
    Home,
    Login,
    Logout,
    NoMatch,
    Administrator
} from './containers';

const history                   = createBrowserHistory();
const createStoreWithMiddleware = applyMiddleware(thunk, createLogger())(createStore);
const store                     = compose(autoRehydrate())(createStoreWithMiddleware)(reducers);

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
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Home} onEnter={requireAuth} />
                <Route path="login" component={Login} />
                <Route path="logout" component={Logout} />
                <Route path="administrator" component={Administrator} onEnter={requireAuth} />
                <Route path="*" component={NoMatch} />
            </Route>
        </Router>
    </AppProvider>
), document.getElementById('App'));
