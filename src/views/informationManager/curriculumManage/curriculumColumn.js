import React from 'react';
import EditableTable from '@/components/common/EditableTable';
import BaseUpload from '@/components/common/BaseUpload';
const renderBaseUpload = (isDetail, rowData) => (
  <BaseUpload
    acceptType=".xls,.xlsx"
    isDetail={isDetail}
    rowData={rowData}
    type="oneFile"
    templateURL="课程表导入模板.xlsx"
    actionName="上传表格"
  />
);
const renderEditableTable = (isDetail, rowData) => (
  <EditableTable isDetail={isDetail} rowData={rowData} />
);
export default [
  {
    title: '校园名称',
    dataIndex: 'schoolId',
    search: true,
    type: 'select',
    needAutoRender: true,
    dicData: [],
    edit: true,
    overHidden: true,
    required: true,
  },
  {
    title: '对应班级',
    dataIndex: 'classesName',
    type: 'select',
    dicData: [],
    selfSelectDic: 'forClassArray',
    selfSelectDic2: 'forClassArray2',
    search: true,
    required: true,
    width: 200,
    edit: true,
    selfKey: 'classesId',
  },
  {
    title: '是否录入',
    dataIndex: 'isData',
    type: 'radio',
    dicData: [
      { label: '是', value: '1' },
      { label: '否', value: '0' },
    ],
    createInitValue: '1',
    editInitValue: data => (data ? String(data) : '0'),
    needAutoRender: true,
    search: true,
    width: 200,
    required: true,
    edit: true,
    overHidden: true,
  },
  {
    title: '周期名称',
    dataIndex: 'cycle',
    width: 200,
    required: true,
    edit: true,
    overHidden: true,
  },
  {
    title: '使用周期',
    type: 'dateRange',
    search: true,
    dataIndex: 'cycleStartAndEnd',
    dataArrayName: 'cycle',
    render: (data, rowData) => {
      return rowData['cycleStart'] + '至' + rowData['cycleEnd'];
    },
    width: 200,
    required: true,
    edit: true,
  },
  {
    title: '课程表',
    dataIndex: 'courseDetailList',
    editFormSpan: 24,
    editRender: renderEditableTable,
    editInitValue: data => data,
    validator: (rule, value, callback) => {
      callback();
    },
    edit: true,
    hidden: true,
  },
  {
    title: '课程表文件',
    dataIndex: 'file',
    editFormSpan: 24,
    editRender: renderBaseUpload,
    createInitValue: {
      fileList: [],
    },
    editInitValue: () => ({
      fileList: [],
    }),
    validator: (rule, value, callback) => {
      callback();
    },
    edit: true,
    hidden: true,
  },
];
