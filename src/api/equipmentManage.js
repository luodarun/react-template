import request from './BaseAxios';

// 添加设备
export const addEquipment = data =>
  request({
    url: '/equipment/addEquipment',
    method: 'post',
    data,
  });

// 修改设备
export const updateEquipment = data =>
  request({
    url: '/equipment/updateEquipment',
    method: 'post',
    data,
  });

// 批量删除设备
export const batchDeleteEquipment = ids =>
  request({
    url: '/equipment/batchDeleteEquipment',
    method: 'get',
    params: {
      ids,
    },
  });

// 查看设备信息
export const getSingleEquipmentByID = id =>
  request({
    url: '/equipment/getSingleEquipmentByID',
    method: 'get',
    params: {
      id,
    },
  });

// 分页查询获取设备列表
export const getEquipmentListByPage = params =>
  request({
    url: '/equipment/getEquipmentListByPage',
    method: 'get',
    params,
  });
