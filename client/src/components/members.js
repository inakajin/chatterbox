import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import RightSideBar from './right-sidebar';

export class Members extends React.Component {
    componentDidMount() {
        console.log("members");
    }
    // If we are logged in redirect straight to the user's dashboard
    render(){
    return (
        <div className="sidebar-right">
            <RightSideBar />
        </div>
    )};
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Members);
