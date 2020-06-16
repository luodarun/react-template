import request from './BaseAxios';

// 批量删除课程表
export const deleteCourse = idList =>
  request({
    url: '/course/deleteCourse',
    method: 'post',
    data: String(idList).split(','),
  });

// 根据ID获取课程表
export const getCourseById = id =>
  request({
    url: '/course/getCourseById',
    method: 'get',
    params: {
      id,
    },
  });

// 分页查询课程表列表
export const getCourseList = params =>
  request({
    url: '/course/getCourseList',
    method: 'get',
    params,
  });

// 保存/修改课程表
export const saveCourse = params => {
  let file = params.file;
  delete params.file;
  return request({
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: '/course/saveCourse',
    method: 'post',
    params,
    data: file.formData,
  });
};

// 保存/修改课程详情
export const updateCourseDetail = data =>
  request({
    url: '/course/updateCourseDetail',
    method: 'post',
    data,
  });
