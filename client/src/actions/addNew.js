import axios from 'axios';
import {API_BASE_URL} from '../config';
import {reset} from 'redux-form';




export const sendEntry = (chat, socket) => (dispatch, getState) => {
    //console.log(socket);
    const authToken = getState().auth.authToken;
    //console.log(authToken);
    //console.log(chat);
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
        //console.log(response);
        //console.log(chat);
        socket.emit('message', chat.body);
        dispatch(reset("add"));
      })
}