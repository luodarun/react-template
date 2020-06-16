/*eslint-disable*/
import { gradeList } from '@/constant';
export default [
  {
    title: '校园名称',
    dataIndex: 'schoolId',
    overHidden: true,
    type: 'select',
    needAutoRender: true,
    dicData: [],
    search: true,
    required: true,
    edit: true
  },
  {
    title: '年级类型',
    dataIndex: 'grade',
    width: 100,
    type: 'cascader',
    dicData: gradeList,
    validator: (rule, value, callback) => {
      if (value && value.length === 2) {
        callback();
      }
      callback('请选择年级!');
    },
    format: (data1) => {
      return data1[1];
    },
    formatSearchParams: (data1) => {
      return data1[1];
    },
    editInitValue: (data) => {
      return data ? [data.substring(0, 1), data] : [];
    },
    required: true,
    search: true,
    edit: true
  },
  {
    title: '早上上学',
    dataIndex: 'morning',
    width: 100,
    type: 'timePicker',
    required: true,
    bindParamOption: { format: 'HH:mm' },
    search: true,
    edit: true
  },
  {
    title: '中午放学',
    dataIndex: 'noon',
    type: 'timePicker',
    bindParamOption: { format: 'HH:mm' },
    width: 100,
    required: true,
    search: true,
    edit: true
  },
  {
    title: '下午上学',
    dataIndex: 'afternoon',
    type: 'timePicker',
    required: true,
    bindParamOption: { format: 'HH:mm' },
    width: 100,
    search: true,
    edit: true
  },
  {
    title: '晚上放学',
    dataIndex: 'evening',
    type: 'timePicker',
    bindParamOption: { format: 'HH:mm' },
    width: 100,
    required: true,
    search: true,
    edit: true
  },
  {
    title: '是否有晚自习',
    dataIndex: 'isEvening',
    type: 'radio',
    dicData: [
      { label: '是', value: '1' },
      { label: '否', value: '0' }
    ],
    width: 100,
    needAutoRender: true,
    search: true,
    edit: true
  },
  {
    title: '晚自习上学',
    dataIndex: 'eveningStart',
    type: 'timePicker',
    bindParamOption: { format: 'HH:mm' },
    width: 100,
    validator: (rule, value, callback, data) => {
      if (data.isEvening === '1') {
        if (value) {
          callback();
        } else {
          callback('请选择时间');
        }
      } else {
        callback();
      }
    },
    search: true,
    edit: true
  },
  {
    title: '晚自习下学',
    dataIndex: 'eveningEnd',
    type: 'timePicker',
    bindParamOption: { format: 'HH:mm' },
    width: 100,
    validator: (rule, value, callback, data) => {
      if (data.isEvening === '1') {
        if (value) {
          callback();
        } else {
          callback('请选择时间');
        }
      } else {
        callback();
      }
    },
    search: true,
    edit: true
  },
  {
    title: '执行周期',
    dataIndex: 'cycle',
    width: 100,
    type: 'dateRange',
    render: (data, rowData) => {
      return rowData['cycleStart'] + '至' + rowData['cycleEnd']
    },
    search: true,
    edit: true
  },
  {
    title: '休息时间',
    dataIndex: 'restDate',
    type: 'select',
    dicData: [
      { label: '双休', value: '1' },
      { label: '六', value: '2' },
      { label: '日', value: '3' },
      { label: '无休', value: '4' }
    ],
    width: 100,
    needAutoRender: true,
    search: true,
    edit: true
  },
  {
    title: '寒假',
    dataIndex: 'winter',
    width: 100,
    type: 'dateRange',
    render: (data, rowData) => {
      return rowData['winterStart'] + '至' + rowData['winterEnd']
    },
    search: true,
    edit: true
  },
  {
    title: '暑假',
    type: 'dateRange',
    dataIndex: 'summer',
    render: (data, rowData) => {
      return rowData['summerStart'] + '至' + rowData['summerEnd']
    },
    search: true,
    edit: true
  }
]
