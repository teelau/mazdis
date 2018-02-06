import { combineReducers } from 'redux';

import currentUserReducer from './CurrentUserReducer';
import parkingSpotsReducer from './ParkingSpotsReducer';
import loginReducer from './LoginReducer';
import regReducer from './RegReducer';
import userProfileReducer from './UserProfileReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    currentUserReducer,
    parkingSpotsReducer,
    loginReducer,
    regReducer,
    userProfileReducer,

    form: formReducer,
});
