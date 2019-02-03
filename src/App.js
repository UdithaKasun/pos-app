import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  IndexRoute
} from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";
import AppLayout from "./App.Layout";
import OrderListPage from "./containers/OrderListPage.container";
import AddEditOrderPage from "./containers/AddEditOrderPage.container";
import LoginPage from "./containers/LoginPage.container";
import "./App.css";
import withAuthenticator from "./containers/AutheticatorHOC.container";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppLayout>
          <Router>
            <Switch>
              <Route exact path="/" component={withAuthenticator(LoginPage)} />
              <Route
                exact
                path="/login"
                component={withAuthenticator(LoginPage)}
              />
              <Route
                exact
                path="/orders"
                component={withAuthenticator(OrderListPage)}
              />
              <Route
                path="/orders/:id"
                component={withAuthenticator(AddEditOrderPage)}
              />
              <Route exact path="*" component={withAuthenticator(LoginPage)} />
            </Switch>
          </Router>
        </AppLayout>
      </Provider>
    );
  }
}

export default App;
