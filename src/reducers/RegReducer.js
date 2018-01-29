import { REG_SUBMITTED, REG_SUCCESS, REG_INVALID, REG_FAILURE } from '../actions/Register';

const initialState = {
    regSuccess: false,
    regSubmitted: false,
    regInvalid: false,
    regInvalidMsg: '',
    regError: false,
    regNewUser: '',
};

export default function regReducer(state = initialState, action) {
    switch (action.type) {
    case REG_SUBMITTED:
        return {
            ...state,
            regSubmitted: true,
            regInvalid: false,
            regError: false,
            regSuccess: false,
        };

    case REG_SUCCESS:
        return {
            ...state,
            regSubmitted: false,
            regSuccess: true,
            regInvalid: false,
            regInvalidMsg: '',
            regError: false,
            regNewUser: action.payload.email,
        };

    case REG_INVALID:
        return {
            ...state,
            regSubmitted: false,
            regSuccess: false,            
            regInvalid: true,
            regError: false,          
            regInvalidMsg: action.payload.message,
        };

    case REG_FAILURE:
        return {
            ...state,
            regSubmitted: false,
            regSuccess: false,            
            regError: true,
        };
    default:
        return state;
    }
}
