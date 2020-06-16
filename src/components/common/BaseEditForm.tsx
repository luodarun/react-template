/*eslint-disable*/
import React, {
  memo,
  Fragment,
  useImperativeHandle,
  forwardRef,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
// import PropTypes from 'prop-types'
import {
  getObjType,
  isNotEmpty,
  renderSelect,
  deleteEmptyItem,
  getNumber,
} from '@/utils/common';
import { EditFormBaseContext } from '@/components/commonUse/useEditFormBase';
import { defaultValidType, defaultFormat, allDateData } from '@/constant';
import moment from 'moment';
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  DatePicker,
  Radio,
  InputNumber,
  Cascader,
  TimePicker,
} from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { completeColumn } from '@/views/dataManager/studentManage/studentColumn';
const staticPlaceholder: stringObj = {
  select: '请选择',
  input: '请输入',
  date: '请选择',
  dateRange: '请选择',
  numberRange: '请输入数值',
  number: '请输入数值',
  cascader: '请选择',
  multipleSelect: '请选择',
  timePicker: '请选择',
  textarea: '请输入',
};
const { RangePicker } = DatePicker;
const { TextArea } = Input;
type BaseEditFormProps = FormComponentProps & {
  isDetail: boolean;
  rowData: any;
  selfEditForm: (data: any) => ReactNode;
  formItems: Array<completeColumn>;
};
const BaseEditForm = forwardRef((props: BaseEditFormProps, ref) => {
  const { form, isDetail, rowData, selfEditForm } = props;

  let { formItems } = props;

  formItems = formItems.sort((a, b) => {
    return getNumber(a.editFormOrder) - getNumber(b.editFormOrder);
  });

  const [otherParams, setOtherParams] = useState({});
  const { EditFormBaseData, changeData }: any = useContext(EditFormBaseContext);
  useImperativeHandle(ref, () => ({
    validateForm: (callbackFn: Function) =>
      form.validateFields((err, values) => {
        values = deleteEmptyItem(values);
        let tempArray = Object.keys(values),
          tempArray2 = formItems.map(
            tempFormItem => tempFormItem.selfKey || tempFormItem.dataIndex,
          );
        tempArray.forEach(tempFormItemValue => {
          if (formItems[tempArray2.indexOf(tempFormItemValue)].format) {
            (formItems[tempArray2.indexOf(tempFormItemValue)]
              .format as formatFunc)(
              values[tempFormItemValue],
              formItems[tempArray2.indexOf(tempFormItemValue)],
              values,
              EditFormBaseData,
              rowData,
            );
          } else {
            if (
              allDateData.includes(
                formItems[tempArray2.indexOf(tempFormItemValue)].type || '',
              )
            ) {
              // 是日期型数据
              let selfFormat = '';
              if (
                formItems[tempArray2.indexOf(tempFormItemValue)]
                  .bindParamOption &&
                formItems[tempArray2.indexOf(tempFormItemValue)].bindParamOption
                  .format
              ) {
                selfFormat =
                  formItems[tempArray2.indexOf(tempFormItemValue)]
                    .bindParamOption.format;
              } else {
                selfFormat =
                  defaultFormat[
                    formItems[tempArray2.indexOf(tempFormItemValue)].type || ''
                  ];
              }
              if (
                values[tempFormItemValue] &&
                values[tempFormItemValue] instanceof Array
              ) {
                // 是数组行
                let tempStr =
                  formItems[tempArray2.indexOf(tempFormItemValue)]
                    .dataArrayName || tempFormItemValue;
                values[tempStr + 'Start'] = values[tempFormItemValue][0].format(
                  selfFormat,
                );
                values[tempStr + 'End'] = values[tempFormItemValue][1].format(
                  selfFormat,
                );
                delete values[tempFormItemValue];
              } else {
                values[tempFormItemValue] = values[tempFormItemValue].format(
                  selfFormat,
                );
              }
            }
          }
        });
        callbackFn(err, { ...values, ...otherParams });
      }),
    resetForm: form.resetFields,
  }));

  useEffect(() => {
    // 需要初始化触发事件
    if (isNotEmpty(rowData)) {
      formItems.forEach(tempItem => {
        if (tempItem.bindParamOption) {
          // 如果有绑定事件
          for (let i in tempItem.bindParamOption) {
            getObjType(tempItem.bindParamOption[i]) === 'function' &&
              tempItem.bindParamOption[i](
                rowData[tempItem.selfKey || tempItem.dataIndex],
              );
          }
        }
      });
    }
  }, [rowData]);

  const getValidator = (item: completeColumn) => {
    if (item.validator) {
      return (rule: any, value: any, callback: any) =>
        item.validator &&
        item.validator(rule, value, callback, form.getFieldsValue());
    } else {
      return item.type !== 'date' && item.type !== 'dateRange'
        ? undefined
        : (rule: any, value: any, callback: any) => {
            callback();
          };
    }
  };

  const getItemSpan = (item: completeColumn) => {
    return item.editFormSpan || (item.type === 'textarea' ? 24 : 12);
  };

  const getInitValue = (item: completeColumn) => {
    if (item.createInitValue) {
      return item.createInitValue;
    } else {
      if (item.type === 'radio') {
        return item.dicData && (item.dicData[0] as dicDataObj).value;
      } else {
        return null;
      }
    }
  };

  const getEditInitValue = (item: completeColumn) => {
    if (item.editInitValue) {
      return item.editInitValue(
        rowData[item.selfKey || item.dataIndex],
        rowData,
      );
    } else {
      if (item.type === 'number' || item.type === 'numberRange') {
        return rowData[item.selfKey || item.dataIndex] || 0;
      } else if (item.type && allDateData.includes(item.type)) {
        // 是日期
        let tempFormat = '';
        if (item.bindParamOption && item.bindParamOption.format) {
          tempFormat = item.bindParamOption.format;
        } else {
          tempFormat = defaultFormat[item.type];
        }
        if (item.type.indexOf('Range') >= 0) {
          //是数组型日期
          let tempParamNameStart =
            (item.dataArrayName || item.selfKey || item.dataIndex) + 'Start';
          let tempParamNameEnd =
            (item.dataArrayName || item.selfKey || item.dataIndex) + 'End';
          if (rowData[tempParamNameStart]) {
            return [
              moment(rowData[tempParamNameStart], tempFormat),
              moment(rowData[tempParamNameEnd], tempFormat),
            ];
          } else {
            return null;
          }
        } else {
          return rowData[item.selfKey || item.dataIndex]
            ? moment(rowData[item.selfKey || item.dataIndex], tempFormat)
            : null;
        }
      } else {
        return rowData[item.selfKey || item.dataIndex]
          ? rowData[item.selfKey || item.dataIndex] + '' || ''
          : '';
      }
    }
  };

  const renderFormItem = ({
    type,
    placeholder,
    dicData = [],
    editRender,
    bindParamOption,
    selfSelectDic,
  }: completeColumn) => {
    if (editRender) {
      return editRender(isDetail, rowData);
    }
    if (selfSelectDic) {
      // 是要自己获得值
      dicData = EditFormBaseData[selfSelectDic] || [];
    }
    if (type === 'select') {
      return (
        <Select
          disabled={isDetail}
          {...bindParamOption}
          placeholder={placeholder || staticPlaceholder[type]}
        >
          {renderSelect(dicData)}
        </Select>
      );
    } else if (type === 'radio') {
      return (
        <Radio.Group disabled={isDetail} {...bindParamOption}>
          {renderSelect(dicData, 'radio')}
        </Radio.Group>
      );
    } else if (type === 'cascader') {
      return (
        <Cascader
          {...bindParamOption}
          options={dicData}
          placeholder={placeholder || staticPlaceholder[type]}
        />
      );
    } else if (type === 'multipleSelect') {
      return (
        <Select
          disabled={isDetail}
          mode="multiple"
          {...bindParamOption}
          placeholder={placeholder || staticPlaceholder[type]}
        >
          {renderSelect(dicData)}
        </Select>
      );
    } else if (type === 'dateRange') {
      return <RangePicker {...bindParamOption} disabled={isDetail} />;
    } else if (type === 'date') {
      return (
        <DatePicker
          disabled={isDetail}
          {...bindParamOption}
          placeholder={placeholder || staticPlaceholder[type]}
        />
      );
    } else if (type === 'timePicker') {
      return (
        <TimePicker
          style={{ width: '100%' }}
          {...bindParamOption}
          placeholder={placeholder || staticPlaceholder[type]}
          autoComplete="off"
        />
      );
    } else if (type === 'textarea') {
      return (
        <TextArea
          disabled={isDetail}
          {...bindParamOption}
          placeholder={placeholder || staticPlaceholder[type]}
          autoSize={{ minRows: 2, maxRows: 4 }}
        />
      );
    } else if (type === 'number' || type === 'numberRange') {
      return (
        <InputNumber
          disabled={isDetail}
          {...bindParamOption}
          placeholder={placeholder || staticPlaceholder[type]}
        />
      );
    } else {
      return (
        <Input
          disabled={isDetail}
          {...bindParamOption}
          placeholder={placeholder || staticPlaceholder[type || 'input']}
          autoComplete="off"
        />
      );
    }
  };

  function getFields() {
    const { getFieldDecorator } = form;
    const children: Array<ReactNode> = [];
    let allSpan = formItems.reduce((total, item) => {
      return total + getItemSpan(item);
    }, 0);
    const rowArray = new Array(Math.ceil(allSpan / 24));
    let reduceSpan = 0;
    for (let i = 0; i < formItems.length; i++) {
      reduceSpan += getItemSpan(formItems[i]);
      if (
        !rowArray[Math.ceil(reduceSpan / 24) - 1] ||
        rowArray[Math.ceil(reduceSpan / 24) - 1].length === 0
      ) {
        rowArray[Math.ceil(reduceSpan / 24) - 1] = [];
      }
      rowArray[Math.ceil(reduceSpan / 24) - 1].push(
        <Col span={getItemSpan(formItems[i])} key={i}>
          <Form.Item label={formItems[i].title}>
            {getFieldDecorator(formItems[i].selfKey || formItems[i].dataIndex, {
              initialValue: isNotEmpty(rowData)
                ? getEditInitValue(formItems[i])
                : getInitValue(formItems[i]),
              rules: [
                {
                  type:
                    defaultValidType[formItems[i].type as string] || 'string',
                  required: !isDetail && formItems[i].required,
                  message: formItems[i].validator
                    ? ''
                    : formItems[i].message || '请赋值',
                  whitespace: true,
                  validator: getValidator(formItems[i]),
                },
              ],
            })(renderFormItem(formItems[i]))}
          </Form.Item>
          {formItems[i].formItemRender &&
            (formItems[i].formItemRender as (data: any) => ReactNode)(
              EditFormBaseData,
            )}
        </Col>,
      );
    }
    rowArray.forEach((item, index) => {
      children.push(
        <Row gutter={24} key={index}>
          {item}
        </Row>,
      );
    });
    return children;
  }

  return (
    <Fragment>
      <Form className="ant-search-form base-edit-form">
        {getFields()}
        {selfEditForm && selfEditForm(form.getFieldDecorator)}
      </Form>
    </Fragment>
  );
});

export default memo(Form.create<BaseEditFormProps>({})(BaseEditForm));
