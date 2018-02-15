import { ENDPOINTS, createDispatcherForGet } from './index';

export const FETCHING_SPOTS = 'FETCHING_SPOTS';
export const FETCHING_SPOTS_SUCCESS = 'FETCHING_SPOTS_SUCCESS';
export const FETCHING_SPOTS_FAILURE = 'FETCHING_SPOTS_FAILURE';

export function getAllSpots(){
    return createDispatcherForGet(
        ENDPOINTS.parkingSpots,
        {
            actionLabel: FETCHING_SPOTS,
            successLabel: FETCHING_SPOTS_SUCCESS,
            invalidLabel: FETCHING_SPOTS_FAILURE,
            failureLabel: FETCHING_SPOTS_FAILURE,
        }
    );
    // return (dispatch) => {
    //     dispatch({type: FETCHING_SPOTS});        
    //     return firebase_db.ref('parking stations').once('value')
    //         .then((snapshot) => { 
    //             return dispatch({
    //                 type: FETCHING_SPOTS_SUCCESS,
    //                 payload: snapshot.val()
    //             });
    //         })
    //         .catch((error) => {
    //             return dispatch({
    //                 type: FETCHING_SPOTS_FAILURE,
    //                 payload: error
    //             });
    //         });
    // };
}
