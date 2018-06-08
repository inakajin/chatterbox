import React from "react";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router-dom";
import HeaderBar from "./header-bar";
import FooterBar from "./footer-bar";
import LeftSideBar from "./left-sidebar";
import RightSideBar from "./right-sidebar";
import LandingPage from "./landing-page";
import Dashboard from "./dashboard";
import Add from "./Add";
import Chatter from "./chatter";
import RegistrationPage from "./registration-page";
import { refreshAuthToken } from "../actions/auth";
import { fetchChatData, refreshData } from "../actions/chat-data";
import io from "socket.io-client";
import { API_BASE_URL } from "../config";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null
    };
  }
  componentDidMount() {
    if (this.props.hasAuthToken) {
      // Try to get a fresh auth token if we had an existing one in
      // localStorage
      this.props.dispatch(refreshAuthToken());
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn && !this.props.loggedIn) {
      // When we are logged in, refresh the auth token periodically
      this.startPeriodicRefresh();
    } else if (!nextProps.loggedIn && this.props.loggedIn) {
      // Stop refreshing when we log out
      this.stopPeriodicRefresh();
    }
  }

  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()),
      60 * 60 * 1000 // One hour
    );
  }

  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
      return;
    }

    clearInterval(this.refreshInterval);
  }

  render() {
    return (
      <div className="app-chatter">
        <HeaderBar />
        <div className="main">
          {this.props.loggedIn ? (
            <div className="left-align">
              
              <LeftSideBar />
              <RightSideBar />
              <FooterBar />
            </div>
          ) : (
            ""
          )}

          <Route exact path="/" component={LandingPage} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/register" component={RegistrationPage} />
          <Route exact path="/add" component={Add} />
          <Route
            exact
            path="/room/:roomid"
            component={Chatter}
            socket={this.state.socket}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null
  };
};

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App));
