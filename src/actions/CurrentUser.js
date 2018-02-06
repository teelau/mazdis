import {
    createDispatcherForGet,
    createDispatcherForPut,
    API_ROOT,
    ENDPOINTS,
} from './index'; 

export const FETCHING_USER = 'FETCHING_USER';
export const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS';
export const FETCHING_USER_INVALID = 'FETCHING_USER_INVALID';
export const FETCHING_USER_FAILURE = 'FETCHING_USER_FAILURE';

export const UPDATING_USER = 'UPDATING_USER';
export const UPDATING_USER_SUCCESS = 'UPDATING_USER_SUCCESS';
export const UPDATING_USER_INVALID = 'UPDATING_USER_INVALID';
export const UPDATING_USER_FAILURE = 'UPDATING_USER_FAILURE';

export function fetchCurrentUser(){
    return createDispatcherForGet(
        ENDPOINTS.userInfo,
        {
            actionLabel: FETCHING_USER,
            successLabel: FETCHING_USER_SUCCESS,
            invalidLabel: FETCHING_USER_INVALID,
            failureLabel: FETCHING_USER_FAILURE,
        },
        { auth: true }
    );
}

export function updateCurrentUser(body){
    return createDispatcherForPut(
        ENDPOINTS.userInfo,
        body,
        {
            actionLabel: UPDATING_USER,
            successLabel: UPDATING_USER_SUCCESS,
            invalidLabel: UPDATING_USER_INVALID,
            failureLabel: UPDATING_USER_FAILURE,
        },
        { auth: true }
    );
}
