import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';
import io from 'socket.io-client'; 
const socket = io.connect(API_BASE_URL);

export const FETCH_PROTECTED_DATA_SUCCESS = 'FETCH_PROTECTED_DATA_SUCCESS';
export const fetchProtectedDataSuccess = data => ({
    type: FETCH_PROTECTED_DATA_SUCCESS,
    data
});

export const FETCH_PROTECTED_DATA_ERROR = 'FETCH_PROTECTED_DATA_ERROR';
export const fetchProtectedDataError = error => ({
    type: FETCH_PROTECTED_DATA_ERROR,
    error
});

export const fetchChatData = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/getchathistory`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({data}) => dispatch(fetchProtectedDataSuccess(data)))
        .catch(err => {
            dispatch(fetchProtectedDataError(err));
        });
};



export const refreshData = (time) => {
    return (dispatch) => {
      console.log('mango');
      socket.removeListener('new chat');
      socket.on('new chat', function(response) {
        console.log('peach');
        console.log(response);
        dispatch({
          type: 'REALTIME_REFRESH',
          payload: response,
          //time: time
        })
      });
    }
  }
