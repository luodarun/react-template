import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

class Main extends Component {
  static propTypes = {
    children: PropTypes.any,
  };

  render() {
    return <Fragment>{this.props.children}</Fragment>;
  }
}
export default withRouter(Main);
