import request from './BaseAxios';

// 分页查询获取学校列表
export const getSchoolListByPage = params =>
  request({
    url: '/school/getSchoolListByPage',
    method: 'get',
    params: params,
  });

// 修改学校信息
export const updateSchool = params => {
  let file = params.file;
  delete params.file;
  return request({
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: '/school/updateSchool',
    method: 'post',
    params,
    data: file.formData,
  });
};

// 查看学校信息
export const getSingleSchoolById = id =>
  request({
    url: '/school/getSingleSchoolById',
    method: 'get',
    params: {
      id,
    },
  });

// 查找所有的学校信息
export const findAllSchool = name =>
  request({
    url: '/school/findAllSchool',
    method: 'get',
    params: {
      name,
    },
  });

// 批量删除学校
export const batchDeleteSchool = ids =>
  request({
    url: '/school/batchDeleteSchool',
    method: 'get',
    params: {
      ids,
    },
  });

// 添加学校
export const addSchool = params => {
  let file = params.file;
  delete params.file;
  return request({
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: '/school/addSchool',
    method: 'post',
    params,
    data: file.formData,
  });
};
