import axios from 'axios';
//import * as io from 'socket.io-client'; 
//var socket = io('http://localhost:3000'); 
import {API_BASE_URL} from '../config';
import {reset} from 'redux-form';

//console.log(io);


//const socket = io.connect(API_BASE_URL);
//socket.emit('add chat', "squash");



export const sendEntry = (chat, socket) => (dispatch, getState) => {
    console.log(socket);
    const authToken = getState().auth.authToken;
    //const socket = io.connect(chat.roomId);
    //socket.emit('add chat', chat);
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
        console.log(chat);
        socket.emit('message', chat.body);
        dispatch(reset("add"));
        //let room = chat.roomId;
      //  socket.emit('add chat', chat);
      //this.props.resetForm();
      })
}