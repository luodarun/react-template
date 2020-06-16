import request from './BaseAxios';

// 批量删除教师异常申报考勤
export const batchDeleteTeacherDeclare = idList =>
  request({
    url: '/teacherAttendance/batchDeleteTeacherDeclare',
    method: 'post',
    data: String(idList).split(','),
  });

// 批量删除教师考勤
export const batchDeleteTeacherSetting = idList =>
  request({
    url: '/teacherAttendance/batchDeleteTeacherSetting',
    method: 'post',
    data: String(idList).split(','),
  });

// 分页查询获取教师考勤列表
export const getTeacherAttendanceListByPage = params =>
  request({
    url: '/teacherAttendance/getTeacherAttendanceListByPage',
    method: 'get',
    params,
  });

// 分页查询获取教师异常申报列表
export const getTeacherDeclareListByPage = params =>
  request({
    url: '/teacherAttendance/getTeacherDeclareListByPage',
    method: 'get',
    params: params,
  });

// 查看教师异常申报信息
export const getTeacherDeclareById = id =>
  request({
    url: '/teacherAttendance/getTeacherDeclareById',
    method: 'get',
    params: {
      id,
    },
  });

// 查看教师考勤信息
export const getTeacherSettingById = id =>
  request({
    url: '/teacherAttendance/getTeacherSettingById',
    method: 'get',
    params: {
      id,
    },
  });

// 添加教师异常申报
export const saveTeacherDeclare = data =>
  request({
    url: '/teacherAttendance/saveTeacherDeclare',
    method: 'post',
    data,
  });

// 添加教师考勤
export const saveTeacherSetting = data =>
  request({
    url: '/teacherAttendance/saveTeacherSetting',
    method: 'post',
    data,
  });
