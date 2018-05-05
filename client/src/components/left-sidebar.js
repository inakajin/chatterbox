import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {setCurrentUser, setAuthToken} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import {fetchRoomNames} from '../actions/left-sidebar';
import avatar from "../user-avatar.png";
export class LeftSideBar extends React.Component {
    componentDidMount () {
        console.log("camel")
        this.props.dispatch(fetchRoomNames(this.props));
    }

    render() {
        const roomnames = this.props.roomnames.map((room, i) => {
            return <li key={i} className="room-info">
                        <h2>{room.roomname}</h2>
                        <p>Hello......</p>
                        <Link to={{ pathname: `/room/${room._id}`, name:room.roomname }}>{room.roomname}</Link>
                    </li>
        })
        return (
            <div className="sidebar-left">
            Rooms
            <div className="rooms">
              {roomnames}              
            </div>
          </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    roomnames: state.chatData.rooms
});

export default connect(mapStateToProps)(LeftSideBar);
