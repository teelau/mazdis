import { combineReducers } from 'redux';

import parkingSpotsReducer from './ParkingSpotsReducer';
import loginReducer from './LoginReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    parkingSpotsReducer,
    loginReducer,
    form: formReducer,
});
