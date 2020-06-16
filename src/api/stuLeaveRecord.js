import request from './BaseAxios';

// 批量删除学生请假
export const batchStudentLeave = ids =>
  request({
    url: '/studentLeave/batchStudentLeave',
    method: 'get',
    params: {
      ids,
    },
  });

// 批量阅读学生请假
export const changeBatchState = ids =>
  request({
    url: '/studentLeave/changeBatchState',
    method: 'get',
    params: {
      ids,
    },
  });

// 查看学生请假信息
export const getSingleStudentLeaveByID = id =>
  request({
    url: '/studentLeave/getSingleStudentLeaveByID',
    method: 'get',
    params: {
      id,
    },
  });

// 分页查询获取学生请假列表
export const getStudentLeaveListByPage = params =>
  request({
    url: '/studentLeave/getStudentLeaveListByPage',
    method: 'get',
    params,
  });
