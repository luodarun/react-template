import React from 'react';
import ImagePreview from '@/components/common/ImagePreview';
const renderImagePreview = text => {
  return <ImagePreview text={text} isFeishou="1" />;
};
export default [
  {
    title: '校园名称',
    dataIndex: 'schoolName',
    search: true,
    editFormOrder: 1,
    type: 'select',
    needAutoRender: true,
    dicData: [],
    required: true,
    overHidden: true,
  },
  {
    title: '人脸识别照片',
    edit: true,
    dataIndex: 'pictureUrl',
    render: renderImagePreview,
    width: 100,
  },
  {
    title: '识别时间',
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
