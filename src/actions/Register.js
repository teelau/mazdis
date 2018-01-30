import { API_ROOT, createDispatcherForPost } from './index'; 

export const REG_SUBMITTED = 'REG_SUBMITTED';
export const REG_SUCCESS = 'REG_SUCCESS';
export const REG_INVALID = 'REG_INVALID';

export const REG_FAILURE = 'REG_FAILURE';

export function registerUser({ name, email, password }){
    return createDispatcherForPost(
        `${API_ROOT}/users`,
        { name, email, password },
        {
            actionLabel: REG_SUBMITTED,
            successLabel: REG_SUCCESS,
            invalidLabel: REG_INVALID,
            failureLabel: REG_FAILURE,
        });
    // return (dispatch) => {
    //     dispatch({type: REG_SUBMITTED});
    //     fetch(`${API_ROOT}/users`, {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ name, email, password }),
    //     }).then((response) => {
    //         if(response.status == 200 || response.status == 500){
    //             // TODO: api currently returns HTTP 500 for invalid registration, should be changed to 4xx.
    //             return response.json();
    //         } else { // Reserved for unknown errors, typically HTTP 500
    //             return new Promise.reject({error: response});
    //         }
    //     }).then((responseJson) => {
    //         if(responseJson.message){
    //             // invalid registration form body
    //             return dispatch({
    //                 type: REG_INVALID,
    //                 payload: {
    //                     message: responseJson.message,
    //                 },
    //             });
    //         } else {
    //             // successful registration
    //             return dispatch({
    //                 type: REG_SUCCESS,
    //                 payload: { 
    //                     email: responseJson.email,
    //                 },
    //             });
    //         }
    //     }).catch((error) => {
    //         return dispatch({
    //             type: REG_FAILURE,
    //             payload: error
    //         });
    //     });
    // };
}
