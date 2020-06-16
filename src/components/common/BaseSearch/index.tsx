/* eslint-disable */
import React, { memo, Fragment, useState, useContext, ReactNode } from 'react';
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Select,
  DatePicker,
  Icon,
  Cascader,
  TimePicker,
  InputNumber,
} from 'antd';
import { itemUndToEmp, getObjType, deepClone } from '@/utils/common';
import BaseInputRange from '@/components/common/BaseInputRange';
import { defaultFormat, allDateData } from '@/constant';
import { EditFormBaseContext } from '@/components/commonUse/useEditFormBase';
import { FormComponentProps } from 'antd/es/form';
const { Option } = Select;
const { RangePicker } = DatePicker;
const staticPlaceholder = {
  select: '请选择',
  multipleSelect: '请选择',
  radio: '请选择',
  cascader: '请选择',
  input: '请输入',
  date: '请选择',
  dateRange: '请选择',
  number: '请输入',
};
interface BaseSearchProps extends FormComponentProps {
  searchOption: {
    column: number;
    itemArray: Array<completeColumn>;
  };
  moreButton: ReactNode;
  searchFn: Function;
}
function BaseSearch(props: BaseSearchProps) {
  const { searchOption, moreButton, searchFn, moreContent } = props;
  const [expand, setExpand] = useState(false);
  const { EditFormBaseData, changeData }: any = useContext(EditFormBaseContext);
  const renderFormItem = ({
    type,
    placeholder,
    dicData = [],
    searchRender,
    startProp,
    endProp,
    bindParamOption2,
    selfSelectDic,
    selfSelectDic2,
  }: completeColumn) => {
    let bindParamOption3 = bindParamOption2;
    if (searchRender) {
      return searchRender();
    } else {
      if (selfSelectDic || selfSelectDic2) {
        // 是要自己获得值
        dicData =
          EditFormBaseData[
            (selfSelectDic2 as string) || (selfSelectDic as string)
          ] || [];
      }
      if (type === 'select' || type === 'radio' || type === 'multipleSelect') {
        return (
          <Select
            {...bindParamOption3}
            allowClear
            placeholder={placeholder || staticPlaceholder[type]}
          >
            {dicData.map(item =>
              getObjType(item) === 'string' ? (
                <Option value={item as string} key={item as string}>
                  {item}
                </Option>
              ) : (
                <Option
                  value={(item as dicDataObj).value}
                  key={(item as dicDataObj).value}
                >
                  {(item as dicDataObj).label}
                </Option>
              ),
            )}
          </Select>
        );
      } else if (type === 'cascader') {
        return (
          <Cascader
            {...bindParamOption3}
            options={dicData}
            allowClear
            placeholder={placeholder || staticPlaceholder[type]}
          />
        );
      } else if (type === 'date') {
        return (
          <DatePicker
            {...bindParamOption3}
            allowClear
            placeholder={placeholder || staticPlaceholder[type]}
          />
        );
      } else if (type === 'dateRange') {
        return <RangePicker {...bindParamOption3} />;
      } else if (type === 'number') {
        return (
          <InputNumber
            {...bindParamOption3}
            placeholder={placeholder || staticPlaceholder[type]}
          />
        );
      } else if (type === 'timePicker') {
        return (
          <TimePicker
            style={{ width: '100%' }}
            format="HH:mm"
            allowClear
            {...bindParamOption3}
            autoComplete="off"
          />
        );
      } else if (type === 'numberRange') {
        return (
          <BaseInputRange
            {...bindParamOption3}
            startProp={startProp}
            endProp={endProp}
          />
        );
      } else {
        return (
          <Input
            {...bindParamOption3}
            placeholder={placeholder || staticPlaceholder['input']}
            autoComplete="off"
          />
        );
      }
    }
  };

  const renderSearchForm = (option: {
    column: number;
    itemArray: Array<completeColumn>;
  }) => {
    const children = [];
    option.column = option.column || 3;
    option.itemArray = option.itemArray.sort((a, b) => {
      return (a.searchOrder as number) - (b.searchOrder as number);
    });
    const count = expand
      ? option.itemArray.length
      : option.itemArray.length > option.column - 1
      ? option.column - 1
      : option.itemArray.length;
    const { getFieldDecorator } = props.form;
    for (let i = 0; i < count; i++) {
      if (option.itemArray[i].type === 'numberRange') {
        option.itemArray[i].initValue.isBaseInputRange = '1';
      }
      children.push(
        <Col
          span={
            option.itemArray[i].searchSelfSpan
              ? option.itemArray[i].searchSelfSpan
              : 24 / option.column
          }
          key={i}
        >
          <Form.Item label={option.itemArray[i].title}>
            {getFieldDecorator(
              option.itemArray[i].paramName || option.itemArray[i].dataIndex,
              {
                initialValue: option.itemArray[i].initValue,
              },
            )(renderFormItem(option.itemArray[i]))}
          </Form.Item>
        </Col>,
      );
    }
    children.push(
      <Col
        span={
          option.itemArray.length % option.column < option.column - 1 && expand
            ? 24 -
              ((option.itemArray.length % option.column) * 24) / option.column
            : 24 / option.column
        }
        key="actionButton"
        style={{
          textAlign:
            option.itemArray.length % option.column < option.column - 1 &&
            expand
              ? 'right'
              : 'left',
        }}
      >
        <Form.Item>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>
            重置
          </Button>
          {option.itemArray.length > option.column - 1 ? (
            <a style={{ marginLeft: 8, fontSize: 12 }} onClick={toggle}>
              {expand ? '收起' : '展开'} <Icon type={expand ? 'up' : 'down'} />
            </a>
          ) : (
            ''
          )}
          {moreButton}
        </Form.Item>
      </Col>,
    );
    return children;
  };

  const handleSearch = (e: React.FormEvent<any>) => {
    e.preventDefault();
    let tempArray = searchOption.itemArray.map(
      item => item.paramName || item.dataIndex,
    );
    let tempObj = itemUndToEmp(props.form.getFieldsValue());
    let tempObj2 = deepClone(tempObj);
    for (let i in tempObj2) {
      if (
        getObjType(tempObj2[i]) === 'object' &&
        tempObj2[i].isBaseInputRange === '1'
      ) {
        // 如果是对象属性且为范围
        let tempObj3 = tempObj2[i];
        delete tempObj3.isBaseInputRange;
        delete tempObj[i];
        tempObj = { ...tempObj, ...tempObj3 };
      }
      if (
        tempObj2[i] &&
        allDateData.includes(
          searchOption.itemArray[tempArray.indexOf(i)].type as string,
        )
      ) {
        // 是日期格式需要处理
        let tempStr = '';
        if (
          searchOption.itemArray[tempArray.indexOf(i)].bindParamOption2 &&
          searchOption.itemArray[tempArray.indexOf(i)].bindParamOption2.format
        ) {
          tempStr =
            searchOption.itemArray[tempArray.indexOf(i)].bindParamOption2
              .format;
        } else {
          tempStr =
            defaultFormat[
              searchOption.itemArray[tempArray.indexOf(i)].type as string
            ];
        }
        if (getObjType(tempObj2[i]) === 'array') {
          if (tempObj2[i].length > 0) {
            let tempStr2 =
              searchOption.itemArray[tempArray.indexOf(i)].dataArrayName || i;
            if (
              searchOption.itemArray[tempArray.indexOf(i)].isTimeRangeSearch
            ) {
              // 只要startTime和endTime
              tempObj['startTime'] =
                tempObj2[i][0].format(tempStr) +
                (searchOption.itemArray[tempArray.indexOf(i)].isNosfm
                  ? ''
                  : ' 00:00:00');
              tempObj['endTime'] =
                tempObj2[i][1].format(tempStr) +
                (searchOption.itemArray[tempArray.indexOf(i)].isNosfm
                  ? ''
                  : ' 23:59:59');
            } else {
              tempObj[tempStr2 + 'Start'] = tempObj2[i][0].format(tempStr);
              tempObj[tempStr2 + 'End'] = tempObj2[i][1].format(tempStr);
            }
          }
          delete tempObj[i];
        } else {
          tempObj[i] = tempObj2[i].format(tempStr);
        }
      }
      if (searchOption.itemArray[tempArray.indexOf(i)].formatSearchParams) {
        tempObj[i] = (searchOption.itemArray[tempArray.indexOf(i)]
          .formatSearchParams as formatSearchParamsFunc)(tempObj2[i]);
      }
    }
    searchFn(tempObj, 'query');
  };

  const handleReset = () => {
    props.form.resetFields();
    let tempObj = itemUndToEmp(props.form.getFieldsValue());
    let tempObj2 = deepClone(tempObj);
    for (let i in tempObj2) {
      if (
        getObjType(tempObj2[i]) === 'object' &&
        tempObj2[i].isBaseInputRange === '1'
      ) {
        // 如果是对象属性且为范围
        let tempObj3 = tempObj2[i];
        delete tempObj3.isBaseInputRange;
        delete tempObj[i];
        tempObj = { ...tempObj, ...tempObj3 };
      }
    }
    searchFn(tempObj, 'reset');
  };

  const toggle = () => {
    setExpand(!expand);
  };

  return (
    <Fragment>
      <Form className="ant-search-form" onSubmit={handleSearch}>
        <Row gutter={24}>{renderSearchForm(searchOption)}</Row>
      </Form>
      {moreContent}
    </Fragment>
  );
}

export default memo(Form.create<BaseSearchProps>({})(BaseSearch));
