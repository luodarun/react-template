export default [
  {
    title: '校园名称',
    dataIndex: 'schoolId',
    overHidden: true,
    type: 'select',
    editFormOrder: 1,
    needAutoRender: true,
    dicData: [],
    search: true,
    required: true,
    edit: true,
  },
  {
    title: '允许申报次数',
    dataIndex: 'declarationCount',
    type: 'number',
    width: 130,
    required: true,
    search: true,
    edit: true,
  },
  {
    title: '执行周期',
    type: 'dateRange',
    dataIndex: 'implement',
    render: (data, rowData) => {
      return rowData['implementStart'] + '至' + rowData['implementEnd'];
    },
    search: true,
    edit: true,
  },
];
