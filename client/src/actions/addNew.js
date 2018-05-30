import axios from 'axios';
import {API_BASE_URL} from '../config';
import {reset} from 'redux-form';




export const sendEntry = (chat, socket) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    const userId = getState().auth.currentUser.id;
    return fetch(`${API_BASE_URL}/add`, {
        method: 'POST',
        body: JSON.stringify(chat),
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`,
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })
    .then((response) => {
        let body = chat.body;
        console.log("hippopotamus");
        socket.emit('message', body);
        dispatch(reset("add"));
      })
}