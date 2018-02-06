import { PROFILE_UPDATE_SUBMITTED, PROFILE_UPDATE_SUCCESS, PROFILE_UPDATE_INVALID, PROFILE_UPDATE_FAILURE } from '../actions/UserProfile';

const initialState = {
    updateProfileSubmitted: false,
    updateProfileSuccess: false,
    updateProfileError: false,
    updateProfileInvalid: false,
    updateProfileInvalidMsg: '',
};


export default function updateProfileReducer(state = initialState, action) {
    switch (action.type) {
    case PROFILE_UPDATE_SUBMITTED:
        return {
            ...state,
            updateProfileSubmitted: true,
            updateProfileSuccess: false,
            updateProfileError: false,            
            updateProfileInvalid: false,
            updateProfileInvalidMsg: '',
        };

    case PROFILE_UPDATE_SUCCESS:
        return {
            ...state,
            updateProfileSuccess: true,
            updateProfileError: false,            
            updateProfileInvalid: false,
            updateProfileInvalidMsg: '',
        };

    case PROFILE_UPDATE_FAILURE:
        return {
            ...state,
            updateProfileSuccess: false,            
            updateProfileError: true,
        };
    case PROFILE_UPDATE_INVALID:
        return {
            ...state,
            updateProfileSubmitted: false,
            updateProfileSuccess: false,            
            updateProfileError: false,
            updateProfileInvalid: true,
            updateProfileInvalidMsg: action.payload.message,
        };
    default:
        return state;
    }
}
