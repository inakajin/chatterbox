import avatar from '../user-avatar.png';

import {
    FETCH_PROTECTED_DATA_SUCCESS,
    FETCH_PROTECTED_DATA_ERROR
} from '../actions/chat-data';

const initialState = {
    data: '',
    error: null,
    messages: addTestMessages()
};

 

export default function reducer(state = initialState, action) {

    


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
            newMsg.push(action.payload)
            console.log(newMsg)
            return {
                ...state,
                messages: newMsg
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