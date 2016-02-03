/* global __DEVTOOLS__ */
import React, { PropTypes } from 'react';
import { Redirect, Route } from 'react-router';
import { ReduxRouter } from 'redux-router';
import { connect } from 'react-redux';
import configureStore from './utils/configure-store';
import * as storage from './persistence/storage';
import * as components from './components';
import * as constants from './constants';

const {
    Home,
    Application
    } = components;

const initialState = {
    application: {
        token: storage.get('token'),
        locale: storage.get('locale') || 'en',
        user: {permissions: [/*'manage_account'*/]}
    }
};

export const store = configureStore(initialState);

function getRootChildren(props) {
    const rootChildren = [renderRoutes()];

    if (__DEVTOOLS__) {
        const DevTools = require('./components/DevTools').default;
        rootChildren.push(<DevTools key="devtools"/>);
    }
    return rootChildren;
}

function renderRoutes() {
    return (
        <ReduxRouter>
            <Route component={Application}>
                <Route path="/" component={Home}/>
            </Route>
        </ReduxRouter>
    );
}

class Root extends React.Component {
    static propTypes = {
        application: PropTypes.object.isRequired
    };

    render() {
        return (
            <div>{getRootChildren(this.props)}</div>
        );
    }
}

export default connect(({ application }) => ({application}))(Root);
