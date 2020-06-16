import request from './BaseAxios';

// 分页查询学生人脸记录
export const getOrderListByPage = params =>
  request({
    url: '/face/getStudentFaceData',
    method: 'get',
    params,
  });

// 分页查询教师人脸记录
export const getTeacherFaceData = params =>
  request({
    url: '/face/getTeacherFaceData',
    method: 'get',
    params,
  });

// 分页查询陌生人人脸记录
export const getStangerFaceData = params =>
  request({
    url: '/face/getStangerFaceData',
    method: 'get',
    params,
  });
