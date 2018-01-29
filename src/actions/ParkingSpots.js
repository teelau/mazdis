import { firebase_app, firebase_db } from './index';

export const FETCHING_SPOTS = 'FETCHING_SPOTS';
export const FETCHING_SPOTS_SUCCESS = 'FETCHING_SPOTS_SUCCESS';
export const FETCHING_SPOTS_FAILURE = 'FETCHING_SPOTS_FAILURE';

export function getAllSpots(){
    return (dispatch) => {
        dispatch({type: FETCHING_SPOTS});        
        return firebase_db.ref('parking stations').once('value')
            .then((snapshot) => { 
                return dispatch({
                    type: FETCHING_SPOTS_SUCCESS,
                    payload: snapshot.val()
                });
            })
            .catch((error) => {
                return dispatch({
                    type: FETCHING_SPOTS_FAILURE,
                    payload: error
                });
            });
    };
}
