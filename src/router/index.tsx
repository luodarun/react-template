/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import NotFound from '../page/NotFound';
import qs from 'query-string';
import { systemName, entryName } from '../config/env';
import Main from '../Main';
import DocumentTitle from 'react-document-title';
import { Location } from 'history';
import {
  Switch,
  Redirect,
  Route,
  withRouter,
  RouteComponentProps,
} from 'react-router';
import LoadableComponent from '../utils/LoadableComponent';
let isLogin: boolean = false; // 如果登陆之后可以利用redux修改该值
const authPath = entryName + '/login'; // 默认未登录的时候返回的页面，可以自行设置

type RouterApiType = RouteComponentProps & {
  menu: Array<selfRoute>;
};

interface selfLocation extends Location {
  title?: string;
  searchParams?: any;
}

class RouterApi extends React.Component<RouterApiType, {}> {
  componentDidMount() {
    isLogin = !!sessionStorage.get('tokenUid');
    if (!isLogin) {
      // 没有菜单或者清空了缓存？
      this.props.history.push(authPath);
    }
  }

  renderComponent = (item: selfRoute, props: any) => {
    const TempComponent = LoadableComponent(() =>
      import('@/' + item.component),
    );
    return <TempComponent {...props} />;
  };

  renderRoute = (item: selfRoute) => {
    if (!item.requiresAuth || isLogin || item.path === authPath) {
      return (
        <Route
          key={item.id}
          exact={true}
          path={item.path}
          render={props => {
            const { search } = props.location;
            let tempLocation: selfLocation = props.location;
            tempLocation.title = item.label;
            tempLocation.searchParams = qs.parse(search);
            return (
              <DocumentTitle title={`${item.label}-${systemName}`}>
                <Main>{this.renderComponent(item, props)}</Main>
              </DocumentTitle>
            );
          }}
        />
      );
    } else {
      return (
        <Redirect
          key={item.id}
          to={{
            pathname: authPath,
            state: { from: this.props.location },
          }}
        />
      );
    }
  };

  mapRoutes: (
    routeArray: selfRoute[],
  ) => (Function | React.ReactNode)[] = routeArray => {
    return routeArray.map(item => {
      if (item.children && item.children.length > 0) {
        return this.mapRoutes(item.children);
      } else {
        return this.renderRoute(item);
      }
    });
  };

  render() {
    return (
      <Switch location={this.props.location}>
        {this.mapRoutes(this.props.menu)}
        <Route component={NotFound} />
      </Switch>
    );
  }
}

const mapStateToProps = ({ common }: { common: { menu : selfRoute[]} }) => {
  return {
    menu: common.menu,
  };
};

export default connect(mapStateToProps, '')(withRouter(RouterApi));
