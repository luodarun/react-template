import request from './BaseAxios';

// 分页查询获取班级列表
export const getClassesListByPage = params =>
  request({
    url: '/classes/getClassesListByPage',
    method: 'get',
    params,
  });

// 添加班级
export const addClasses = data =>
  request({
    url: '/classes/addClasses',
    method: 'post',
    data,
  });

// 批量删除班级
export const batchDeleteClasses = ids =>
  request({
    url: '/classes/batchDeleteClasses',
    method: 'get',
    params: {
      ids,
    },
  });

// 根据学校ID查找所有的班级信息
export const findAllClassesBySchoolId = schoolId =>
  request({
    url: '/classes/findAllClassesBySchoolId',
    method: 'get',
    params: {
      schoolId,
    },
  });

// 根据学校ID查找所有的班级分组信息
export const findClassesCountGroupByClassesType = schoolId =>
  request({
    url: '/classes/findClassesCountGroupByClassesType',
    method: 'get',
    params: {
      schoolId,
    },
  });

//查看班级信息
export const getSingleClassesById = id =>
  request({
    url: '/classes/getSingleClassesById',
    method: 'get',
    params: {
      id,
    },
  });

// 导入班级信息
export const importClasses = file =>
  request({
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: '/classes/importClasses',
    method: 'post',
    data: file,
  });

// 修改班级
export const updateClasses = data =>
  request({
    url: '/classes/updateClasses',
    method: 'post',
    data,
  });
