import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import { add } from '../actions/auth';
import { testFetch } from '../actions/chat-data';
import { sendEntry } from '../actions/addNew';
import { refreshData } from '../actions/chat-data';
// import {required, nonEmpty} from '../validators';

export class Add extends React.Component {

    componentWillMount() {
        this.props.dispatch(refreshData());
    }

    componentDidMount() {
       // this.props.dispatch(testFetch());
    }


    onSubmit(values) {
        let submission = {
            body: values.chat           
        };
        console.log(submission);
        return this.props.dispatch(sendEntry(submission));
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

        if (!this.props.loggedIn) {
            return <Redirect to="/" />;
        }

        return (
            <form
                className="login-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                {error}
                <br />
                
                
                  <label htmlFor="journal">Journal</label>
                  <br />
                    <Field name="chat" component="textarea" type="textarea" />
                <br />
                <button disabled={this.props.pristine || this.props.submitting}>
                    Submit
                </button>
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






