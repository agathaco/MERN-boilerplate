import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./components/layout/Nav";
import Landing from "./components/layout/Landing";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/layout/Dashboard";
import NotFound from './components/layout/NotFound';
import Profile from './components/profile/Profile';
import EditProfile from "./components/profile/EditProfile";
import PrivateRoute from "./components/routing/PrivateRoute";

import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    // window.addEventListener('storage', () => {
    //   if (!localStorage.token) store.dispatch({ type: LOGOUT });
    // });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <section className="container">
          <Alert/>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/" component={Landing} />
              <Route exact path="/profile/:id" component={Profile} />
              <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <Route component={NotFound} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
