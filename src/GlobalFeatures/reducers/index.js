import { combineReducers } from 'redux';
import User from './User';
import Theme from './Theme';

const CombinedReducers = combineReducers({
    Theme: Theme,
    User: User,
});

export default CombinedReducers;
