import auth from './auth';
import { combineReducers } from 'redux';
import appSettings from './appSettings';

const rootReducer = combineReducers({
    auth,
    appSettings
});



export default rootReducer;
