import React, { Component } from "react";
import { connect } from "react-redux";

import { FormGroup, ControlLabel, FormControl, Panel } from "react-bootstrap";
import Button from "react-bootstrap-button-loader";
import { authenticateUser } from "../actions/userActions";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUserAuthentication = this.handleUserAuthentication.bind(this);
  }

  handleUserNameChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  async handleUserAuthentication(e) {
    e.preventDefault();
    const { username, password } = this.state;
    await this.props.dispatch(authenticateUser(username, password));
    const {
      user: { authenticated, token },
      history
    } = this.props;
    if (token && authenticated) {
      history.push("/orders");
    }
  }

  render() {
    const { username, password } = this.state;
    const { user } = this.props;
    return (
      <Panel bsStyle="primary">
        <Panel.Heading>
          <Panel.Title componentClass="h3">Login</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <form onSubmit={this.handleUserAuthentication}>
            <FormGroup controlId="username">
              <ControlLabel>Username</ControlLabel>
              <FormControl
                type="text"
                placeholder="Enter text"
                value={username}
                onChange={this.handleUserNameChange}
              />
            </FormGroup>
            <FormGroup controlId="password">
              <ControlLabel>Password</ControlLabel>
              <FormControl
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={this.handlePasswordChange}
              />
            </FormGroup>
            {!user.loading && user.error && (
              <p className="errorText">{user.error}</p>
            )}
            <Button loading={user.loading} bsStyle="primary" type="submit">
              Sign In
            </Button>
          </form>
        </Panel.Body>
      </Panel>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(LoginPage);
