import request from './BaseAxios';

// 批量删除新闻
export const deletenews = idList =>
  request({
    url: '/news/deleteNews',
    method: 'post',
    data: String(idList).split(','),
  });

// 根据ID获取新闻
export const getNewsById = id =>
  request({
    url: '/news/getNewsById',
    method: 'get',
    params: {
      id,
    },
  });

// 分页查询新闻列表
export const getnewsList = params =>
  request({
    url: '/news/getNewsList',
    method: 'get',
    params,
  });

// 上传新闻文件
export const newsUpload = params => {
  return request({
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: '/news/newsUpload',
    method: 'post',
    data: params,
  });
};

// 保存/修改新闻
export const savenews = data => {
  return request({
    url: '/news/saveNews',
    method: 'post',
    data,
  });
};
