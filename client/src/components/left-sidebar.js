import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {setCurrentUser, setAuthToken} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import {fetchRoomNames} from '../actions/left-sidebar';
import avatar from "../user-avatar.png";
import moment from 'moment';
//import {getUsers} from "../actions/right-sidebar";
//import { getUsers } from '../../../server/controllers/users';
export class LeftSideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {activeroom: null};
      }
    componentDidMount () {
        console.log("camel")
        this.props.dispatch(fetchRoomNames(this.props));
    }
    selectedItem = (activeroom) => {
        console.log(activeroom)
        this.setState({activeroom: activeroom})
    }
    render() {
        const roomnames = this.props.roomnames.map((room, i) => {
            console.log(this, window.location)
            let pathy = window.location.pathname;
            console.log(pathy);
            return <li key={i} className={"room-info "+ (this.state.activeroom == `/room/${room._id}` ? 'active' : 'inactive')} onClick={()=>this.selectedItem(window.location.pathname)}>
                    <Link to={{ pathname: `/room/${room._id}`, name:room.roomname }}>
                        <h2>{room.roomname}</h2>
                        <h4>Last updated: </h4>
                        <h4>{this.state.activeroom + "taco" +  room._id}</h4>
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
