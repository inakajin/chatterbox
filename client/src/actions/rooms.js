import axios from 'axios';
// import * as io from 'socket.io-client'; 
// var socket = io('http://localhost:3000'); 
import {API_BASE_URL} from '../config';
import io from 'socket.io-client'; 
import { error } from 'util';
console.log(io);


const socket = io.connect(API_BASE_URL);
//socket.emit('add chat', "squash");


export const createRoom = (roomname) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    console.log(authToken);
    console.log(roomname);
    return fetch(`${API_BASE_URL}/addroom`, {
        method: 'POST',
        body: JSON.stringify({roomname:roomname}),
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`,
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then((response) => {
        console.log(response);
        console.log(this);
        console.log(getState());

        window.location.href =`/room/${response.data._id}`
        //socket.emit('add chat', chat);

      })
      .catch(err => {
        throw err;
    });
}