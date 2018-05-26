import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';


export const FETCH_PROTECTED_DATA_SUCCESS = 'FETCH_PROTECTED_DATA_SUCCESS';
export const fetchProtectedDataSuccess = data => ({
    type: 'FETCH_USERS',
    data
});

export const FETCH_PROTECTED_DATA_ERROR = 'FETCH_PROTECTED_DATA_ERROR';
export const fetchProtectedDataError = error => ({
    type: FETCH_PROTECTED_DATA_ERROR,
    error
});

export const getUsers = () => (dispatch, getState) => {
    console.log(getState());

    return fetch(`${API_BASE_URL}/getusers`, {
        method: 'GET'
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({data}) => dispatch(fetchProtectedDataSuccess(data)))
        .catch(err => {
            dispatch(fetchProtectedDataError(err));
        });
};

export const refreshUserData = (socket) => {
    return (dispatch) => {
      //console.log('mango');
      socket.removeListener('activeusers');
      socket.on('activeusers', function(response) {
        //console.log('peach');
        //console.log(response);
        dispatch({
          type: 'REALTIME_USERS',
          payload: response,
        })
      });
    }
  }

export const refreshData = (socket) => {
    return (dispatch) => {
      //console.log('mango');
      socket.removeListener('message');
      socket.on('message', function(response) {
        //console.log('peach');
        //console.log(response);
        dispatch({
          type: 'REALTIME_REFRESH',
          payload: response
        })
      });
    }
  }
