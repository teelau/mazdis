import { FETCHING_SPOTS, FETCHING_SPOTS_SUCCESS, FETCHING_SPOTS_FAILURE } from '../actions/ParkingSpots';

const initialState = {
    spots: {},
    spotsFetching: false,
    spotsFetched: false,    
    spotsFetchError: false
};

export default function spotsReducer(state = initialState, action) {
    switch (action.type) {
    case FETCHING_SPOTS:
        return {
            ...state,
            spots: {},
            spotsFetching: true,
            spotsFetched: false            
        };

    case FETCHING_SPOTS_SUCCESS:
        return {
            ...state,
            spotsFetching: false,
            spotsFetched: true,
            spotsFetchError: false,            
            spots: action.payload
        };

    case FETCHING_SPOTS_FAILURE:
        return {
            ...state,
            spotsFetching: false,
            spotsFetched: false,
            spotsFetchError: true
        };
    default:
        return state;
    }
}
