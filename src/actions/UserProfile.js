import { createDispatcherForGet, API_ROOT, ENDPOINTS } from './index'; 

export const FETCHING_USER = "FETCHING_USER";
export const FETCHING_USER_SUCCESS = "FETCHING_USER_SUCCESS";
export const FETCHING_USER_INVALID = "FETCHING_USER_INVALID";
export const FETCHING_USER_FAILURE = "FETCHING_USER_FAILURE";



export function fetchCurrentUser(userJwt){
    return createDispatcherForGet(
        ENDPOINTS.currUser,
        {
            actionLabel: FETCHING_USER,
            successLabel: FETCHING_USER_SUCCESS,
            invalidLabel: FETCHING_USER_INVALID,
            errorLabel: FETCHING_USER_FAILURE,
        },
        { auth: true }
    );
}
