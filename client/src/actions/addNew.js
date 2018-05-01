import axios from 'axios';
// import * as io from 'socket.io-client'; 
// var socket = io('http://localhost:3000'); 
import {API_BASE_URL} from '../config';
import io from 'socket.io-client'; 
console.log(io);


//const socket = io.connect(API_BASE_URL);
//socket.emit('add chat', "squash");

// set-up a connection between the client and the server
var socket = io.connect(API_BASE_URL);

// let's assume that the client page, once rendered, knows what room it wants to join
var room = "5ae7b822c79b45cae0d449ee";

socket.on('connect', function() {
   // Connected, let's sign-up for to receive messages for this room
   socket.emit('room', room);
});

socket.on('message', function(data) {
   console.log('Incoming message:', data);
});

export const sendEntry = (chat) => (dispatch, getState) => {
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
        //let room = chat.roomId;
      //  socket.emit('add chat', chat);

      })
}