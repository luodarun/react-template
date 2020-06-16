import request from './BaseAxios';

// 分页查询获取学生列表
export const getStudentListByPage = params =>
  request({
    url: '/student/getStudentListByPage',
    method: 'get',
    params,
  });

// 分页查询手机变更List
export const getChangeNumberList = params =>
  request({
    url: '/mobile/getChangeNumberList',
    method: 'get',
    params,
  });

// 查询手机变更各状态数量
export const getChangeNumberCountByState = () =>
  request({
    url: '/mobile/getChangeNumberCountByState',
    method: 'get',
  });

// 手机变更处理状态
export const changeState = id =>
  request({
    url: '/mobile/changeState',
    method: 'post',
    params: { id },
  });

// 添加学生
export const addStudent = params => {
  let file = params.file;
  delete params.file;
  return request({
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: '/student/addStudent',
    method: 'post',
    params,
    data: file.formData,
  });
};

// 批量删除学生
export const batchDeleteStudent = ids =>
  request({
    url: '/student/batchDeleteStudent',
    method: 'get',
    params: {
      ids,
    },
  });

// 根据学校ID统计学生数量
export const findStudentCountBySchooId = schoolId =>
  request({
    url: '/student/findStudentCountBySchooId',
    method: 'get',
    params: {
      schoolId,
    },
  });

// 查看学生信息
export const getSingleStudentById = id =>
  request({
    url: '/student/getSingleStudentById',
    method: 'get',
    params: {
      id,
    },
  });

// 导入学生信息
export const importStudent = (schoolId, classType, file) =>
  request({
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: '/student/importStudent',
    params: {
      schoolId,
      classType,
    },
    method: 'post',
    data: file,
  });

// 更新学生
export const updateStudent = params => {
  let file = params.file;
  delete params.file;
  return request({
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: '/student/updateStudent',
    method: 'post',
    params,
    data: file.formData,
  });
};
