import { gradeList, classNameList } from '@/constant';
/**
 * title: 字段名，用于表格，搜索，表单
 * dataIndex： 字段key
 * width：表格字段宽度
 * hidden： 控制是否在表格中展示该字段
 * ellipsis: 控制是否使用省略
 * sorter：是否采用排序
 * search： 是否作为搜索条件
 * paramName: 搜索表单的字段名，默认取dataIndex
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
    dataIndex: 'schoolName',
    paramName: 'schoolId',
    overHidden: true,
    type: 'select',
    dicData: [],
    searchOrder: 1,
    editFormOrder: 1,
    editFormSpan: 24,
    needAutoRender: true,
    edit: true,
    required: true,
    search: true,
  },
  {
    title: '年级类型',
    dataIndex: 'gradeType',
    width: 100,
    overHidden: true,
    type: 'cascader',
    searchOrder: 4,
    editFormOrder: 2,
    edit: true,
    required: true,
    dicData: gradeList,
    search: true,
    formatSearchParams: data1 => {
      return data1[1];
    },
    render: (key, row) => {
      return row['classType'] + row['grade'];
    },
  },
  {
    title: '班级名称',
    dataIndex: 'className',
    overHidden: true,
    searchOrder: 2,
    editFormOrder: 3,
    edit: true,
    width: 100,
    required: true,
    render: key => {
      return key + '班';
    },
    type: 'select',
    dicData: classNameList,
  },
  {
    title: '班主任姓名',
    dataIndex: 'teacherName',
    overHidden: true,
    editFormOrder: 4,
    edit: true,
    width: 150,
  },
  {
    title: '班级人数',
    overHidden: true,
    searchOrder: 3,
    type: 'numberRange',
    initValue: { startNum: '', endNum: '' },
    sorter: true,
    search: true,
    dataIndex: 'classNum',
    width: 100,
  },
  {
    title: '添加时间',
    type: 'dateRange',
    width: 200,
    search: true,
    isTimeRangeSearch: true,
    dataIndex: 'createTime',
  },
];
