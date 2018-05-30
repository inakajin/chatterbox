import React, { Component } from "react";
import classNames from "classnames";
//import avatar from "../user-avatar.png";
import Add from "./Add";
import {Link, Redirect} from 'react-router-dom';
//import { createRoom } from "../actions/rooms";
import Rooms from './rooms';
import Members from './members';
import { connect } from "react-redux";
import { fetchChatData, refreshData } from "../actions/chat-data";
import io from "socket.io-client";
import { API_BASE_URL } from "../config";
//import FooterBar from './footer-bar';


class Chatter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: window.innerHeight,
      socket: null
    };
    this._onResize = this._onResize.bind(this);
  }

  _onResize() {
    this.setState({
      height: window.innerHeight
    });
    console.log("window is resizing");
  }

  componentWillUpdate() {
  console.log("componentWillUpdate");
  }

  componentWillReceiveProps(props) { 
    if(!this.props.loggedIn){ return }
    var socket = io.connect(API_BASE_URL);
      socket.emit("active", this.props.currentUser.id) 
      if(props.location.pathname !== this.props.location.pathname) {
          this.props.dispatch(fetchChatData(props.match.params.roomid))
        }
    }

  componentDidMount() {
    // set-up a connection between the client and the server
    if(!this.props.loggedIn){ return }
    var socket = io.connect(API_BASE_URL);
    
    // let's assume that the client page, once rendered, knows what room it wants to join
    var room = this.props.match.params.roomid;
    var user = this.props;
    socket.on("connect", function() {
    // Connected, let's sign-up for to receive messages for this room
      socket.emit("room", {room: room, user: user});      
    });
     //console.log(this.props.loggedIn)
    // if (this.props.loggedIn) {
      this.props.dispatch(refreshData(socket));
    //}
    this.setState({socket:socket})
    window.addEventListener("resize", this._onResize);
    this.props.dispatch(fetchChatData(this.props.match.params.roomid))    
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._onResize);
    console.log("component will unmount");
  }

  componentDidUpdate() {
      console.log("Component did update", this.props, this.state)
  }

  connectUserSocket = () => {
      var room = this.props.match.params.roomid;
      var user = this.props.currentUser;
      var socket = this.state.socket;
      
  }
  render() {
    console.log(this.props);
    if (!this.props.loggedIn) {
      return <Redirect to="/" />;
   }
  console.log("cumin", this.props.loggedIn);
    const { height } = this.state;
    const { messages } = this.props;
    const style = {
      height: height
    };
    console.log(messages);
    return (
        
     <div className="content">            
            <div className="messages">
              {messages.map((message, index) => {
                return (
                  <div
                    key={index}
                    className={"message " + (this.props.currentUser.id == message.userId ? 'me' : '')}
                    >
                    
                    <div className="message-body">
                      <div className="message-author">
                        {message.username} says:
                      </div>
                      <div className="message-text">
                        <p>{message.body}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            
          </div>
          <Add roomId={this.props.match.params.roomid} socket={this.state.socket} />
            
          </div>
    );
  }
}

const mapStateToProps = state => {
  const {currentUser} = state.auth;
  return {
    loggedIn: currentUser !== null,
    email: currentUser ? state.auth.currentUser.email : '',
    messages: state.chatData.messages,
    currentUser: currentUser
  };
};

export default connect(mapStateToProps)(Chatter);
