import React from 'react';

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      username: null,
      password: null
    }
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };
  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }
  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }
  handleSubmit() {
    this.props.loginAuth(this.state, (function (status) {
      console.log(status);
      if (status.status_code === 200 && status.text === "Successful Authentication!") {
        this.props.succesfulAuth(status);
      }
    }).bind(this));
  }
  render() {
    return (
      <div>
        <div className="row" style={{paddingTop: '170px', marginBottom: 0}}>
          <div className="row">
            <div className="col s10 offset-s1 l6 offset-l3 center">
              <h2>Login to Laulima</h2>
            </div>
          </div>
          <form onSubmit={function() {return false;}} className="col s10 offset-s1 l6 offset-l3" style={{backgroundColor: '#f7f7f7', border: '1px solid #000', paddingTop: '12px'}} name="login" id="login">
            <div className="row" style={{borderRadius: '5px', border: '1px solid #000'}}>
              <div className="input-field col s12">
                <i className="material-icons prefix">account_circle</i>
                <input onChange={this.handleUsernameChange} name="username" id="username" type="text" className="validate" />
                <label htmlFor="username">User Name</label>
              </div>
            </div>
            <div className="row" style={{borderRadius: '5px', border: '1px solid #000'}}>
              <div className="input-field col s12">
                <i className="material-icons prefix">lock</i>
                <input onChange={this.handlePasswordChange} name="password" id="password" type="password" className="validate" />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div id="result"></div>
            <div className="row center-align">
              <button type="button" onClick={this.handleSubmit} className="btn waves-effect waves-light">
                Login
                <i className="material-icons right">send</i>
              </button>
           </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
