import React from 'react';
import BaseEditor from '@/components/common/BaseEditor';
import { newsUpload } from '@/api/schoolNews';
const renderBaseEditor = isDetail => (
  <BaseEditor
    tinymceId={new Date().getTime() + ''}
    uploadFn={newsUpload}
    isDetail={isDetail}
  />
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
    width: 200,
  },
  {
    title: '是否置顶',
    dataIndex: 'isTop',
    type: 'select',
    dicData: [
      { label: '是', value: '1' },
      { label: '否', value: '0' },
    ],
    required: true,
    width: 100,
    edit: true,
    hidden: true,
  },
  {
    title: '是否启用',
    dataIndex: 'state',
    type: 'radio',
    dicData: [
      { label: '是', value: '1' },
      { label: '否', value: '0' },
    ],
    createInitValue: '1',
    editInitValue: data => (data ? String(data) : '0'),
    needAutoRender: true,
    search: true,
    width: 100,
    required: true,
    edit: true,
    overHidden: true,
  },
  {
    title: '排序',
    type: 'number',
    dataIndex: 'sort',
    width: 100,
    required: true,
    edit: true,
    hidden: true,
  },
  {
    title: '文章标题',
    edit: true,
    required: true,
    search: true,
    dataIndex: 'title',
    editFormSpan: 24,
  },
  {
    title: '发布时间',
    dataIndex: 'createTime',
    width: 100,
    overHidden: true,
  },
  {
    title: '简介',
    editFormSpan: 24,
    type: 'textarea',
    dataIndex: 'content',
    required: true,
    edit: true,
    hidden: true,
  },
  {
    title: '文章内容',
    editRender: renderBaseEditor,
    editFormSpan: 24,
    dataIndex: 'mkContent',
    edit: true,
    hidden: true,
  },
];
