import React from 'react';
import {Field, reduxForm, focus, reset} from 'redux-form';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import { add } from '../actions/auth';
import { testFetch } from '../actions/chat-data';
import { sendEntry } from '../actions/addNew';
import { refreshData } from '../actions/chat-data';
import io from 'socket.io-client'; 
import {API_BASE_URL} from '../config';


export class Add extends React.Component {

    onSubmit(values) {
        let submission = {
            body: values.chat, 
            roomId: this.props.roomId           
        };
       
        return this.props.dispatch(sendEntry(submission, this.props.socket));
        
    }

    handleKeyDown = function (e, cb) {
        if (e.key === 'Enter' && e.shiftKey === false) {
          e.preventDefault();
          cb();
        }
      };

    render() {
        let error;
        if (this.props.error) {
            error = (
                <div className="form-error" aria-live="polite">
                    {this.props.error}
                </div>
            );
            
        }
        const handleSubmit = this.props.handleSubmit(values =>
            this.onSubmit(values),

        );

        return (
            <div className="formwrapper">
            <form
                className="chat-form"
                onSubmit={handleSubmit}
                onKeyDown={(e) => { this.handleKeyDown(e, handleSubmit); }}>
                {error}
                <br />
                <div className="chatter-input">
                <div className="text-input">          
                    <Field name="chat" component="textarea" type="textarea" placeholder="Enter new message....." />
                <br />
                </div>
                <div className="actions">
                <button type="submit" className="post" disabled={this.props.pristine || this.props.submitting}>
                    Submit
                </button>
                </div>
                </div>
            </form>
            </div>
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






