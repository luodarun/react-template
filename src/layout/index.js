/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import '../styles/Layout.less';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import Top from './Top';
import Slider from './Slider';
import Routes from '../router'
import { systemName } from '@/config/env';
import { setCurrentPath } from '../store/actions/common';
import BaseBreadcrumb from '@/components/common/BaseBreadcrumb';
import { Layout, Icon } from 'antd';
import useWinSize from '@/components/commonUse/useWinSize';
import screenfull from 'screenfull';
const { Header, Content, Footer, Sider } = Layout;
function LayoutWrap (props) {
  const size = useWinSize();
  const [collapsed, setCollapsed] = useState(size.width <= 900);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const toggleSreenfull = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle(); // 全屏
    }
  }

  useEffect(() => {
    if (screenfull.isEnabled) {
      screenfull.on('change', () => {
        setIsFullscreen(screenfull.isFullscreen);
      });
      return screenfull.off('change');
    }
  }, []);

  useEffect(() => {
    setCollapsed(size.width < 1366);
  }, [size]);

  useEffect(() => {
    setCollapsed(size.width < 1366);
  }, [props.setCurrentPath]);

  return (
    <Layout className='main-wrap'>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        className='main-slider'
      >
        <Slider menu={props.menu} setCurrentPath={props.setCurrentPath} currentPath={props.currentPath} />
      </Sider>
      <Layout className='main-content'>
        <Header className='main-content-header'>
          <Icon
            style={{ marginLeft: '20px' }}
            className="trigger"
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={toggle}
          />
          <BaseBreadcrumb style={{ display: 'inline-block' }} setCurrentPath={props.setCurrentPath} menu={props.menu} />
          <Top userInfo={props.userInfo} />
          <Icon style={{ float: 'right', marginTop: '25px', marginRight: '15px', cursor: 'pointer' }} type={!isFullscreen ? 'arrows-alt' : 'shrink'} onClick={toggleSreenfull} />
        </Header>
        <Content className='main-content-middle'>
          <Routes />
        </Content>
        <Footer className='main-content-footer'>{systemName} ©2019</Footer>
      </Layout>
    </Layout>
  );
}

LayoutWrap.propTypes = {
  userInfo: PropTypes.object,
  menu: PropTypes.array,
  setCurrentPath: PropTypes.func,
  currentPath: PropTypes.string
}

export default connect(({ common }) => {
  return {
    userInfo: common.userInfo,
    menu: common.menu,
    currentPath: common.currentPath
  }
}, { setCurrentPath })(LayoutWrap);
