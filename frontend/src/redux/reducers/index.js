 //import combine from redux
import { combineReducers } from 'redux';
//import all the other reducer functions
import userReducer from './userReducer';

import projectReducer from './projectReducer';
const rootReducer = combineReducers({
    userInfo: userReducer,
    projectInfo: projectReducer 
})
export default rootReducer