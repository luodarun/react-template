import { qjlx } from '@/constant/index';
export default [
  {
    title: '校园名称',
    dataIndex: 'schoolName',
    overHidden: true,
    type: 'select',
    needAutoRender: true,
    dicData: [],
    search: true,
    paramName: 'schoolId',
  },
  {
    title: '对应班级',
    dataIndex: 'classesName',
    width: 100,
    type: 'select',
    dicData: [],
    search: true,
    paramName: 'classesId',
    selfSelectDic: 'forClassArray',
  },
  {
    title: '学生姓名',
    dataIndex: 'studentName',
    search: true,
    paramName: 'name',
  },
  {
    title: '请假类型',
    dataIndex: 'type',
    width: 100,
    type: 'select',
    dicData: qjlx,
    needAutoRender: true,
    search: true,
  },
  {
    title: '开始时间',
    dataIndex: 'createTime',
  },
  {
    title: '请假时间(天)',
    dataIndex: 'number',
  },
  {
    title: '请假备注',
    dataIndex: 'remark',
  },
  {
    title: '状态',
    dataIndex: 'state',
    type: 'select',
    dicData: [
      { label: '已阅', value: '1' },
      { label: '未阅', value: '0' },
    ],
    needAutoRender: true,
  },
];
