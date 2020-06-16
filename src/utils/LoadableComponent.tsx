import React, { Component, ReactNode, ReactElement, ReactDOM } from 'react';
import Loadable from 'react-loadable';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

class LoadingPage extends Component {
  //类似github页面加载的那个加载条
  componentWillMount() {
    NProgress.start();
  }
  componentWillUnmount() {
    NProgress.done();
  }
  render() {
    return <div />;
  }
}

const loading = () => <LoadingPage />;

const LoadableComponent = (component: () => Promise<any>) => {
  return Loadable({
    loader: component,
    loading,
  });
};

export default LoadableComponent;
