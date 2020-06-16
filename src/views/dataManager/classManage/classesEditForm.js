import React, {
  memo,
  Fragment,
  useState,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { isNotEmpty, renderSelect, getValueAndLabel } from '@/utils/common';
import BaseModal from '@/components/common/BaseModal';
import {
  findAllClassesBySchoolId,
  findClassesCountGroupByClassesType,
} from '@/api/classes';
import { classNameList, levelTypes } from '@/constant';
import { Row, Col, Form, Select, Cascader, InputNumber } from 'antd';
import { findTeacherBySchooId } from '@/api/teacher';
const classesEditForm = forwardRef((props, ref) => {
  const { form, isDetail, rowData, formItems } = props;
  const { getFieldDecorator } = form;
  const [otherParams, setOtherParams] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [schoolArrays, setSchoolArrays] = useState([]);
  const [schoolDetailArrays, setSchoolDetailArrays] = useState({});
  const [teacherArray, setTeacherArray] = useState([]);
  useImperativeHandle(ref, () => ({
    validateForm: callbackFn =>
      form.validateFields((err, values) => {
        callbackFn(err, { ...rowData, ...values, ...otherParams });
      }),
    resetForm: form.resetFields,
  }));

  useEffect(() => {}, []);

  const setSchoolName = (a, b) => {
    findClassesCountGroupByClassesType(a).then(res => {
      setSchoolArrays(res.data);
    });
    findTeacherBySchooId(a).then(res => {
      setTeacherArray(getValueAndLabel(res.data, 'id', 'name'));
      form.resetFields(['teacherId']);
    });
    setOtherParams({ ...otherParams, schoolName: b.props.children });
  };

  const getTeacherName = (a, b) => {
    setOtherParams({ ...otherParams, teacherName: b.props.children });
  };

  const setClassTypeAndGrade = a => {
    setOtherParams({
      ...otherParams,
      classType: a[1].substring(0, 1),
      grade: a[1].substring(1),
    });
  };

  const getSchoolDetailClasses = () => {
    findAllClassesBySchoolId(form.getFieldValue('schoolId')).then(res => {
      let tempData = {
        schoolName: '',
        allClassCount: res.data.length,
        allDetailClasses: {
          小: [],
          初: [],
          高: [],
        },
      };
      res.data.forEach(item => {
        tempData.allDetailClasses[item.classesName.substring(0, 1)].push(
          item.classesName,
        );
      });
      setSchoolDetailArrays(tempData);
      setModalVisible(true);
    });
  };

  const makeSpans = () => {
    const tempArray = [];
    schoolArrays.forEach((item, index) => {
      tempArray.push(
        <div key={index}>
          <span>{item['classesNum']}</span>
          {levelTypes[item.classType]}
        </div>,
      );
    });
    return tempArray;
  };

  const renderDetailModal = () => {
    return isNotEmpty(schoolDetailArrays) ? (
      <BaseModal
        modalTitle="校园班级详情"
        modalVisible={modalVisible}
        hideModal={() => setModalVisible(false)}
      >
        <div className="detail-class-count">
          黄冈外校已编辑班级：{schoolDetailArrays.allClassCount}
          {Object.keys(schoolDetailArrays.allDetailClasses).map(
            (item, index) => (
              <div key={index}>
                {levelTypes[item]}:{' '}
                {schoolDetailArrays.allDetailClasses[item].length}
              </div>
            ),
          )}
        </div>
        <div>
          {Object.keys(schoolDetailArrays.allDetailClasses).map(
            (item, index) => (
              <div className="detail-class-list" key={index}>
                <div>{levelTypes[item]}班级：</div>
                <div>
                  {schoolDetailArrays.allDetailClasses[item].join('、')}
                </div>
              </div>
            ),
          )}
        </div>
      </BaseModal>
    ) : (
      ''
    );
  };

  const actionRenderDetailModal = useMemo(() => renderDetailModal(), [
    schoolDetailArrays,
    modalVisible,
  ]);

  return (
    <Fragment>
      <Form className="ant-search-form class-manage-edit">
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item label="校园名称">
              {getFieldDecorator('schoolId', {
                initialValue: isNotEmpty(rowData)
                  ? String(rowData['schoolId'])
                  : '',
                rules: [
                  {
                    required: true,
                    message: '请选择校园',
                    whitespace: true,
                  },
                ],
              })(
                <Select
                  disabled={isDetail}
                  placeholder="请选择"
                  onChange={setSchoolName}
                >
                  {renderSelect(formItems[0].dicData)}
                </Select>,
              )}
            </Form.Item>
            {schoolArrays.length > 0 && (
              <div className="school-info" onClick={getSchoolDetailClasses}>
                该学校已添加班级{makeSpans()}
              </div>
            )}
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="年级类型">
              {getFieldDecorator('gradeType', {
                initialValue: isNotEmpty(rowData)
                  ? [
                      rowData['classType'],
                      rowData['classType'] + rowData['grade'],
                    ]
                  : [],
                rules: [
                  {
                    required: true,
                    message: '请选择年级',
                    whitespace: true,
                    validator: (rule, value, callback) => {
                      if (value && value.length === 2) {
                        callback();
                        return;
                      }
                      callback('请选择年级!');
                    },
                  },
                ],
              })(
                <Cascader
                  options={formItems[1].dicData}
                  disabled={isDetail}
                  placeholder="请选择"
                  onChange={setClassTypeAndGrade}
                />,
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="班级名称">
              {getFieldDecorator('className', {
                initialValue: isNotEmpty(rowData)
                  ? String(rowData['className'])
                  : [],
                rules: [
                  {
                    required: true,
                    message: '请输入班级名称',
                    whitespace: true,
                  },
                ],
              })(
                <Select disabled={isDetail} placeholder="请选择">
                  {renderSelect(classNameList)}
                </Select>,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="班主任姓名">
              {getFieldDecorator('teacherId', {
                initialValue: isNotEmpty(rowData) ? rowData['teacherId'] : '',
                rules: [
                  {
                    required: false,
                    message: '请选择',
                    whitespace: true,
                  },
                ],
              })(
                <Select
                  disabled={isDetail}
                  placeholder="请选择"
                  onChange={getTeacherName}
                >
                  {renderSelect(teacherArray)}
                </Select>,
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="班级人数">
              {getFieldDecorator('classNum', {
                initialValue: isNotEmpty(rowData) ? rowData['classNum'] : '',
                rules: [
                  {
                    type: 'number',
                    required: true,
                    message: '请输入班级人数',
                    whitespace: true,
                  },
                ],
              })(
                <InputNumber
                  disabled={isDetail}
                  placeholder="请输入"
                  autoComplete="off"
                />,
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
      {actionRenderDetailModal}
    </Fragment>
  );
});

classesEditForm.propTypes = {
  form: PropTypes.object,
  isDetail: PropTypes.bool,
  rowData: PropTypes.object,
  formItems: PropTypes.array,
};

export default memo(Form.create({})(classesEditForm));
