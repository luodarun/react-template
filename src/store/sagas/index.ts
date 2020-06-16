import { all, fork, takeEvery, put } from 'redux-saga/effects';
import * as actions from '../actions/ActionTypes';
import * as commonActions from '../actions/common';
import { loginByAccount, userVO } from '@/api/system';
import { entryName } from '@/config/env';
import { push } from 'connected-react-router';
import { getStaticRouter } from '@/utils/common';

function* login({ data }: actionData) {
  try {
    const res = yield loginByAccount(
      data.username,
      data.password,
      data.validateCode,
      data.key,
    );
    yield put(commonActions.setIsLoginTrue());
    yield setUserinfo(res.data.token.userVO);
    yield setMenu(res.data.token.userVO.roleCodes);
    sessionStorage.setItem('tokenUid', res.data.token.token);
    yield put(push('/'));
  } catch (e) {
    // eslint-disable-next-line
    console.log(e);
  }
}

function* setUserinfo(data: userVO) {
  yield put(commonActions.setUserInfo(data));
}

function* setMenu(roleCodes: string) {
  let tempRoutes = roleCodes
    ? getStaticRouter(undefined, roleCodes.split(','))
    : [];
  tempRoutes.unshift({
    path: `${entryName}/sys/wel`,
    component: 'views/home/index',
    children: [],
    icon: 'home',
    id: '1-1',
    label: '首页',
  });
  yield put(commonActions.setMenu(tempRoutes));
}

function* watchUser() {
  yield takeEvery(actions.LOGIN_BY_CAS, login);
}

export default function* root() {
  yield all([fork(watchUser)]);
}
