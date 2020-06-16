import request from './BaseAxios';

// 上传banner文件
export const bannerUpload = (params: any) => {
  return request({
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: '/banner/bannerUpload',
    method: 'post',
    data: params,
  });
};

// 批量删除banner文件
export const deleteBanner = (ids: string) =>
  request({
    url: '/banner/deleteBanner',
    method: 'post',
    params: {
      ids,
    },
  });

// 分页查询bannerList
export const getBannerList = (params: any) =>
  request({
    url: '/banner/getBannerList',
    method: 'get',
    params,
  });

// 根据ID获取banner
export const getBannerById = (id: string) =>
  request({
    url: '/banner/getBannerById',
    method: 'get',
    params: {
      id,
    },
  });

// 改变状态
export const releaseBanner = (id: string, state: string) =>
  request({
    url: '/banner/releaseBanner',
    method: 'post',
    params: {
      id,
      state,
    },
  });

// 保存/修改banner
export const saveBanner = (params: any) => {
  let file = params.file;
  delete params.file;
  return request({
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: '/banner/saveBanner',
    method: 'post',
    params,
    data: file ? file.formData : new FormData(),
  });
};
