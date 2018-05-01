import React, {Component} from 'react';
import classNames from 'classnames';
import avatar from '../user-avatar.png';
import Add from './Add';
import {createRoom} from '../actions/rooms'
import {connect} from 'react-redux';
import {fetchChatData} from '../actions/chat-data';
console.log(avatar);
class Chatter extends Component {
    constructor(props){
        super(props);
        this.state = {
            height: window.innerHeight,
            //messages: [],
        }
        this._onResize = this._onResize.bind(this);

        //this.addTestMessages = this.addTestMessages.bind(this);
    }

    _onResize(){
        this.setState({
            height: window.innerHeight
        });
        console.log("window is resizing");
    }

    componentDidMount(){
        console.log("component did mount");
        window.addEventListener('resize', this._onResize)
        //this.addTestMessages();
        this.props.dispatch(fetchChatData(this.props.match.params.roomid));
        
    }

    newroom = ()=> {
      let roomname = prompt ("Enter Room Name", "default")
      console.log(roomname)
      this.props.dispatch(createRoom(roomname));
    }
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


    componentWillUnmount(){
        window.removeEventListener('resize', this._onResize);
       
        console.log("component will unmount");
    }
    render(){
        console.log(this)
        const {height} = this.state;
        const {messages} = this.props;
        const style= {
            height: height,
        }
        console.log(messages);
        return (
            <div style={style} className="app-chatter">
              <div className="header">

                <div className="left">
                
                    <div className="actions">
                        <button onClick={this.newroom}>New Room</button>

                    </div>
                </div>
                <div className="content"><h2>Title</h2></div>
                <div className="right">
                
                    <div className="user-bar">
                        <div className="profile-name">Mike</div>
                        <div className="profile-image"><img src={avatar} alt="" /></div>
                    </div>
                </div>
              </div>
              <div className="main">
                <div className="sidebar-left">Left sidebar
                
                    <div className="rooms">
                        
                        <div className="room">
                            <div className="user-image">
                                <img src={avatar} alt="" />
                            </div> 
                            <div className="room-info">
                                <h2>Mike</h2>
                                <p>Hello......</p>
                            </div>
                        </div>

                        <div className="room">
                            <div className="user-image">
                                <img src={avatar} alt="" />
                            </div> 
                            <div className="room-info">
                                <h2>Mike</h2>
                                <p>Hello......</p>
                            </div>
                        </div>



                    </div>

                </div>
                <div className="content">

                    <div className="messages">

                    {messages.map((message, index) => {
                        return (
                            <div key={index} className={classNames('message', {'me': message.me})}>
                            <div className="message-user-image">
                                <img src={message.avatar} alt="" />
                            </div>
                            <div className="message-body">
                                <div className="message-author">{message.me ? 'You ' : message.author} say:</div>
                                <div className="message-text">
                                    <p>
                                    {message.body}
                                    </p>
                                </div>
                            </div>
                        </div>
                        )
                    })}
                        

                        
                    </div>
                    <Add roomId={this.props.match.params.roomid} />
                   {/* <div className="chatter-input">
                    
                        <div className="text-input">
                            <textarea placeholder="Write your message....." />
                        </div>
                        <div className="actions">
                            <button className="post">Post</button>
                            
                        </div>
                </div>*/}
                </div>
                <div className="sidebar-right">Right sidebar
                    <h2 className="title">Members</h2>
                    <div className="members">
                        
                        <div className="member">
                            <div className="user-image">
                                <img src={avatar} alt="" />
                            </div> 
                            <div className="member-info">
                                <h2>Mike</h2>
                                <p>Joined: 3 days ago.</p>
                            </div>
                        </div>

                        <div className="member">
                            <div className="user-image">
                                <img src={avatar} alt="" />
                            </div> 
                            <div className="member-info">
                                <h2>Mike</h2>
                                <p>Joined: 3 days ago.</p>
                            </div>
                        </div>
                    </div>
                
                
                </div>
              </div>            
            </div>
        )
    }
}

const mapStateToProps = state => {
    //const {currentUser} = state.auth;
    //console.log(currentUser);
    return {
        //loggedIn: currentUser !== null,
        //email: currentUser ? state.auth.currentUser.email : '',
        messages: state.chatData.messages
    };
};

export default connect(mapStateToProps)(Chatter);