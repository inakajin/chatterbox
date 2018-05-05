import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';


export class Rooms extends React.Component {
    componentDidMount() {
        console.log("rooms");
    }
    // If we are logged in redirect straight to the user's dashboard
    render(){
    return (
        <div className="home">
            <h2>Welcome to Rooms</h2>
        </div>
    )};
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Rooms);
