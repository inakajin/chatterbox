import React from 'react';
import {connect} from 'react-redux';
import {setCurrentUser, setAuthToken} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import avatar from "../user-avatar.png";
import linkedin from '../public/img/linkedin.png';
import facebook from '../public/img/facebook-icon.png';
import googleplus from '../public/img/googleplusicon.png';
import gmail from '../public/img/gmail.png';
import github from '../public/img/github.png';


export class FooterBar extends React.Component {
    logOut() {
        this.props.dispatch(setCurrentUser(null));
        this.props.dispatch(setAuthToken(null));
        clearAuthToken();
    }

    render() {
        
        return (
            <footer className="footercontainer">
                <div className="footertext">
                <p>Created by Mike Dickerson.</p>
                </div>
                <div className="footericons">		
                    <ul className="social-links">
                         <li className="social-list">
                            <a href="https://www.linkedin.com/in/mikeadickerson/" target="_blank" aria-label="This is a link Mike Dickerson's linkedin profile">
                            <img className="social-images" src={linkedin} alt="linkedin logo" />
                            </a>
                        </li>
                        <li className="social-list">
                            <a href="https://www.facebook.com/mike.dickerson.1422" target="_blank" aria-label="This is a link Mike Dickerson's Facebook profile">
                            <img className="social-images" src={facebook} alt="facebook logo" />
                        </a>
                        </li>
                        <li className="social-list">
                            <a href="https://plus.google.com/u/1/112774374102749420649?pageId=none" target="_blank" aria-label="This is a link Mike Dickerson's Google Plus Profile">
                            <img className="social-images" src={googleplus} alt="google plus logo" />
                        </a>
                        </li>
                        <li className="social-list">
                            <a href="mailto:inakajin@gmail.com" target="_top" aria-label="This is a link that open an email to Mike Dickerson">
                            <img className="social-images" src={gmail} alt="gmail logo" />
                            </a>
                        </li>
                        <li className="social-list">
                            <a href="https://github.com/inakajin" target="_blank" aria-label="This is a link to Mike Dickerson's GitHub page">
                            <img className="social-images" src={github} alt="github logo" />
                        </a>
                        </li>
                    </ul>
                </div>
            </footer>

                
           
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(FooterBar);
