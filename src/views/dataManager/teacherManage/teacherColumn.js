import React from 'react';
import { isValidatePhone } from '@/utils/validate';
import { requestBaseUrl, imagesAddress } from '@/config/env';
import BaseUpload from '@/components/common/BaseUpload';
import ImagePreview from '@/components/common/ImagePreview';
const renderImagePreview = text => <ImagePreview text={text} />;
const renderBaseUpload = isDetail => (
  <BaseUpload type="onePicture" isDetail={isDetail} />
);
/**
 * title: 字段名，用于表格，搜索，表单
 * dataIndex： 字段key
 * width：表格字段宽度
 * hidden： 控制是否在表格中展示该字段
 * ellipsis: 控制是否使用省略
 * sorter：是否采用排序
 * search： 是否作为搜索条件
 * searchOrder： 搜索表单的排序
 * initValue： 搜索表单的初始值
 * edit: 是否作为表单
 * editFormOrder： 编辑表单的排序
 * editFormSpan: 每个所占的宽度
 * required： 是否必填
 * format: 自定义处理表单返回的数据, 参数1：本数据本字段值，参数2：本列， 参数3：此次新增所有数据，
 * 参数4：可用到的数据
 * selfKey: 表单字段名,默认取dataIndex
 * createInitValue: 新增表单的初始值
 * editInitValue: 编辑表单的初始值生成方法, 参数1：本数据本字段值，参数2： 本数据值
 * formItemRender: 编辑表单下面的自定义渲染，和回调方法绑定
 * bindParamOption: 给表单元素绑上事件
 * selfSelectDic: 自己从context中取数组, 值为具体属性
 * message: 校验不通过展示
 * needAutoRender 是否需要自动校验
 * validator： 自定义校验规则
 * placeholder: 表单placeholder
 * type： 属性展示形式
 * dicData: 匹配的数组，用于搜索和编辑
 * render: table中column展示方式
 * searchRender: 搜索表单中自定义渲染
 * editRender: 编辑表单中的自定义渲染
 * */
export const completeColumn = [
  {
    title: '校园名称',
    dataIndex: 'schoolId',
    overHidden: true,
    type: 'select',
    needAutoRender: true,
    dicData: [],
    searchOrder: 1,
    formItemRender: data => {
      if (data && data.teacherNum) {
        return (
          <div className="teacherNum">
            该学校已添加教师<span>{data.teacherNum}</span>人
          </div>
        );
      } else {
        return '';
      }
    },
    editFormOrder: 1,
    editFormSpan: 24,
    edit: true,
    required: true,
    search: true,
  },
  {
    title: '教师姓名',
    dataIndex: 'name',
    width: 100,
    overHidden: true,
    editFormOrder: 2,
    edit: true,
    search: true,
    required: true,
  },
  {
    title: '负责班级',
    dataIndex: 'classesName',
    overHidden: true,
    edit: true,
    required: true,
    editFormOrder: 4,
    type: 'select',
    dicData: [],
    selfSelectDic: 'mainClassArray',
    selfSelectDic2: 'mainClassArray2',
    selfKey: 'mainClass',
    search: true,
    paramName: 'mainClass',
  },
  {
    title: '教师职称',
    dataIndex: 'titleName',
    width: 100,
    type: 'select',
    dicData: [],
    format: (selfValue, selfColumn, values, EditFormBaseData) => {
      values.titleName = EditFormBaseData.teacherTitleArray.find(
        item => String(selfValue) === String(item.value),
      ).label;
      return selfValue;
    },
    overHidden: true,
    editFormOrder: 3,
    edit: true,
    search: true,
    paramName: 'titleId',
    required: true,
    selfSelectDic: 'teacherTitleArray',
    selfSelectDic2: 'teacherTitleArray2',
    selfKey: 'titleId',
  },
  {
    title: '代课班级',
    edit: true,
    hidden: true,
    type: 'multipleSelect',
    format: data => data.join(','),
    editInitValue: data => data.split(','),
    createInitValue: [],
    editFormOrder: 5,
    dicData: [],
    dataIndex: 'replaceClass',
    selfSelectDic: 'mainClassArray',
  },
  {
    title: '出生日期',
    edit: true,
    hidden: true,
    type: 'date',
    bindParamOption: { format: 'YYYY-MM-DD' },
    dataIndex: 'birthday',
  },
  {
    title: '性别',
    type: 'radio',
    dicData: ['男', '女'],
    createInitValue: '男',
    edit: true,
    hidden: true,
    searchOrder: 6,
    dataIndex: 'sex',
  },
  {
    title: '底库照片',
    edit: true,
    hidden: true,
    dataIndex: 'pictureUrl',
    editRender: renderBaseUpload,
    validator: (rule, value, callback) => {
      if (value.fileList && value.fileList.length > 0) {
        callback();
      } else {
        callback('请上传图片！');
      }
    },
    required: true,
    render: renderImagePreview,
    createInitValue: {
      formData: new FormData(),
      fileList: [],
    },
    editFormOrder: 7,
    editInitValue: (url, row) => {
      return {
        formData: new FormData(),
        fileList: row.pictureUrl
          ? [
              {
                uid: row.id,
                name: row.fileName,
                status: 'done',
                url: `${requestBaseUrl.substring(0, 14)}${imagesAddress}${
                  row.pictureUrl
                }`,
              },
            ]
          : [],
      };
    },
    selfKey: 'file',
  },
  {
    title: '手机号',
    dataIndex: 'tel',
    overHidden: true,
    searchOrder: 5,
    hidden: true,
    edit: true,
    required: true,
    search: true,
    width: 150,
    validator: (rule, value, callback) => {
      let tempObj = isValidatePhone(value);
      if (value && tempObj === true) {
        callback();
      } else {
        callback(tempObj);
      }
    },
  },
  {
    title: '是否为班主任',
    type: 'radio',
    dicData: [
      { value: '1', label: '是' },
      { value: '0', label: '否' },
    ],
    edit: true,
    hidden: true,
    editInitValue: data => (data ? String(data) : '0'),
    searchOrder: 6,
    editFormOrder: 6,
    dataIndex: 'isCalssTeacher',
  },
  {
    title: '是否为校长',
    type: 'radio',
    dicData: [
      { value: '1', label: '是' },
      { value: '0', label: '否' },
    ],
    edit: true,
    hidden: true,
    editInitValue: data => (data ? String(data) : '0'),
    searchOrder: 6,
    editFormOrder: 6,
    dataIndex: 'isHeadmaster',
  },
  {
    title: '是否上传图片',
    dataIndex: 'isPicture',
    overHidden: true,
    type: 'select',
    dicData: [
      { label: '已上传', value: '1' },
      { label: '未上传', value: '0' },
    ],
    render: text => (text ? '已上传' : '未上传'),
    searchOrder: 3,
    search: true,
  },
  {
    title: '上传时间',
    type: 'dateRange',
    width: 200,
    searchOrder: 2,
    search: true,
    isTimeRangeSearch: true,
    dataIndex: 'createTime',
  },
];
