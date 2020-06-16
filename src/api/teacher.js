import request from './BaseAxios';

// 分页查询获取老师列表
export const getTeacherListByPage = params =>
  request({
    url: '/teacher/getTeacherListByPage',
    method: 'get',
    params,
  });

// 添加老师
export const addTeacher = params => {
  let file = params.file;
  delete params.file;
  return request({
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: '/teacher/addTeacher',
    method: 'post',
    params,
    data: file.formData,
  });
};

// 批量删除老师
export const batchDeleteTeacher = ids =>
  request({
    url: '/teacher/batchDeleteTeacher',
    method: 'get',
    params: {
      ids,
    },
  });

// 根据学校ID统计老师数量
export const findTeacherCountBySchooId = schoolId =>
  request({
    url: '/teacher/findTeacherCountBySchooId',
    method: 'get',
    params: {
      schoolId,
    },
  });

// 根据学校ID查询老师
export const findTeacherBySchooId = schoolId =>
  request({
    url: '/teacher/findTeacherBySchooId',
    method: 'get',
    params: {
      schoolId,
    },
  });

// 查看老师信息
export const getSingleTeacherById = id =>
  request({
    url: '/teacher/getSingleTeacherById',
    method: 'get',
    params: {
      id,
    },
  });

// 导入老师信息
export const importTeacher = (schoolId, file) =>
  request({
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: '/teacher/importTeacher',
    method: 'post',
    params: {
      schoolId,
    },
    data: file,
  });

// 更新老师
export const updateTeacher = params => {
  let file = params.file;
  delete params.file;
  return request({
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: '/teacher/updateTeacher',
    method: 'post',
    params,
    data: file.formData,
  });
};
