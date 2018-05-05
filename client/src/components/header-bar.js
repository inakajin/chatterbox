import React from 'react';
import {connect} from 'react-redux';
import {setCurrentUser, setAuthToken} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import avatar from "../user-avatar.png";
export class HeaderBar extends React.Component {
    logOut() {
        this.props.dispatch(setCurrentUser(null));
        this.props.dispatch(setAuthToken(null));
        clearAuthToken();
    }

    render() {
        // Only render the log out button if we are logged in
        let logOutButton;
        if (this.props.loggedIn) {
            logOutButton = (
                <button onClick={() => this.logOut()}>Log out</button>
            );
        }
        return (
            <div className="header">
                <h1>chatterBox</h1>
                
          <div className="left">
            <div className="actions">
              <button onClick={this.newroom}>New Room</button>
            </div>
          </div>
          <div className="content">
            <h2>Title</h2>
          </div>
          <div className="right">
            <div className="user-bar">
              <div className="profile-name">Mike</div>
              <div className="profile-image">
                <img src={avatar} alt="" />
              </div>
            </div>
          </div>
          {logOutButton}
        </div>
                
           
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
