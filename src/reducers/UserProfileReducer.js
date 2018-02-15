import { UPDATING_USER, UPDATING_USER_SUCCESS, UPDATING_USER_INVALID, UPDATING_USER_FAILURE } from '../actions/CurrentUser';

const initialState = {
    updateUserSubmitted: false,
    updateUserSuccess: false,
    updateUserError: false,
    updateUserInvalid: false,
    updateUserInvalidMsg: '',
};


export default function userProfileReducer(state = initialState, action) {
    switch (action.type) {
    case UPDATING_USER:
        return {
            ...state,
            updateUserSubmitted: true,
            updateUserSuccess: false,
            updateUserError: false,            
            updateUserInvalid: false,
            updateUserInvalidMsg: '',
        };

    case UPDATING_USER_SUCCESS:
        return {
            ...state,
            updateUserSubmitted: false,
            updateUserSuccess: true,
            updateUserError: false,            
            updateUserInvalid: false,
            updateUserInvalidMsg: '',
        };

    case UPDATING_USER_INVALID:
        return {
            ...state,
            updateUserSubmitted: false,
            updateUserSuccess: false,            
            updateUserError: false,
            updateUserInvalid: true,
            updateUserInvalidMsg: action.payload.message,
        };

    case UPDATING_USER_FAILURE:
        return {
            ...state,
            updateUserSubmitted: false,
            updateUserSuccess: false,
            updateUserInvalid: false,     
            updateUserError: true,
        };

    default:
        return state;
    }
}
