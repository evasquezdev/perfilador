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

const history = createBrowserHistory();

const App = ({
    auth
}) => (<BrowserRouter history={history}>{console.log(auth)}
    <Switch>
        {auth && auth.token ? 
        <>
            <Route path="/" render={(props) => <AdminLayout {...props} />} />
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
        auth: state
    }),
)(App);