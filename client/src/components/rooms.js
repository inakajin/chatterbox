import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import LeftSideBar from "./left-sidebar";

export class Rooms extends React.Component {
  // If we are logged in redirect straight to the user's dashboard
  render() {
    return (
      <div className="sidebar-left">
        <LeftSideBar />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Rooms);
