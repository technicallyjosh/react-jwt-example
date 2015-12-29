import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';

export default class AppProvider extends React.Component {
    constructor() {
        super();

        this.state = { rehydrated: false };
    }

    componentWillMount() {
        persistStore(this.props.store, {}, () => {
            this.setState({ rehydrated: true });
        });
    }

    render() {
        if (!this.state.rehydrated) {
            return null;
        }

        return (
            <Provider store={this.props.store}>
                {this.props.children}
            </Provider>
        );
    }
}
