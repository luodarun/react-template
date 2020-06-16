import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router';
import { requestBaseUrl } from '@/config/env';
import { login } from '../store/actions/common';
import { connect } from 'react-redux';
import { FormComponentProps } from 'antd/es/form';
import './login.less';
type LoginForm = FormComponentProps &
  RouteComponentProps & {
    login: any;
  };
const Login: React.FC<LoginForm> = props => {
  const handle = () => {
    props.form.validateFields((err, fieldsValue) => {
      fieldsValue.key = selfKey;
      props.login(fieldsValue);
    });
  };
  function getRandomData(length: number) {
    const staticArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let tempStr = '';
    for (let i = 0; i < length; i++) {
      tempStr += staticArray[Math.floor(Math.random() * 10)];
    }
    return tempStr;
  }
  const [selfKey, setSelfKey] = useState<string>(getRandomData(10));

  const [img, setImg] = useState<string>(
    requestBaseUrl + 'validateCode/loginValidateCode?key=' + selfKey,
  );

  const changeCode = () => {
    let tempKey = getRandomData(10);
    setSelfKey(tempKey);
    setImg(requestBaseUrl + 'validateCode/loginValidateCode?key=' + tempKey);
  };

  const { getFieldDecorator } = props.form;

  return (
    <Fragment>
      <div className="login-wrap">
        <Form className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名!' }],
            })(
              <Input
                size="large"
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="用户名"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input
                size="large"
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="密码"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('validateCode', {
              rules: [{ required: true, message: '请输入验证码!' }],
            })(
              <div>
                <Input
                  size="large"
                  style={{ width: 'calc(100% - 120px)' }}
                  prefix={
                    <Icon type="code" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  onPressEnter={handle}
                  placeholder="验证码"
                />
                ,
                <img
                  style={{ height: '40px', borderRadius: '4px' }}
                  onClick={changeCode}
                  src={img}
                  alt="验证码"
                />
              </div>,
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              size="large"
              onClick={handle}
              className="login-form-button"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Fragment>
  );
};
const WrappedLogin = Form.create({ name: 'login' })(Login);
export default connect(() => ({}), { login })(withRouter(WrappedLogin as any));
