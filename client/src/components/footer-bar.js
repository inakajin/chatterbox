import React from "react";
import { connect } from "react-redux";
import { setCurrentUser, setAuthToken } from "../actions/auth";
import { clearAuthToken } from "../local-storage";
import linkedin from "../public/img/linkedin.png";
import gmail from "../public/img/gmail.png";
import github from "../public/img/github.png";
import Add from "./Add";

export class FooterBar extends React.Component {
  logOut() {
    this.props.dispatch(setCurrentUser(null));
    this.props.dispatch(setAuthToken(null));
    clearAuthToken();
  }

  render() {
    return (
      <footer className="footercontainer">
        <div className="left">
          <div className="footertext">
            <p>Created by Mike Dickerson.</p>
          </div>
          <div className="footericons">
            <ul className="social-links">
            <a
                  href="https://www.linkedin.com/in/mikeadickerson/"
                  target="_blank"
                  aria-label="This is a link Mike Dickerson's linkedin profile"
                >
              <li className="social-list fab fa-linkedin">
                
                
              </li>
              </a>
              <a
                  href="mailto:inakajin@gmail.com"
                  target="_top"
                  aria-label="This is a link that open an email to Mike Dickerson"
                >
              <li className="social-list fas fa-envelope-open">                
              </li>
              </a>
              <a
                  href="https://github.com/inakajin"
                  target="_blank"
                  aria-label="This is a link to Mike Dickerson's GitHub page"
                >
              <li className="social-list fa fa-github">
                
              </li>  
              </a>
              
            </ul>
          </div>
        </div>
      </footer>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(FooterBar);
