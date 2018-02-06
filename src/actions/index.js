import firebase from 'firebase';  
import { FIREBASE_CONFIG } from './config';

export const API_ROOT = 'https://us-central1-mazdis-sabps.cloudfunctions.net/api';

export const ENDPOINTS = {
    currUser: `${API_ROOT}/users/current-user`,
};

export var firebase_app = firebase.initializeApp(FIREBASE_CONFIG);
export var firebase_db = firebase.database();

export default firebase_app;

export function getAuth(auth) {
    if (auth){
        return firebase_app.auth().currentUser.getIdToken(true);
    } else {
        return Promise.resolve('');
    }
}

export function createDispatcherForGet(url, {actionLabel, successLabel, invalidLabel, failureLabel }, options = {}){
    const { auth, responseJsonFunc, headers } = options;
    let reqHeaders = {
        Accept: 'application/json',
        ...headers,
    };

    return (dispatch) => {
        dispatch({type: actionLabel});
        getAuth(auth)
            .then((token) => {
                if (token) {
                    reqHeaders.Authorization = `Bearer ${token}`;
                }
                return fetch(url, {
                    method: 'GET',
                    headers: reqHeaders,
                });
            }).then((response) => {            
                if(response.status == 200 || response.status == 500){
                // TODO: api currently returns HTTP 500 for invalid registration, should be changed to 4xx.
                    return response.json();
                } else { // Reserved for offline or unknown errors, typically HTTP 500
                    return new Promise.reject({error: response});
                }
            }).then((responseJson) => {
                if(responseJson.message) {
                    // POST request validation error
                    return dispatch({
                        type: invalidLabel,
                        payload: {
                            message: responseJson.message,
                        },
                    });
                } else {
                    // successful GET request
                    return dispatch({
                        type: successLabel,
                        payload: responseJsonFunc ?
                            responseJsonFunc(responseJson) :
                            responseJson,
                    });
                }
            }).catch((error) => {
                return dispatch({
                    type: errorLabel,
                    payload: error,
                });
            });
    };
}

export function createDispatcherForPost(url, body, {actionLabel, successLabel, invalidLabel, failureLabel}, options = {}){
    const { auth, responseJsonFunc, headers } = options;
    let reqHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
    };

    return (dispatch) => {
        dispatch({type: actionLabel});
        getAuth(auth)
            .then((token) => {
                if (token) {
                    reqHeaders.Authorization = `Bearer ${token}`;
                }
                return fetch(url, {
                    method: 'POST',
                    headers: reqHeaders,
                    body: JSON.stringify(body),
                });
            }).then((response) => {            
                if(response.status == 200 || response.status == 500){
                // TODO: api currently returns HTTP 500 for invalid registration, should be changed to 4xx.
                    return response.json();
                } else { // Reserved for offline or unknown errors, typically HTTP 500
                    return new Promise.reject({error: response});
                }
            }).then((responseJson) => {
                if(responseJson.message) {
                    // POST request validation error
                    return dispatch({
                        type: invalidLabel,
                        payload: {
                            message: responseJson.message,
                        },
                    });
                } else {
                    // successful POST request
                    return dispatch({
                        type: successLabel,
                        payload: responseJsonFunc ?
                            responseJsonFunc(responseJson) :
                            responseJson,
                    });
                }
            }).catch((error) => {
                return dispatch({
                    type: failureLabel,
                    payload: error,
                });
            });
    };
}

export function createDispatcherForPut(url, body, {actionLabel, successLabel, invalidLabel, failureLabel}, options = {}){
    const { auth, responseJsonFunc, headers } = options;
    let reqHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
    };

    return (dispatch) => {
        dispatch({type: actionLabel});
        getAuth(auth)
            .then((token) => {
                if (token) {
                    reqHeaders.Authorization = `Bearer ${token}`;
                }
                return fetch(url, {
                    method: 'PUT',
                    headers: reqHeaders,
                    body: JSON.stringify(body),
                });
            }).then((response) => {            
                if(response.status == 200 || response.status == 500){
                // TODO: api currently returns HTTP 500 for invalid registration, should be changed to 4xx.
                    return response.json();
                } else { // Reserved for offline or unknown errors, typically HTTP 500
                    return new Promise.reject({error: response});
                }
            }).then((responseJson) => {
                if(responseJson.message) {
                    // POST request validation error
                    return dispatch({
                        type: invalidLabel,
                        payload: {
                            message: responseJson.message,
                        },
                    });
                } else {
                    // successful POST request
                    return dispatch({
                        type: successLabel,
                        payload: responseJsonFunc ?
                            responseJsonFunc(responseJson) :
                            responseJson,
                    });
                }
            }).catch((error) => {
                return dispatch({
                    type: failureLabel,
                    payload: error,
                });
            });
    };
}