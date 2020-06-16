/*eslint-disable*/
import React, {memo, Fragment, useState, forwardRef, useImperativeHandle, useMemo, useRef} from 'react'
// import PropTypes from 'prop-types'
import {getObjType, isNotEmpty, renderSelect} from '@/utils/common'
import BaseModal from '@/components/common/BaseModal';
import {findAllClassesBySchoolId} from '@/api/classes';
import {Row, Col, Form, Input, Select, InputNumber, Button} from 'antd'

const TypeSettingForm = forwardRef((props, ref) => {
  const {form, schoolArray} = props;
  const {getFieldDecorator} = form;
  const [otherParams, setOtherParams] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [classArrays, setClassArrays] = useState([]);
  const [examType, setExamType] = useState([]);
  const [examArray, setExamArray] = useState([]);
  const newKm = useRef(null);
  useImperativeHandle(ref, () => ({
    validateForm: (callbackFn) => form.validateFields((err, values) => {
      callbackFn(err, {...values, ...otherParams});
    }),
    resetForm: form.resetFields
  }));

  const setSchoolName = (a, b) => {
    findAllClassesBySchoolId(a).then(res => {
      setClassArrays(res.data);
    });
    setOtherParams({...otherParams, schoolName: b.props.children});
  }

  const setKsls = (a, b) => {

  }

  const setkskm = (a, b) => {

  }

  const addKm = (selfType) => {
    if (selfType === 'close') {
      setModalVisible(false);
    } else {
      newKm.current.validateFields((err, values) => {
        if (!err) {
          examArray.push(values);
          setExamArray(examArray);
          setModalVisible(false);
        }
      });
    }
  }

  const EasyForm = (props) => {
    const {form} = props;
    const {getFieldDecorator} = form;
    return <Form className="ant-search-form class-manage-edit">
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label='科目名称'>
            {getFieldDecorator('kmmc', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '请输入',
                  whitespace: true
                }
              ]
            })(
              <Input />
            )}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label='科目总分'>
            {getFieldDecorator('kmzf', {
              initialValue: 0,
              rules: [
                {
                  type: 'number',
                  required: true,
                  message: '请输入',
                  whitespace: true
                }
              ]
            })(
              <InputNumber />
            )}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  }

  const WrapEasyForm = Form.create({})(EasyForm);

  const renderDetailModal = () => {
    return (<BaseModal modalTitle='新增科目' modalVisible={modalVisible} hideModal={addKm} noContinue={true}>
              <WrapEasyForm ref={newKm}/>
          </BaseModal>);
  }

  const actionRenderDetailModal = useMemo(()=>renderDetailModal(), [modalVisible]);

  const renderExamArray = () => {
    return examArray.map((item, index) => {
      return <Col  span={12} key={index}>
        <Form.Item label={item.kmmc}>
          {getFieldDecorator(item.kmmc, {
            initialValue: item.kmzf,
            rules: [
              {
                type: 'number',
                required: true,
                message: '请输入',
                whitespace: true
              }
            ]
          })(
            <InputNumber placeholder='总分设置' />
          )}
        </Form.Item>
      </Col>
    });
  }

  return (
    <Fragment>
      <Form className="ant-search-form class-manage-edit">
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item label='校园名称'>
              {getFieldDecorator('schoolId', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: '请选择校园',
                    whitespace: true
                  }
                ]
              })(
                <Select placeholder='请选择' onChange={setSchoolName}>
                  {renderSelect(schoolArray)}
                </Select>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label='所属班级'>
              {getFieldDecorator('ssbj', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: '请选择班级',
                    whitespace: true
                  }
                ]
              })(
                <Select placeholder='请选择' onChange={setKsls}>
                  {renderSelect(classArrays)}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='考试类型'>
              {getFieldDecorator('kslx', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: '请输入考试类型',
                    whitespace: true
                  }
                ]
              })(
                <Select placeholder='请选择' onChange={setkskm}>
                  {renderSelect(examType)}
                </Select>
              )}
            </Form.Item>
          </Col>
        </Row>
        <div style={{border: '1px solid #d5d5d5', padding: '10px', borderRadius: '4px'}}>
          <div style={{textAlign: 'right', marginBottom: '6px'}}>
            <Button type='primary' onClick={() => setModalVisible(true)}>添加科目</Button>
          </div>
          <Row>
            {renderExamArray()}
          </Row>
        </div>
      </Form>
      {actionRenderDetailModal}
    </Fragment>
  )
})

export default memo(Form.create({})(TypeSettingForm))
