import React from 'react';
import Chatter from './chatter';
import refreshData from '../actions/socketlistener';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {fetchChatData} from '../actions/chat-data';
import Rooms from './rooms';

export class Dashboard extends React.Component {


    render() {
       //  Only visible to logged in users
        if (!this.props.loggedIn) {
            return <Redirect to="/" />;
        }
        
        return (
            
            <div className="dashboard">
                <br />
                <div className="dashboard-username">
                    <h2>Welcome, {this.props.username}.</h2>
                </div>
                
                <br />
                {/*<Link to="/add">Add Entry</Link>*/}
              
                
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
        username: currentUser ? state.auth.currentUser.username : '',
        chatData: state.chatData.data
    };
};

export default connect(mapStateToProps)(Dashboard);
