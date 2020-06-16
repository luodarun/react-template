/* eslint no-console: ["warn", { allow: ["warn", "error", "assert"] }], 'no-unused-vars':0 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cookies from 'js-cookie';
import { withRouter } from 'react-router';
import { logout } from '../store/actions/common';
import { Menu, Dropdown, Icon } from 'antd';

function Top(props) {
  const handleMenuClick = () => {
    props.logout();
    cookies.remove('tokenUid');
    props.history.replace('/login');
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="signOut">
        <span>退出登录</span>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu}>
      <span
        className="ant-dropdown-link"
        style={{ float: 'right', marginRight: '20px' }}
      >
        {props.userInfo.userName} <Icon type="down" />
      </span>
    </Dropdown>
  );
}

Top.propTypes = {
  userInfo: PropTypes.object,
  logout: PropTypes.func,
  history: PropTypes.object,
};
const mapDispatchToProps = dispatch => {
  return {
    logout: (...args) => dispatch(logout(...args)),
  };
};

export default connect('', mapDispatchToProps)(withRouter(Top));
