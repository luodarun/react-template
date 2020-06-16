import React, { memo, Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

function BaseBreadcrumb(props) {
  const [crumbList, setCrumbList] = useState([]);

  useEffect(() => {
    renderBreadcrumbList(props.location.pathname);
  }, [props.location.pathname]);

  const renderBreadcrumbList = pathname => {
    let tempArray = [];
    props.menu.forEach(item => {
      if (item.children && item.children.length > 0) {
        // 有子菜单
        item.children.forEach(item2 => {
          if (item2.path === pathname) {
            tempArray.push({
              title: item.label,
            });
            tempArray.push({
              title: item2.label,
              path: item2.path,
            });
          }
        });
      } else {
        if (item.path === pathname) {
          tempArray.push({
            title: item.label,
            path: item.path,
          });
        }
      }
    });
    setCrumbList(tempArray);
  };

  const styleBreadcrumb = {
    background: '#fff',
    fontSize: 16,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 20,
  };
  const breadcrumbLink = {
    color: '#999',
  };
  return (
    <Breadcrumb style={styleBreadcrumb} separator=">">
      {props.location.pathname !== '/sys/wel' && (
        <Breadcrumb.Item key="welPage">
          <Link
            to="/sys/wel"
            onClick={() => props.setCurrentPath('1-1')}
            className="breadcrumb-link"
          >
            <span style={breadcrumbLink}>首页</span>
          </Link>
        </Breadcrumb.Item>
      )}
      {crumbList.map((item, index) => {
        return (
          <Breadcrumb.Item key={index}>
            {item.path ? (
              <Link to={item.path} className="breadcrumb-link">
                <span>{item.title}</span>
              </Link>
            ) : (
              <Fragment>
                <span style={breadcrumbLink}>{item.title}</span>
              </Fragment>
            )}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}
BaseBreadcrumb.propTypes = {
  location: PropTypes.object,
  menu: PropTypes.array,
  setCurrentPath: PropTypes.func,
};
export default memo(withRouter(BaseBreadcrumb));
