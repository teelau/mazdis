import {
    ENDPOINTS,
    createDispatcherForPost,
    createDispatcherForGet,
} from './index'; 

export const FETCHING_RES = 'FETCHING_RES';
export const FETCHING_RES_SUCCESS = 'FETCHING_RES_SUCCESS';
export const FETCHING_RES_INVALID = 'FETCHING_RES_INVALID';
export const FETCHING_RES_FAILURE = 'FETCHING_RES_FAILURE';

export const RES_RESET = 'RES_RESET';
export const RES_SUBMITTED = 'RES_SUBMITTED';
export const RES_SUCCESS = 'RES_SUCCESS';
export const RES_INVALID = 'RES_INVALID';
export const RES_FAILURE = 'RES_FAILURE';

export function resetReservation(){
    return (dispatch) => dispatch({type: RES_RESET});
}

export function fetchReservations(){
    return createDispatcherForGet(
        ENDPOINTS.bookings,
        {
            actionLabel: FETCHING_RES,
            successLabel: FETCHING_RES_SUCCESS,
            invalidLabel: FETCHING_RES_INVALID,
            failureLabel: FETCHING_RES_FAILURE,
        },
        { auth: true }
    );
}

export function reserveSpot(stationId){
    return createDispatcherForPost(
        ENDPOINTS.bookings,
        { stationId },
        {
            actionLabel: RES_SUBMITTED,
            successLabel: RES_SUCCESS,
            invalidLabel: RES_INVALID,
            failureLabel: RES_FAILURE,
        },
        { auth: true }
    );
}
