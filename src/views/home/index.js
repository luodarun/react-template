import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List, Avatar } from 'antd';
import { setCurrentPath } from '../../store/actions/common';
import './home.less';
import PropTypes from 'prop-types';
function Home(props) {
  const { menu } = props;

  const getUserPower = () => {
    let tempArray = [];
    menu.forEach(item => {
      if (item.children && item.children.length > 0) {
        item.children.forEach(item2 =>
          tempArray.push(Object.assign({}, item2)),
        );
      } else {
        item.label !== '首页' && tempArray.push(Object.assign({}, item));
      }
    });
    return tempArray;
  };

  const getModule = item => {
    props.history.push(item.path);
    props.setCurrentPath(item.id);
  };

  return (
    <Fragment>
      <div>
        <p className="home-warning">
          尊敬的代理商你们好！欢迎使用校园卫士后台管理。请您仔细阅读文字以便于更好使用跟板板块内容。请务必记录真实的数据资料，以免平台可更好运营。
        </p>
        <List
          itemLayout="horizontal"
          className="no-scrollbar"
          style={{ overflow: 'auto' }}
          dataSource={getUserPower()}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    style={{
                      backgroundColor: '#1890ff',
                      verticalAlign: 'middle',
                    }}
                    size="large"
                  >
                    {item.Abbreviation}
                  </Avatar>
                }
                title={
                  <span className="title-span" onClick={() => getModule(item)}>
                    {item.label}
                  </span>
                }
                description={item.describe}
              />
            </List.Item>
          )}
        />
      </div>
    </Fragment>
  );
}

Home.propTypes = {
  menu: PropTypes.array,
  history: PropTypes.object,
  setCurrentPath: PropTypes.func,
};

const mapStateToProps = ({ common }) => {
  return {
    menu: common.menu,
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setCurrentPath: setCurrentPath,
    },
    dispatch,
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
