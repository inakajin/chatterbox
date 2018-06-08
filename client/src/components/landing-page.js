import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import LoginForm from "./login-form";

export function LandingPage(props) {
  // If we are logged in redirect straight to the user's dashboard
  if (props.loggedIn) {
    return <Redirect to="/room/5b1729ecf7f53c00147f9b52" />;
  }

  return (
    <div className="home">
      <h2>Welcome to chatterBox</h2>
      <p>Create a room and chat with your friends.</p>
      <LoginForm />
      <Link to="/register">Register</Link>
      <div className="demo">
        <p>Demo accounts:</p>
        <p>user1@test.com:user1</p>
        <p>user2@test.com:user2</p>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
