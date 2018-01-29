import { firebase_app } from './index';
import firebase from 'firebase';  

export const LOGIN_SUBMITTED = 'LOGIN_SUBMITTED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGIN_CHECKING = 'LOGIN_CHECKING';
export const LOGIN_CHECKED_LOGGED_IN = 'LOGIN_CHECKED_LOGGED_IN';
export const LOGIN_CHECKED_NOT_LOGGED_IN = 'LOGIN_CHECKED_NOT_LOGGED_IN';

export const LOGOUT_SUBMITTED = 'LOGOUT_SUBMITTED';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export function checkLogin(){
    return (dispatch) => {
        dispatch({type: LOGIN_CHECKING});
        firebase_app.auth().onAuthStateChanged((user) => {
                            
            if(user){ // user logged in
                // obtain the token of the user to set
                firebase_app.auth().currentUser.getIdToken(true)
                    .then((idToken) => {
                        return dispatch({
                            type: LOGIN_CHECKED_LOGGED_IN,
                            payload: {
                                email: user.email,
                                name: user.displayName,
                                token: idToken,
                            }
                        });
                    }).catch(function(error) {
                        return dispatch({
                            type: LOGIN_FAILURE,
                            payload: error
                        });
                    });
            } else {
                // user not logged in
                return dispatch({
                    type: LOGIN_CHECKED_NOT_LOGGED_IN,
                    payload: {
                        email: ''
                    }
                });
            }
        });
    };
}
export function loginUser(email, password){
    return (dispatch) => {
        dispatch({type: LOGIN_SUBMITTED});
        let userInfoPayload = {};
        firebase_app.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .catch((error) => { // catch error with setPersistence
                return dispatch({
                    type: LOGIN_FAILURE,
                    payload: error
                });
            })
            .then(() => {
                return firebase_app.auth().signInWithEmailAndPassword(email, password);
            })
            .catch((error) => { // catch error from signInWithEmailAndPassword
                // var errorCode = error.code;
                // var errorMessage = error.message;
                
                /* for now we dispatch one common error for login problems, we 
                should dispatch different ones depending on what was the login 
                problem or at least the error in the payload so we can handle it in 
                the app */
                return dispatch({
                    type: LOGIN_FAILURE,
                    payload: error
                });
            })
            .then((user) => {
                userInfoPayload.email = user.email;
                userInfoPayload.name = user.displayName;
                return firebase_app.auth().currentUser.getIdToken(true);
            })
            .then((idToken) => {
                userInfoPayload.token = idToken;
                return dispatch({
                    type: LOGIN_SUCCESS,
                    payload: userInfoPayload,
                });
            })
            .catch((error) => { // catch other errors
                return dispatch({
                    type: LOGIN_FAILURE,
                    payload: error
                });
            });
    };
}

export function logoutUser(){
    return (dispatch) => {
        dispatch({type: LOGOUT_SUBMITTED});
        firebase_app.auth().signOut()
            .then(() => {
                return dispatch({
                    type: LOGOUT_SUCCESS,
                })
            }).catch((error) => {
                return dispatch({
                    type: LOGOUT_FAILURE,
                    payload: error
                });
            })
    };
}
