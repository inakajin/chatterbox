import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {setCurrentUser, setAuthToken} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import {fetchRoomNames} from '../actions/left-sidebar';
//import avatar from "../user-avatar.png";
import {getUsers, refreshUserData} from "../actions/right-sidebar";
import moment from 'moment';
import io from "socket.io-client";
import { API_BASE_URL } from "../config";
import classNames from "classnames";


//let users = [];
export class RightSideBar extends React.Component {
    componentDidMount () {
        console.log("camel")
        this.props.dispatch(getUsers());
        var socket = io.connect(API_BASE_URL);
        this.props.dispatch(refreshUserData(socket));
    }

    render() {
        console.log(this.props);
        const members = this.props.users.map((user, i) => {
           console.log(user);

        
          
            return <li key={i} className={"member-info " + (user.active ? 'online' : 'offline')}>                   
                        <h2>{user.username}<div className={`circle ${
                            user.active ? "circle--online" : "circle--offline"
                          }`}></div>
                          </h2>
                        <h4>Joined: {moment(user.joined).format("MMM Do YY")}</h4>               
                    </li>
        })
        return (
            <div className="sidebar-right">
            <div className="title">
                <h2>Members Online</h2>
            </div>
            <ul className="members">
            {members}
            </ul>
            </div>
        )
       
        
    }
}

{/*const mapStateToProps = state => ({
    
    loggedIn: state.auth.currentUser !== null,
    roomnames: state.chatData.rooms,
    email: currentUser ? state.auth.currentUser.email : '',
    username: currentUser ? state.auth.currentUser.username : '',
    chatData: state.chatData.data
});*/}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    //console.log(currentUser);
    return {
        loggedIn: currentUser !== null,
        email: currentUser ? state.auth.currentUser.email : '',
        username: currentUser ? state.auth.currentUser.username : '',
        chatData: state.chatData.data,
        users: state.chatData.users
    };
};

export default connect(mapStateToProps)(RightSideBar);
