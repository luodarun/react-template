import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import common from './common';
import { History } from 'history';
const rootReducer = (history: History) =>
  combineReducers({
    common,
    router: connectRouter(history),
  });

export default rootReducer;
