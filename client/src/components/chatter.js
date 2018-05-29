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
      //messages: [],
    };
    this._onResize = this._onResize.bind(this);
    //this.renderRoomname = this.renderRoomname.bind(this)
    //this.renderRoomAvatars = this.renderRoomAvatars.bind(this);
    //this.addTestMessages = this.addTestMessages.bind(this);
  }

  _onResize() {
    this.setState({
      height: window.innerHeight
    });
    console.log("window is resizing");
  }

  componentWillUpdate() {
  console.log("componentWillUpdate");
  //this.props.dispatch(fetchChatData(this.props.match.params.roomid));
  }

  componentWillReceiveProps(props) { 
    var socket = io.connect(API_BASE_URL);
    //var socket = this.props.socket; 
      //console.log('componentWillReceiveProps')
      //console.log(this.props)
      socket.emit("active", this.props.currentUser.id) 
      //console.log(props.location.pathname, this.props.location.pathname);
      if(props.location.pathname !== this.props.location.pathname) {
          this.props.dispatch(fetchChatData(props.match.params.roomid))
        //    console.log(this.props)
        }
      //this.props.dispatch(fetchChatData(this.props.match.params.roomid));
    }

  componentDidMount() {
    // set-up a connection between the client and the server
    //debugger
    var socket = io.connect(API_BASE_URL);
    //var socket = this.props.socket; 
    console.log(this.props);
    //console.log("componentWillMount");
    // let's assume that the client page, once rendered, knows what room it wants to join
    var room = this.props.match.params.roomid;
    var user = this.props;
    //console.log(this.props);
    socket.on("connect", function() {
    //console.log(this.props);
    // Connected, let's sign-up for to receive messages for this room
    //if (this.props){
      socket.emit("room", {room: room, user: user});
      //}
      
    });

    socket.on("message", function(data) {
      console.log("Incoming message:", data);
    });

    /*socket.on("userid", function(data) {
        console.log("Incoming userid", data);
      });

    socket.on("user", function(data) {
        console.log("Incoming message:", data);
      });*/
     
    this.props.dispatch(refreshData(socket));

    this.setState({socket:socket})
    //console.log(this);
  //}
  //componentDidMount() {
    //console.log("component did mount", this.props, this.state);
    window.addEventListener("resize", this._onResize);
    this.props.dispatch(fetchChatData(this.props.match.params.roomid))    
  }

 // newroom = () => {
 //   let roomname = prompt("Enter Room Name", "default");
 //   console.log(roomname);
//    this.props.dispatch(createRoom(roomname));
 // };
  /*   addTestMessages(){
        let {messages} = this.state;
        for(let i = 0; i < 2; i++){

            let isMe = false;

            if(i % 2 === 0) {
                isMe = true;
            }

            const newMsg = {
                author: `Author ${i}`,
                body: `The body of message ${i}`,
                avatar: avatar,
                me: isMe, 
            }
            messages.push(newMsg);
        }
        this.setState({messages: messages})
    }
*/

  componentWillUnmount() {
    window.removeEventListener("resize", this._onResize);

    console.log("component will unmount");
  }

  componentDidUpdate() {
      console.log("Component did update", this.props, this.state)
      //debugger
  }

  connectUserSocket = () => {
      //console.log(this.props)
      var room = this.props.match.params.roomid;
      var user = this.props.currentUser;
      var socket = this.state.socket;
      
  }
  render() {
    console.log(this.props);
    if (!this.props.loggedIn) {
      return <Redirect to="/" />;
  }
 //   this.connectUserSocket();
    const { height } = this.state;
    const { messages } = this.props;
    const style = {
      height: height
    };
    console.log(messages);
    return (
     // <div style={style} className="app-chatter">
        
     <div className="content">
          
          {/*<Rooms />*/}
          
            
            <div className="messages">
              {messages.map((message, index) => {
                return (
                  <div
                    key={index}
                    //className={classNames("message", { me: message.me })}
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
            
            
            {/*<Add roomId={this.props.match.params.roomid} socket={this.state.socket} />*/}
            
          </div>
          {/*<Members />*/}
          <Add roomId={this.props.match.params.roomid} socket={this.state.socket} />
            
          </div>
    //  </div>
    );
  }
}

const mapStateToProps = state => {
  const {currentUser} = state.auth;
  //console.log(currentUser);
  return {
    loggedIn: currentUser !== null,
    email: currentUser ? state.auth.currentUser.email : '',
    messages: state.chatData.messages,
    currentUser: currentUser
  };
};

export default connect(mapStateToProps)(Chatter);
