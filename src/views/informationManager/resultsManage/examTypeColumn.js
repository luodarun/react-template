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
    title: '对应班级',
    dataIndex: 'isTop',
    type: 'select',
    dicData: [],
    selfSelectDic: 'forClassArray',
    search: true,
    required: true,
    width: 100,
    edit: true,
  },
  {
    title: '考试类型',
    dataIndex: 'kslx',
    search: true,
    required: true,
    edit: true,
  },
];