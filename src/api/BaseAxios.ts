/*eslint-disable*/
/**
 * 全站http配置
 *
 * header参数说明
 * isToken是否需要token
 */
import axios from 'axios';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { requestBaseUrl, whiteList } from '@/config/env';

import { message as antdMessage } from 'antd';
axios.defaults.timeout = 180000;
axios.defaults.baseURL = requestBaseUrl;
//返回其他状态吗
axios.defaults.validateStatus = function(status) {
  return status >= 200 && status <= 500; // 默认的
};
//跨域请求，允许保存cookie
axios.defaults.withCredentials = true;

// NProgress Configuration
NProgress.configure({
  showSpinner: false,
});

//HTTP request拦截
axios.interceptors.request.use(
  config => {
    NProgress.start(); // start progress bar
    config.headers['Authorization'] = sessionStorage.get('tokenUid');
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
//HTTP response拦截
axios.interceptors.response.use(
  res => {
    NProgress.done();
    let status = Number(res.status) || 200;
    if (status === 200) {
      status = res.data.code;
    }
    const message: string = res.data.messsage || '未知错误';
    //如果是401则跳转到登录页面
    if (status === 401) {
    }
    //如果请求为200则放过，否者默认统一处理,或者在website中配置statusWhiteList白名单自行处理
    if (
      status !== 1 &&
      whiteList.indexOf(
        (res.config.url as string).substring(requestBaseUrl.length),
      ) < 0
    ) {
      antdMessage.error(message);
      return Promise.reject(message);
    }

    return res.data;
  },
  error => {
    NProgress.done();
    return Promise.reject(error);
  },
);

export default axios;
