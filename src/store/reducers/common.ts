import Immutable from 'seamless-immutable';
import {
  SET_FULL_LOADING_SHOW,
  SET_FULL_LOADING_HIDE,
  SET_ISLOGIN_TRUE,
  SET_ISLOGIN_FALSE,
  SET_USERINGO,
  SET_MENU,
  LOGOUT,
  SET_CURRENT_PATH,
  ONLY_FOR_TEST,
} from '../actions/ActionTypes';
import { mergeData } from '../../utils/reducerUtils';

const initialState = Immutable(
  {
    fullLoading: false,
    userInfo: {},
    menu: [],
    isLogin: false,
    testNum: 1,
    currentPath: '',
  },
  null,
  null,
);
export default function(state = initialState, action: actionData) {
  let tempData = state.testNum;
  switch (action.type) {
    case SET_FULL_LOADING_SHOW:
      return mergeData(state, {
        fullLoading: true,
      });
    case SET_FULL_LOADING_HIDE:
      return mergeData(state, {
        fullLoading: false,
      });
    case SET_ISLOGIN_TRUE:
      return mergeData(state, {
        isLogin: true,
      });
    case SET_ISLOGIN_FALSE:
      return mergeData(state, {
        isLogin: false,
      });
    case SET_USERINGO:
      return mergeData(state, {
        userInfo: action.data,
      });
    case SET_MENU:
      return mergeData(state, {
        menu: action.data,
      });
    case SET_CURRENT_PATH:
      return mergeData(state, {
        currentPath: action.data,
      });
    case LOGOUT:
      return mergeData(state, {
        userInfo: {},
        menu: [],
        isLogin: false,
      });
    case ONLY_FOR_TEST:
      return mergeData(state, {
        testNum: ++tempData,
      });
    default:
      return state;
  }
}
