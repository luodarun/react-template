import React from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './BaseLoading.less';

const Loader = ({ spinning = true }) => {
  return (
    <div
      className={classNames('loadingBox', {
        hidden: !spinning,
      })}
    >
      <div className="overlay"></div>
      <div className="loadingShow">
        <Icon type="sync" spin />
        <span>疯狂加载中，请稍后...</span>
      </div>
    </div>
  );
};

Loader.propTypes = {
  spinning: PropTypes.bool,
};

export default Loader;
