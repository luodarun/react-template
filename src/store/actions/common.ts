import {
  SET_FULL_LOADING_SHOW,
  SET_FULL_LOADING_HIDE,
  LOGIN_BY_CAS,
  SET_USERINGO,
  SET_ISLOGIN_FALSE,
  SET_ISLOGIN_TRUE,
  SET_MENU,
  LOGOUT,
  SET_CURRENT_PATH,
  ONLY_FOR_TEST,
} from './ActionTypes';
import { userVO } from '@/api/system';
interface actionFunc<T> {
  (data?: T): actionData<T>;
}
export const setFullLoadingShow: actionFunc<undefined> = () => ({
  type: SET_FULL_LOADING_SHOW,
});

export const setFullLoadingHide: actionFunc<undefined> = () => ({
  type: SET_FULL_LOADING_HIDE,
});

export const login: actionFunc<{
  key: string;
  username: string;
  password: string;
  validateCode: string;
}> = data => ({
  type: LOGIN_BY_CAS,
  data,
});

export const setUserInfo: actionFunc<userVO> = data => {
  return {
    type: SET_USERINGO,
    data,
  };
};

export const setMenu: actionFunc<Array<selfRoute>> = data => {
  return {
    type: SET_MENU,
    data,
  };
};

export const setCurrentPath: actionFunc<string> = data => {
  return {
    type: SET_CURRENT_PATH,
    data,
  };
};

export const setIsLoginFalse: actionFunc<undefined> = () => ({
  type: SET_ISLOGIN_FALSE,
});

export const setIsLoginTrue: actionFunc<undefined> = () => ({
  type: SET_ISLOGIN_TRUE,
});

export const logout: actionFunc<undefined> = () => ({
  type: LOGOUT,
});

export const onlyForTest: actionFunc<undefined> = () => ({
  type: ONLY_FOR_TEST,
});
