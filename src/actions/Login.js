import { firebase_app } from './index';

export const LOGIN_SUBMITTED = 'LOGIN_SUBMITTED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export function loginUser(email, password){
    return (dispatch) => {
        dispatch({type: LOGIN_SUBMITTED});  
        firebase_app.auth().signInWithEmailAndPassword(email, password).then(() => {
            return dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    email: email
                }
            });
        }).catch((error) => {
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
        });
    };
}
