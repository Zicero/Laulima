import React from 'react';
import Nav from './nav/root.js';
import Main from './main/root.js';

class Root extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      authenticated: false,
      nav: []
    }
    this.loginAuth = this.loginAuth.bind(this);
    this.successfulAuth = this.succesfulAuth.bind(this);
  };
  succesfulAuth(status) {
    this.setState({nav: status.data.nav});
    this.setState({authenticated: true});
  }
  loginAuth(state, cb) {
    var formData = new FormData();
    formData.append('username', state.username);
    formData.append('password', state.password);
    var request = new XMLHttpRequest();
    request.open('POST', '/');
    request.onload = function () {
      cb(JSON.parse(this.responseText));
    }
    request.send(formData);
  };
  componentDidMount() {
    console.log(this.state);
  };
  render() {
    return (
      <div>
        <header>
          <Nav
            tabs={this.state.nav}
          />
        </header>
        <main>
          <Main
            authenticated={this.state.authenticated}
            loginAuth={this.loginAuth}
            succesfulAuth={this.successfulAuth}
          />
        </main>
        <footer>
        </footer>
      </div>
    );
  }
}

export default Root;
