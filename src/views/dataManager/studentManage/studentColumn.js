import React from 'react';
import { isValidatePhone } from '@/utils/validate';
import { requestBaseUrl, imagesAddress } from '@/config/env';
import BaseUpload from '@/components/common/BaseUpload';

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
 * format: 自定义处理表单返回的数据
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
      if (data && data.studentNum) {
        return (
          <div className="studentNum">
            该学校已添加学生<span>{data.studentNum}</span>人
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
    title: '学生姓名',
    dataIndex: 'name',
    width: 100,
    overHidden: true,
    editFormOrder: 3,
    edit: true,
    required: true,
  },
  {
    title: '所在班级',
    dataIndex: 'classesName',
    overHidden: true,
    edit: true,
    required: true,
    type: 'select',
    editFormOrder: 2,
    dicData: [],
    selfSelectDic: 'classesIdArray',
    selfKey: 'classesId',
  },
  {
    title: '学号',
    edit: true,
    hidden: true,
    dataIndex: 'studentNo',
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
    edit: true,
    createInitValue: '男',
    hidden: true,
    required: true,
    editFormOrder: 5,
    searchOrder: 6,
    search: true,
    dataIndex: 'sex',
  },
  {
    title: '底库照片',
    edit: true,
    hidden: true,
    dataIndex: 'pictureUrl',
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
    title: '家长手机号',
    dataIndex: 'homeTel',
    overHidden: true,
    searchOrder: 5,
    editFormOrder: 4,
    edit: true,
    required: true,
    search: true,
    width: 150,
    validator: (rule, value, callback) => {
      let tempObj = isValidatePhone(value);
      if (tempObj === true) {
        callback();
      } else {
        callback(tempObj);
      }
    },
  },
  {
    title: '家长姓名',
    edit: true,
    hidden: true,
    dataIndex: 'homeName',
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
    dataIndex: 'createTime',
  },
];
