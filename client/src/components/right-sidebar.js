import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {setCurrentUser, setAuthToken} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import {fetchRoomNames} from '../actions/left-sidebar';
import avatar from "../user-avatar.png";
export class RightSideBar extends React.Component {
    //componentDidMount () {
    //    console.log("camel")
    //    this.props.dispatch(fetchRoomNames(this.props));
    //}

    render() {
       // const roomnames = this.props.roomnames.map((room, i) => {
       //     return <li key={i} className="room-info">
       //             <Link to={{ pathname: `/room/${room._id}`, name:room.roomname }}>
       //                 <h2>{room.roomname}</h2>
       //             </Link>
       //                 
       //             </li>
       // })
        return (
            <div className="sidebar-right">
            <div className="title">
                <h2>Members Online</h2>
            </div>
            <div className="members">
              <div className="member">
                
                <div className="member-info">
                  <h2>Mike</h2>
                  <p>Joined: 3 days ago.</p>
                </div>
              </div>

              <div className="member">
                
                <div className="member-info">
                  <h2>Mike</h2>
                  <p>Joined: 3 days ago.</p>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    roomnames: state.chatData.rooms
});

export default connect(mapStateToProps)(RightSideBar);
