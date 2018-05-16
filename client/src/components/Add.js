import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import { add } from '../actions/auth';
import { testFetch } from '../actions/chat-data';
import { sendEntry } from '../actions/addNew';
import { refreshData } from '../actions/chat-data';
import io from 'socket.io-client'; 
import {API_BASE_URL} from '../config';
// import {required, nonEmpty} from '../validators';

export class Add extends React.Component {

    componentWillMount() {
        //this.props.dispatch(refreshData());
    }

    componentDidMount() {
       // this.props.dispatch(testFetch());
   
    }


    onSubmit(values) {
        console.log(this.props)
        let submission = {
            body: values.chat, 
            roomId: this.props.roomId           
        };
        console.log(submission);
        return this.props.dispatch(sendEntry(submission, this.props.socket));
    }

    render() {
        let error;
        if (this.props.error) {
            error = (
                <div className="form-error" aria-live="polite">
                    {this.props.error}
                </div>
            );
        }

        //if (!this.props.loggedIn) {
        //    return <Redirect to="/" />;
        //}

        return (
            /* <div className="chatter-input">
                    
                        <div className="text-input">
                            <textarea placeholder="Write your message....." />
                        </div>
                        <div className="actions">
                            <button className="post">Post</button>
                            
                        </div>
                </div>*/
            
            <form
                className="chat-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                {error}
                <br />
                <div className="chatter-input">
                <div className="text-input">          
                    <Field name="chat" component="textarea" type="textarea" placeholder="Enter new message....." />
                <br />
                </div>
                <div className="actions">
                <button className="post" disabled={this.props.pristine || this.props.submitting}>
                    Submit
                </button>
                </div>
                </div>
            </form>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        loggedIn: currentUser !== null,
        email: currentUser ? state.auth.currentUser.email : ''
    };
};

Add = connect(
    mapStateToProps
    )(Add);

export default reduxForm({
    form: 'add',
    onSubmitFail: (errors, dispatch) => dispatch(focus('add', 'email'))
})(Add);






