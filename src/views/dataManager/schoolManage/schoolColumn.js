import React from 'react';
import { cityList } from '@/constant';

import { requestBaseUrl, imagesAddress } from '@/config/env';
import BaseUpload from '@/components/common/BaseUpload';
const provinceList = cityList.map(item => item.province);

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
 * selfKey: 表单字段名,默认取dataIndex
 * createInitValue: 新增表单的初始值
 * editInitValue: 编辑表单的初始值生成方法, 参数1：本数据本字段值，参数2： 本数据值
 * message: 校验不通过展示
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
    dataIndex: 'name',
    overHidden: true,
    searchOrder: 1,
    editFormOrder: 1,
    width: 200,
    edit: true,
    required: true,
    search: true,
  },
  {
    title: '所属省份',
    dataIndex: 'provice',
    width: 200,
    overHidden: true,
    type: 'select',
    searchOrder: 4,
    editFormOrder: 2,
    edit: true,
    required: true,
    dicData: provinceList,
    search: true,
  },
  {
    title: '学校校徽',
    dataIndex: 'isPicture',
    overHidden: true,
    type: 'select',
    dicData: [
      { label: '已上传', value: '1' },
      { label: '未上传', value: '0' },
    ],
    render: text => (text === '1' ? '已上传' : '未上传'),
    searchOrder: 2,
    editFormOrder: 3,
    edit: true,
    search: true,
    editRender: renderBaseUpload,
    validator: (rule, value, callback) => {
      callback();
    },
    createInitValue: {
      formData: new FormData(),
      fileList: [],
    },
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
    title: '校园学生总数',
    dataIndex: 'studentNum',
    overHidden: true,
    required: true,
    type: 'numberRange',
    message: '请输入正确数值',
    searchOrder: 3,
    editFormOrder: 4,
    initValue: { startNum: '', endNum: '' },
    sorter: true,
    edit: true,
    search: true,
    width: 150,
  },
  {
    title: '添加时间',
    overHidden: true,
    type: 'textarea',
    dataIndex: 'updateTime',
    width: 100,
  },
  {
    title: '校园简介',
    hidden: true,
    edit: true,
    type: 'textarea',
    dataIndex: 'content',
  },
  {
    title: '校园地址',
    hidden: true,
    edit: true,
    type: 'textarea',
    dataIndex: 'address',
  },
];
