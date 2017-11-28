import { combineReducers } from 'redux';

import parkingSpotsReducer from './ParkingSpotsReducer';
import loginReducer from './LoginReducer';

export default combineReducers({
    parkingSpotsReducer,
    loginReducer
});
