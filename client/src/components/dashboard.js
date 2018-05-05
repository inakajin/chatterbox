import React from 'react';
import Chatter from './chatter';
import refreshData from '../actions/socketlistener';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {fetchChatData} from '../actions/chat-data';
import Rooms from './rooms';

export class Dashboard extends React.Component {
    componentDidMount() {
        if (!this.props.loggedIn) {
            return;
        }
        //this.props.dispatch(fetchChatData(this.props));
        console.log("hello");
    }

    render() {
        // Only visible to logged in users
        //if (!this.props.loggedIn) {
       //     return <Redirect to="/" />;
       // }
        
        return (
            
            <div className="dashboard">
                <br />
                <div className="dashboard-username">
                    Email: {this.props.email}
                </div>
                <div className="dashboard-protected-data">
                    Protected data: {this.props.chatData}
                </div>
                <br />
                {/*<Link to="/add">Add Entry</Link>*/}
              
                <Rooms />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    console.log(currentUser);
    return {
        loggedIn: currentUser !== null,
        email: currentUser ? state.auth.currentUser.email : '',
        chatData: state.chatData.data
    };
};

export default connect(mapStateToProps)(Dashboard);
