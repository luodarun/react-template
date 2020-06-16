/*eslint-disable*/
import React from 'react';
import {requestBaseUrl, imagesAddress} from '@/config/env';
import BaseUpload from '@/components/common/BaseUpload';
import BaseEditor from '@/components/common/BaseEditor';
import ImagePreview from '@/components/common/ImagePreview';
import {bannerUpload} from '@/api/banner';
const renderBaseUpload = (isDetail) => <BaseUpload type='onePicture' isDetail={isDetail}/>;
const renderBaseEditor = (isDetail) => <BaseEditor tinymceId={ new Date().getTime() + '' } uploadFn={bannerUpload} isDetail={isDetail}/>;
const renderImagePreview = (text) => <ImagePreview text={text} />;

export default [
  {
    title: '校园名称',
    dataIndex: 'schoolId',
    search: true,
    editFormOrder: 1,
    type: 'select',
    needAutoRender: true,
    dicData: [],
    edit: true,
    required: true,
    overHidden: true
  },
  {
    title: '是否置顶',
    dataIndex: 'isTop',
    type: 'select',
    dicData: [
      {label: '是', value: '1'},
      {label: '否', value: '0'}
    ],
    needAutoRender: true,
    width: 100,
    editFormOrder: 2,
    edit: true,
    required: true,
    overHidden: true
  },
  {
    title: '缩略图',
    edit: true,
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
      fileList: []
    },
    editFormOrder: 7,
    editInitValue: (url, row) => {
      return {
        formData: new FormData(),
        fileList: row.pictureUrl ? [
          {
            uid: row.id,
            name: row.fileName,
            status: 'done',
            url: `${requestBaseUrl.substring(0, 14)}${imagesAddress}${row.pictureUrl}`
          }
        ] : []
      }
    },
    format: (a, b, c, d, e) => {
      if (a.fileList && a.fileList.length > 0 && !a.formData.get('file')) { // 是编辑之后没有传值
        c.fileName = e.fileName;
        c.pictureUrl = e.pictureUrl;
        return {formData: new FormData()};
      } else {
        return a;
      }
    },
    width: 100,
    selfKey: 'file'
  },
  {
    title: '上传时间',
    dataIndex: 'createTime',
    width: 150,
    overHidden: true
  },
  {
    title: '排序',
    type: 'number',
    dataIndex: 'sort',
    width: 100,
    edit: true,
    hidden: true
  },
  {
    title: '发布状态',
    type: 'select',
    dicData: [
      {label: '已发布', value: '1'},
      {label: '未发布', value: '0'}
    ],
    needAutoRender: true,
    dataIndex: 'state',
    width: 200
  },
  {
    title: '文章内容',
    editRender: renderBaseEditor,
    editFormSpan: 24,
    dataIndex: 'content',
    edit: true,
    hidden: true
  }
]
