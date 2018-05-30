//import avatar from '../user-avatar.png';

import {
    FETCH_PROTECTED_DATA_SUCCESS,
    FETCH_PROTECTED_DATA_ERROR
} from '../actions/chat-data';

const initialState = {
    data: '',
    error: null,
    rooms: [],
    messages: [],
    users: [],
    //hasfetched: false
};

export default function reducer(state = initialState, action) {
 
    switch (action.type) {
        case FETCH_PROTECTED_DATA_SUCCESS: {
           
            return {
                ...state,
                data: action.data,
                error: null,
                messages: action.data
            }
        }

        case FETCH_PROTECTED_DATA_ERROR: {
            return {
                ...state,
                error: action.error
            }
        }
        case 'REALTIME_REFRESH': {
            //console.log(action,state);
            //if(action.payload.userId!=state.currentUser.id)
           // {notifyMe(action.payload.message)}
            let newMsg = [...state.messages]
            newMsg.push({body: action.payload.message, username: action.payload.username, userId: action.payload.userId})
            console.log(newMsg)
            return {
                ...state,
                messages: newMsg,
            }
        }

        case 'REALTIME_USERS': {
            
            let activeusers = state.users.map((user)=>{
                if(action.payload.indexOf(user._id) > -1 ){
                     user['active'] = true;
                }
                return user;
             })
            
            return {
                ...state,
                users: activeusers
            }
        }

        case 'FETCH_ROOMNAMES': {
            console.log(action, state)
            return {
                ...state,
                rooms: action.data
            }
        }

        case 'FETCH_USERS': {
            console.log(action, state)
            return {
                ...state,
                users: action.data
            }
        }
        default: 
            return state;
    }
    
}


/*function addTestMessages(){
    let messages = [];
    for(let i = 0; i < 2; i++){

        let isMe = false;

        if(i % 2 === 0) {
            isMe = true;
        }

        const newMsg = {
            author: `Author ${i}`,
            body: `The body of message ${i}`,
            avatar: avatar,
            me: isMe, 
        }
        messages.push(newMsg);
    }
    console.log(messages)
    return messages;
}*/

/*function notifyMe(message) {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support system notifications");
    }
  
    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      var notification = new Notification(message);
    }
  
    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          var notification = new Notification(message);
        }
      });
    }
  
    // Finally, if the user has denied notifications and you 
    // want to be respectful there is no need to bother them any more.
  }

  notifyMe();*/