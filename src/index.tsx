/* eslint no-console: ["warn", { allow: ["warn", "error", "assert"] }], 'no-unused-vars':0 */
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';

import React, { Fragment } from 'react';
import { render } from 'react-dom';
import 'normalize.css/normalize.css';
import './styles/Index.less';
import App from './App';
import Loadable from 'react-loadable';
import { ConfigProvider, BackTop } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { ConnectedRouter } from 'connected-react-router';
import { EditFormBaseWrap } from '@/components/commonUse/useEditFormBase';
import { PersistGate } from 'redux-persist/integration/react';
import rootSagas from './store/sagas';
import BaseLoading from './components/common/BaseLoading/BaseLoading';
import { Redirect, Route, Switch } from 'react-router';
import history from '@/utils/history';
import { entryName } from '@/config/env';
const { store, persistor } = configureStore(window.__INITIAL_STATE__);
store.runSaga(rootSagas);

if (module.hot) {
  module.hot.accept();
}

const loading = () => <BaseLoading />;

const Login = Loadable({
  loading,
  loader: () => import('./page/Login'),
});

const RootLayout = Loadable({
  loading,
  loader: () => import('./layout'),
});

const NotFound = Loadable({
  loading,
  loader: () => import('./page/NotFound'),
});

/**
 * getUserConfirmation: func
 * 作用：导航到此页面前执行的函数，默认使用 window.confirm
 * 使用场景：当需要用户进入页面前执行什么操作时可用，不过一般用到的不多。
 */
// const getConfirmation = (message, callback) => {
//   if (!isLogin) {
//     message.push('/schoolWeb/login');
//   } else {
//     message.push(message.location.pathname);
//   }
// };

// const isLogin = cookies.get('tokenUid');

// /**
//  * forceRefresh: bool
//  * 作用：当浏览器不支持 HTML5 的 history API 时强制刷新页面。
//  */
// const supportsHistory = 'pushState' in window.history;

const renderOut = () => {
  render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider locale={zhCN}>
          <EditFormBaseWrap>
            <Fragment>
              <ConnectedRouter
                history={history}>
                <App>
                  <Switch>
                    <Route
                      exact
                      path="/"
                      render={() => (
                        <Redirect to={`${entryName}/sys/wel`} push />
                      )}
                    />
                    <Route path={`${entryName}/login`} component={Login} />
                    <Route path={`${entryName}/sys`} component={RootLayout} />
                    <Route component={NotFound} />
                  </Switch>
                </App>
              </ConnectedRouter>
              <BackTop visibilityHeight={500} />
            </Fragment>
          </EditFormBaseWrap>
        </ConfigProvider>
      </PersistGate>
    </Provider>,
    document.getElementById('root'),
  );
};
renderOut();
