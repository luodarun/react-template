/*eslint-disable*/
import React from 'react';

export default [
  {
    title: '校园名称',
    dataIndex: 'schoolId',
    search: true,
    type: 'select',
    needAutoRender: true,
    dicData: [],
    edit: true,
    overHidden: true
  },
  {
    title: '姓名',
    dataIndex: 'isTop',
    width: 100,
    search: true,
    edit: true,
    overHidden: true
  },
  {
    title: '手机号码',
    dataIndex: 'phone',
    width: 150,
    search: true,
    edit: true,
    overHidden: true
  },
  {
    title: '支付方式',
    dataIndex: 'payType',
    type: 'select',
    dicData: [
      { label: '支付宝', value: '1' },
      { label: '微信', value: '2' }
    ],
    search: true,
    edit: true,
    needAutoRender: true,
    width: 100
  },
  {
    title: '支付时间',
    dataIndex: 'payTime',
    type: 'date',
    width: 150,
    edit: true,
    search: true,
    overHidden: true
  },
  {
    title: '订单创建时间',
    dataIndex: 'createTime',
    type: 'date',
    width: 150,
    overHidden: true
  },
  {
    title: '支付单号',
    dataIndex: 'orderNo',
    width: 150,
    edit: true,
    hidden: true
  }
]
