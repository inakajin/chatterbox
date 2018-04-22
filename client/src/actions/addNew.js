import axios from 'axios';
// import * as io from 'socket.io-client'; 
// var socket = io('http://localhost:3000'); 
import {API_BASE_URL} from '../config';
import io from 'socket.io-client'; 
console.log(io);


const socket = io.connect(API_BASE_URL);
socket.emit('add chat', "squash");


export const sendEntry = (chat) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    console.log(authToken);
    console.log(chat);
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
        console.log(response);
        socket.emit('add chat', chat);

      })
}