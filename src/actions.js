import { checkHttpStatus } from './utils';
import jwtDecode from 'jwt-decode';

export const LOGIN_REQUEST     = 'LOGIN_REQUEST';
export const LOGIN             = 'LOGIN';
export const LOGIN_SUCCESS     = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE     = 'LOGIN_FAILURE';
export const LOGOUT            = 'LOGOUT';
export const USER              = 'USER';
export const REMOVE_USER       = 'REMOVE_USER';
export const USER_ROLES        = 'USER_ROLES';
export const REMOVE_USER_ROLES = 'REMOVE_USER_ROLES';

function loginRequest() {
    return { type: LOGIN_REQUEST };
}

function loginFailure(response) {
    localStorage.removeItem('token');

    return {
        type: LOGIN_FAILURE,
        payload: {
            status: response.status,
            statusText: response.statusText
        }
    };
}

function loginSuccess(token) {
    localStorage.setItem('token', token);

    return {
        type: LOGIN_SUCCESS,
        token
    };
}

export function logout() {
    return { type: LOGOUT };
}

export function login(username, password) {
    return dispatch => {
        dispatch(loginRequest());

        return fetch('http://localhost:3000/auth', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(res => checkHttpStatus(res, true))
        .then(res => res.json())
        .then(res => {
            dispatch(loginSuccess(res.token));
            dispatch(getUser());
            return res;
        })
        .catch(error => {
            dispatch(loginFailure(error));
            throw error;
        });
    };
}

export function getRoles() {
    const user = jwtDecode(localStorage.getItem('token'));
    const roles = user.wmEmployee.roles;

    return {
        type: USER_ROLES,
        roles
    };
}

export function getUser() {
    const user = jwtDecode(localStorage.getItem('token'));

    return {
        type: USER,
        user
    };
}
