import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {setCurrentUser, setAuthToken} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import {fetchRoomNames} from '../actions/left-sidebar';
import avatar from "../user-avatar.png";
import moment from 'moment';
export class LeftSideBar extends React.Component {
    componentDidMount () {
        console.log("camel")
        this.props.dispatch(fetchRoomNames(this.props));
    }

    render() {
        const roomnames = this.props.roomnames.map((room, i) => {
            return <li key={i} className="room-info">
                    <Link to={{ pathname: `/room/${room._id}`, name:room.roomname }}>
                        <h2>{room.roomname}</h2>
                        <h4>Last updated: </h4>
                        <h4> 
                        {moment(room.lastUpdated).format('MMM Do, h:mm a')}  </h4>
                    </Link>    
                    </li>
                    
        })
        return (
            <div className="sidebar-left">
                <div className = "title">
                    <h2>Rooms</h2>
                </div>
            <ul className="rooms">
              {roomnames}              
            </ul>
          </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    roomnames: state.chatData.rooms
});

export default connect(mapStateToProps)(LeftSideBar);
