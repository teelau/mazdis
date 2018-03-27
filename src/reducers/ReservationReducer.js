import {
    FETCHING_RES,
    FETCHING_RES_SUCCESS,
    FETCHING_RES_INVALID,
    FETCHING_RES_FAILURE,
    RES_RESET,
    RES_SUBMITTED,
    RES_SUCCESS,
    RES_INVALID,
    RES_FAILURE,
    DELETE_RES,
    DELETE_RES_SUCCESS,
    DELETE_RES_INVALID,
    DELETE_RES_FAILURE,
} from '../actions/Reservation';

const initialState = {
    resSubmitted: false,
    resSuccess: false,
    resError: false,
    resInvalid: false,
    resInvalidMsg: '',
    resDetail: {},

    resFetching: false,
    resFetchSuccess: false,
    resFetchInvalid: false,
    resFetchError: false,   
    resList: {},

    resDelete: false,
    resDeleteSuccess: false,
    resDeleteInvalid: false,
    resDeleteError: false,
    resDeleteMsg: {},
};

export default function reservationReducer(state = initialState, action) {
    switch (action.type) {
    case RES_RESET:
        return {
            resSubmitted: false,
            resSuccess: false,
            resError: false,
            resInvalid: false,
            resInvalidMsg: '',
            resDetail: {},
        };

    case RES_SUBMITTED:
        return {
            ...state,
            resSubmitted: true,
            resSuccess: false,
            resError: false,            
            resInvalid: false,
            resInvalidMsg: '',
            resDetail: action.payload,
        };

    case RES_SUCCESS:
        return {
            ...state,
            resSubmitted: false,
            resSuccess: true,
            resError: false,            
            resInvalid: false,
            resInvalidMsg: '',
            resSpotDetail: action,
        };

    case RES_INVALID:
        return {
            ...state,
            resSubmitted: false,
            resSuccess: false,            
            resError: false,
            resInvalid: true,
            resInvalidMsg: action.payload.message,
        };

    case RES_FAILURE:
        return {
            ...state,
            resSubmitted: false,
            resSuccess: false,
            resInvalid: false,     
            resError: true,
        };

    case FETCHING_RES:
        return {
            ...state,
            resFetching: true,            
            resFetchSuccess: false,
            resFetchInvalid: false,
            resFetchError: false,
            resDeleteSuccess: false, // used to prevent infinite re-renders of My Bookings page
        };

    case FETCHING_RES_SUCCESS:
        return {
            ...state,
            resFetching: false,
            resFetchSuccess: true,
            resFetchInvalid: false,
            resFetchError: false,
            resList: action.payload,
        };

    case FETCHING_RES_INVALID:
        return {
            ...state,
            resFetching: false,
            resFetchSuccess: false,
            resFetchInvalid: true,          
            resFetchError: false
        };

    case FETCHING_RES_FAILURE:
        return {
            ...state,
            resFetching: false,
            resFetchSuccess: false,
            resFetchInvalid: false,          
            resFetchError: true
        };

    case DELETE_RES:
        return {
            ...state,
            resDelete: true,
            resDeleteSuccess: false,
            resDeleteInvalid: false,
            resDeleteMsg: {},
            resDeleteError: false,
        };

    case DELETE_RES_SUCCESS:
        return {
            resDelete: false,
            resDeleteSuccess: true,
            resDeleteInvalid: false,
            resDeleteError: false,
        };

    case DELETE_RES_INVALID:
        return {
            resDelete: false,
            resDeleteSuccess: false,
            resDeleteInvalid: true,
            resDeleteMsg: action.payload,
            resDeleteError: false,  
        };
    
    case DELETE_RES_FAILURE:
        return {
            resDelete: false,
            resDeleteSuccess: false,
            resDeleteInvalid: false,
            resDeleteError: true,
        };

    default:
        return state;
    }
}
