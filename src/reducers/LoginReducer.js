import { LOGIN_SUBMITTED, LOGIN_SUCCESS, LOGIN_FAILURE,
    LOGIN_CHECKING, LOGIN_CHECKED_LOGGED_IN, LOGIN_CHECKED_NOT_LOGGED_IN, } from '../actions/Login';

const initialState = {
    email: '',
    loginSuccess: false,
    loginSubmitted: false,
    loginError: false
};

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_CHECKING:
        case LOGIN_SUBMITTED:
            return {
                ...state,
                email: '',
                loginSubmitted: true,
                loginSuccess: false           
            };

        case LOGIN_CHECKED_LOGGED_IN:
        case LOGIN_SUCCESS:
            return {
                ...state,
                loginSubmitted: false,
                loginSuccess: true,
                loginError: false,            
                email: action.payload.email
            };
        
        case LOGIN_CHECKED_NOT_LOGGED_IN:
        case LOGIN_FAILURE:
            return {
                ...state,
                loginSubmitted: false,
                loginSuccess: false,            
                loginError: true
            };

        default:
            return state;
    }
}
