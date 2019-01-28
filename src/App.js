import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from './store'
import OrderListPage from './containers/OrderListPage.container';
import AddEditOrderPage from './containers/AddEditOrderPage.container';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div className="App" >
      <Router>
      <Switch>
      <Route exact path="/orders" component={OrderListPage}/>
      <Route path="/orders/:id" component={AddEditOrderPage}/>
    </Switch>
    </Router>
      </div>
      </Provider>
    );
  }
}

export default App;
