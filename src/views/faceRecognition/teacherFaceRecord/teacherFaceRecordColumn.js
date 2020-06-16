import React from 'react';
import ImagePreview from '@/components/common/ImagePreview';
const renderImagePreview = text => <ImagePreview text={text} isFeishou="1" />;
export default [
  {
    title: '校园名称',
    dataIndex: 'schoolName',
    search: true,
    type: 'select',
    needAutoRender: true,
    dicData: [],
    overHidden: true,
  },
  {
    title: '手机号码',
    dataIndex: 'tel',
    width: 100,
    search: true,
    overHidden: true,
  },
  {
    title: '教师姓名',
    dataIndex: 'teacherName',
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
    dataIndex: 'teacherUrl',
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
    title: '拍摄地点',
    dataIndex: 'place',
    width: 150,
    overHidden: true,
  },
  {
    title: '时间段查找',
    dataIndex: 'sjdcz',
    type: 'dateRange',
    isTimeRangeSearch: true,
    isNosfm: true,
    width: 150,
    search: true,
    hidden: true,
  },
];
