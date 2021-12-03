import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';

import AuthLayout from "layouts/Auth/Auth.js";
import AdminLayout from "layouts/Admin/Admin.js";

import "assets/css/nucleo-icons.css";
import "react-notification-alert/dist/animate.css";
import "assets/scss/black-dashboard-pro-react.scss?v=1.2.0";
import "assets/demo/demo.css";

import * as selector from './_reducers';
//import * as loginActions from './_actions/login';

const history = createBrowserHistory();

const App = ({
    token,
    user
}) => (<BrowserRouter history={history}>
    <Switch>
        {token ? 
        <>
            <Route path="/" render={(props) => <AdminLayout {...props} user={user} />} />
        </> :
        <>
            <Route path="/" render={(props) => <AuthLayout {...props} />} />
            <Redirect from="/" to="/auth/login" />
        </>
        }
    </Switch>
</BrowserRouter>);

export default connect(
    (state) => ({
        token: selector.getUserToken(state),
        user : selector.getUserCompany(state)
    }),
    (dispatch) => ({
    })
)(App);