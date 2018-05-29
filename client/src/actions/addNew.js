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
        console.log(getState())
        console.log(chat);
        let body = chat.body;
        
//        body['userId'] = userId;
        console.log(body);
        socket.emit('message', body);
        dispatch(reset("add"));
      })
}