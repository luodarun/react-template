import { isValidIP } from '@/utils/validate';
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
    edit: true,
  },
  {
    title: 'ip地址',
    dataIndex: 'ip',
    width: 100,
    search: true,
    edit: true,
    required: true,
    validator: (rule, value, callback) => {
      if (isValidIP(value)) {
        callback();
      } else {
        callback('请输入正确的ip地址');
      }
    },
  },
  {
    title: '摄像头位置',
    dataIndex: 'place',
    required: true,
    search: true,
    edit: true,
  },
  {
    title: '摄像头编号',
    dataIndex: 'number',
    required: true,
    search: true,
    edit: true,
  },
];
