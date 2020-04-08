import React from "react";

class Login extends React.Component {
  toggleLogin(){
    if (this.props.loggedin){
      return (
        <div className="user-panel">
          <p>Logged in as {this.props.username}</p>
          <button name="logout" onClick={this.props.logout}>Log Out</button>
        </div>
      )
    } else {
      return (
        <div className="login-form">
          <input
            type="text"
            name="userName"
            placeholder="Username"
            className="login-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="login-input"
          />
          <button className="login-button" name="login" onClick={this.props.login}>Login</button>
          {/* <button name="register" onClick={this.props.register}>Register</button> */}
        </div>
      )
    }
  }

  render() {
    return (
      <div className="login-container">
        <div className="message"></div>
        {this.toggleLogin()}
      </div>
    );
  }
}

export default Login;
