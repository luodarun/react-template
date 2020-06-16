import request from './BaseAxios';

// 分页查询获取学生考勤列表
export const getStudentAttendanceListByPage = params =>
  request({
    url: '/studentAttendance/getStudentAttendanceListByPage',
    method: 'get',
    params: params,
  });

// 添加学生考勤
export const saveStudentSetting = data =>
  request({
    url: '/studentAttendance/saveStudentSetting',
    method: 'post',
    data,
  });

// 查看学生考勤信息
export const getStudentSettingById = id =>
  request({
    url: '/studentAttendance/getStudentSettingById',
    method: 'get',
    params: {
      id,
    },
  });

// 批量删除学生考勤
export const batchDeleteStudent = idList =>
  request({
    url: '/studentAttendance/batchDeleteStudent',
    method: 'post',
    data: String(idList).split(','),
  });
