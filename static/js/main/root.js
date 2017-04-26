import React from 'react';
import Login from './login.js';

class Root extends React.Component {
  constructor(props, context) {
    super(props, context);
  };
  render() {
    return (
      <div>
        {!this.props.authenticated ? (
          <Login
            loginAuth={this.props.loginAuth}
            succesfulAuth={this.props.succesfulAuth}
          />
        ) : (
          <h1> Authenticated Successfully </h1>
        )}
      </div>
    );
  }
}

export default Root;
