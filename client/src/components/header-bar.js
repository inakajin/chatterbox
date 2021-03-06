import React from "react";
import { connect } from "react-redux";
import { setCurrentUser, setAuthToken } from "../actions/auth";
import { clearAuthToken } from "../local-storage";
import { createRoom } from "../actions/rooms";
import { Link, Redirect } from "react-router-dom";
export class HeaderBar extends React.Component {
  logOut() {
    this.props.dispatch(setCurrentUser(null));
    this.props.dispatch(setAuthToken(null));
    clearAuthToken();
  }

  newroom = () => {
    let roomname = prompt("Enter Room Name", "default");
    if (roomname) {
      this.props.dispatch(createRoom(roomname));
    }
  };

  render() {
    let logOutButton;

    if (this.props.loggedIn) {
      logOutButton = <button onClick={() => this.logOut()}>Logout</button>;
    }

    // Only render the New Room button if we are logged in
    let newRoomButton;
    if (this.props.loggedIn) {
      newRoomButton = <button onClick={this.newroom}>New Room</button>;
    }

    return (
      <div className="header">
        <div className="left">
          <div className="actions">{newRoomButton}</div>
        </div>
        <div className="content">
          <h2>chatterBox</h2>
        </div>
        <div className="right">
          <div className="user-bar">
            <div className="profile-name">{logOutButton}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
