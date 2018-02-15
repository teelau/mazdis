import firebase from 'firebase';  
import { FIREBASE_CONFIG } from './config';

export const API_ROOT = 'https://us-central1-mazdis-sabps.cloudfunctions.net/api';

export const ENDPOINTS = {
    userInfo: `${API_ROOT}/user-info`,
    currUser: `${API_ROOT}/users/current-user`,
    booking: `${API_ROOT}/booking`,
    bookings: `${API_ROOT}/bookings`,
    parkingSpots: `${API_ROOT}/parking-stations`,
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

/*
    Test Function for parking bike
*/
export function parkBike(bookingCode){
    fetch(ENDPOINTS.booking, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            action: 'park',
            bookingCode,
        }),
    })
        .then((response) => {
            console.log('Park Bike Status: ', response.status);
        })
        .catch((error) => { console.log(error)} );
}

/*
    Test Function for retrieving bike
*/
export function retrieveBike(bookingCode){
    fetch(ENDPOINTS.booking, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            action: 'retrieve',
            bookingCode,
        }),
    })
        .then((response) => {
            console.log('Retrieve Bike Status: ', response.status);
        })
        .catch((error) => { console.log(error)} );
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
                if(response.status == 200 ||
                    (response.status >= 400 && response.status <= 499) ||
                    response.status == 500){
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
                    type: failureLabel,
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
                if(response.status == 200 ||
                    (response.status >= 400 && response.status <= 499) ||
                    response.status == 500){                // TODO: api currently returns HTTP 500 for invalid registration, should be changed to 4xx.
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
                if(response.status == 200 ||
                    (response.status >= 400 && response.status <= 499) ||
                    response.status == 500){                // TODO: api currently returns HTTP 500 for invalid registration, should be changed to 4xx.
                    return response.json();
                } else { // Reserved for offline or unknown errors, typically HTTP 500
                    return new Promise.reject({error: response});
                }
            }).then((responseJson) => {
                if(responseJson.message) {
                    // PUT request validation error
                    return dispatch({
                        type: invalidLabel,
                        payload: {
                            message: responseJson.message,
                        },
                    });
                } else {
                    // successful PUT request
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