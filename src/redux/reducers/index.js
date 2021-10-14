// Redux
import { combineReducers } from 'redux';

// Reducers
import recipes from './recipes';

const rootReducer = combineReducers({ recipes });

export default rootReducer;
