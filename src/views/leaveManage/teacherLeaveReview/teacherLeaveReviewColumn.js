import { qjlx } from '@/constant/index';
export default [
  {
    title: '校园名称',
    dataIndex: 'schoolName',
    overHidden: true,
    type: 'select',
    width: 100,
    needAutoRender: true,
    dicData: [],
    search: true,
    paramName: 'schoolId',
  },
  {
    title: '教师姓名',
    dataIndex: 'teacherName',
    width: 100,
    search: true,
    paramName: 'name',
  },
  {
    title: '审核状态',
    dataIndex: 'state',
    type: 'select',
    width: 100,
    dicData: [
      { label: '已拒绝', value: '2' },
      { label: '已通过', value: '1' },
      { label: '已提交', value: '0' },
    ],
    needAutoRender: true,
    search: true,
  },
  {
    title: '请假原因',
    dataIndex: 'type',
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
    width: 100,
    dataIndex: 'number',
  },
  {
    title: '请假备注',
    width: 100,
    dataIndex: 'remark',
  },
];
