import {
    FETCHING_RES,
    FETCHING_RES_SUCCESS,
    FETCHING_RES_INVALID,
    FETCHING_RES_FAILURE,
    RES_SUBMITTED,
    RES_SUCCESS,
    RES_INVALID,
    RES_FAILURE,
} from '../actions/Reservation';

const initialState = {
    resSubmitted: false,
    resSuccess: false,
    resError: false,
    resInvalid: false,
    resInvalidMsg: '',
    resSpotDetail: {},

    resFetching: false,
    resFetchSuccess: false,
    resFetchInvalid: false,
    resFetchError: false,   
    resList: {},
};

export default function reservationReducer(state = initialState, action) {
    switch (action.type) {
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

        
    default:
        return state;
    }
}
