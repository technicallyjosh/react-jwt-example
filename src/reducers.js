import { combineReducers } from 'redux';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    USER
} from './actions';

const initState = {
    isLoggedIn: false
};

export function auth(state = initState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { isLoggedIn: false };
        case LOGIN_FAILURE:
            return { isLoggedIn: false };
        case LOGIN_SUCCESS:
            return { isLoggedIn: true };
        case LOGOUT:
            return { isLoggedIn: false };
        default:
            return state;
    }
}

export function user(state = {}, action) {
    switch (action.type) {
        case USER:
            return action.user;
        default:
            return state;
    }
}

export default combineReducers({
    auth,
    user
});
