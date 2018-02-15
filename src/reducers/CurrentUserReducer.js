import {
    SET_CURR_USER,
    FETCHING_USER,
    FETCHING_USER_SUCCESS,
    FETCHING_USER_INVALID,
    FETCHING_USER_FAILURE,
} from '../actions/CurrentUser';

const initialState = {
    userFetching: false,
    userFetchSuccess: false,
    userFetchInvalid: false,
    userFetchError: false,
    currentUserInfo: {},
};

export default function currentUserReducer(state = initialState, action) {
    switch (action.type) {
    case SET_CURR_USER:
        return {
            ...state,
            currentUserInfo: action.payload,
        };
    
    case FETCHING_USER:

        return {
            ...state,
            userFetching: true,            
            userFetchSuccess: false,
            userFetchInvalid: false,
            userFetchError: false,
        };

    case FETCHING_USER_SUCCESS:

        return {
            ...state,
            currentUserInfo: action.payload,
            userFetching: false,
            userFetchSuccess: true,
            userFetchInvalid: false,
            userFetchError: false,    
        };

    case FETCHING_USER_INVALID:
        return {
            ...state,
            userFetching: false,
            userFetchSuccess: false,
            userFetchInvalid: true,          
            userFetchError: false
        };

    case FETCHING_USER_FAILURE:
        return {
            ...state,
            userFetching: false,
            userFetchSuccess: false,
            userFetchInvalid: false,          
            userFetchError: true
        };

    default:
        return state;
    }
}