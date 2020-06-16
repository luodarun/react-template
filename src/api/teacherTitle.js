import request from './BaseAxios';

// 添加职称
export const addTeacherTitle = data =>
  request({
    url: '/teacherTitle/addTeacherTitle',
    method: 'post',
    data,
  });

// 批量删除职称
export const batchDeleteTeacherTitle = ids =>
  request({
    url: '/teacherTitle/batchDeleteTeacherTitle',
    method: 'get',
    params: {
      ids,
    },
  });

// 根据学校ID获取职称
export const findBySchoolId = id =>
  request({
    url: '/teacherTitle/findBySchoolId',
    method: 'get',
    params: {
      id,
    },
  });

// 查看职称信息
export const getSingleTeacherTitleById = id =>
  request({
    url: '/teacherTitle/getSingleTeacherTitleById',
    method: 'get',
    params: {
      id,
    },
  });

// 分页查询获取职称列表
export const getTeacherTitleListByPage = params =>
  request({
    url: '/teacherTitle/getTeacherTitleListByPage',
    method: 'get',
    params,
  });

// 修改职称
export const updateTeacherTitle = data =>
  request({
    url: '/teacherTitle/updateTeacherTitle',
    method: 'post',
    data,
  });
