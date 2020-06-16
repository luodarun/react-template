/*eslint-disable*/
import React, {useState, useEffect, memo} from 'react';
import {Menu, Icon } from 'antd';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types';
const {SubMenu} = Menu;

function Slider (props) {
  const [currentKey, setCurrentKey] = useState(props.currentPath || '');
  const [OpenKeys, setOpenKeys] = useState([]);
  const [rootSubMenuKeys, setRootSubMenuKeys] = useState([]);
  const handleClick = (item) => {
    const key = item.key;
    if (key === currentKey) {
      return false;
    }
    props.setCurrentPath(key);
    setCurrentKey(key);
  };

  useEffect(() => {
    const strange = props.currentPath;
    if (strange) { // 有缓存记录
      let needPath = '';
      props.menu.forEach(item => {
        if (item.children && item.children.length > 0) {
          item.children.forEach(item2 => {
            if (strange === item2.id) {
              needPath = item2.path;
            }
          });
        } else {
          if (strange === item.id) {
            needPath = item.path;
          }
        }
      });
      if (props.location.pathname !== needPath) {
        props.history.push(needPath);
      }
    }
  }, []);

  useEffect(() => {
    const strange = props.currentPath;
    const rootSubMenuKeys = props.menu.map(item => item.id);
    setRootSubMenuKeys(rootSubMenuKeys);
    menuOpenKey(props.menu, strange);
  }, [props.currentPath]);

  // 设置默认展开
  const menuOpenKey = (data, strange) => {
    data.map(item => {
      if (item.children && item.children.length > 0) {
        return menuOpenKey(item.children, strange)
      }
      if (item.id === strange) {
        setCurrentKey(strange);
        setOpenKeys([ String(item.parentId) ]);
      }
    });
  };

  const onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => OpenKeys.indexOf(key) === -1); // 取出最后一个
    if (rootSubMenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(openKeys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const renderMenu = (data) => {
    let tempAllMenu = data.map(item => {
      if (item.children && item.children.length > 0) { // 有子菜单
        let tempSubMenu = (<SubMenu key={String(item.id)} title={
          <span>
            {item.icon && <Icon type={item.icon} />}
            <span>{item.label}</span>
          </span>
        }>
          {renderMenu(item.children)}
        </SubMenu>);
        return tempSubMenu;
      } else {
        return (<Menu.Item key={String(item.id)}>
          <Link to={item.path}>
            {item.icon && <Icon type={item.icon} />}
            <span>{item.label}</span>
          </Link>
        </Menu.Item>)
      }
    });
    return tempAllMenu;
  }

  return rootSubMenuKeys.length > 0 ? (
    <div>
      <Menu
        theme="dark"
        onClick={handleClick}
        onOpenChange={onOpenChange}
        selectedKeys={ [ currentKey ] }
        openKeys={ OpenKeys }
        mode="inline"
      >
        {renderMenu(props.menu)}
      </Menu>
    </div>
  ) : (<div className='empty-menu'>
    暂无菜单
  </div>);
}

Slider.propTypes = {
  menu: PropTypes.array,
  setCurrentPath: PropTypes.func,
  currentPath: PropTypes.string,
  location: PropTypes.object,
  history: PropTypes.object
};
Slider.defaultProps = {
  menu: []
};

export default memo(withRouter(Slider))
