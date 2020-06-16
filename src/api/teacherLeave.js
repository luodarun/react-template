import request from './BaseAxios';

// 批量删除教师请假
export const batchTeacherLeave = ids =>
  request({
    url: '/teacherLeave/batchTeacherLeave',
    method: 'get',
    params: {
      ids,
    },
  });

// 批量审核教师请假
export const approvalTeacherLeave = (id, state, reason) =>
  request({
    url: '/teacherLeave/approvalTeacherLeave',
    method: 'post',
    params: {
      id,
      state,
      reason,
    },
  });

// 查看教师请假信息
export const getSingleTeacherLeaveByID = id =>
  request({
    url: '/teacherLeave/getSingleTeacherLeaveByID',
    method: 'get',
    params: {
      id,
    },
  });

// 分页查询获取教师请假列表
export const getTeacherLeaveListByPage = params =>
  request({
    url: '/teacherLeave/getTeacherLeaveListByPage',
    method: 'get',
    params,
  });
