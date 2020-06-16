import React from 'react';
import ImagePreview from '@/components/common/ImagePreview';
import { levelTypes } from '@/constant/index';
const renderImagePreview = text => {
  return <ImagePreview text={text} isFeishou="1" />;
};
export default [
  {
    title: '校园名称',
    dataIndex: 'schoolName',
    search: true,
    type: 'select',
    needAutoRender: true,
    dicData: [],
    overHidden: true,
    paramName: 'schoolId',
  },
  {
    title: '班级名称',
    dataIndex: 'className',
    render: (text, row) => {
      return levelTypes[row.classType] + text + '班';
    },
    width: 100,
    search: true,
    overHidden: true,
    type: 'select',
    selfSelectDic2: 'forClassArray2',
    paramName: 'classId',
  },
  {
    title: '学生姓名',
    dataIndex: 'studentName',
    width: 150,
    search: true,
    overHidden: true,
  },
  {
    title: '人脸识别照片',
    dataIndex: 'pictureUrl',
    render: renderImagePreview,
    width: 100,
  },
  {
    title: '人脸底库照片',
    dataIndex: 'studentUrl',
    render: renderImagePreview,
    width: 100,
  },
  {
    title: '最新识别时间',
    dataIndex: 'pictureTime',
    width: 150,
    overHidden: true,
  },
  {
    title: '拍摄位置',
    dataIndex: 'place',
    width: 150,
    overHidden: true,
  },
  {
    title: '时间段查找',
    dataIndex: 'sjdcz',
    type: 'dateRange',
    width: 150,
    isTimeRangeSearch: true,
    isNosfm: true,
    search: true,
    hidden: true,
  },
];
