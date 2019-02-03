import React, { Component } from "react";
import Notifications from "react-notify-toast";

import "./App.css";

class AppLayout extends Component {
  render() {
    return (
      <div className="App">
        <Notifications />
        {this.props.children}
      </div>
    );
  }
}

export default AppLayout;
