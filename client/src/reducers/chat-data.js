import avatar from '../user-avatar.png';

import {
    FETCH_PROTECTED_DATA_SUCCESS,
    FETCH_PROTECTED_DATA_ERROR
} from '../actions/chat-data';

const initialState = {
    data: '',
    error: null,
    rooms: [],
    messages: [],
    users: []
};

export default function reducer(state = initialState, action) {
    console.log(action.type);
    switch (action.type) {
        case FETCH_PROTECTED_DATA_SUCCESS: {
            console.log(action, state)
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
            console.log(action, state)
            let newMsg = [...state.messages]
            newMsg.push({body: action.payload})
            console.log(newMsg)
            return {
                ...state,
                messages: newMsg
            }
        }

        case 'REALTIME_USERS': {
            console.log(action, state)
            let activeusers = state.users.map((user)=>{
                if(action.payload.indexOf(user._id) > -1 ){
                     user['active'] = true;
                }
                return user;
             })
             console.log(activeusers)
            //var arr = state.users.filter(function(item){
            //    return action.payload.indexOf(item.id) === -1;
            //  });
            return {
                ...state,
                users: activeusers
            }
        }

        //case @@redux-form/SET_SUBMIT_SUCCEEDED

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


function addTestMessages(){
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
}