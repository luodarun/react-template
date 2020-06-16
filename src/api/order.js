import request from './BaseAxios';

// 分页查询获取支付订单列表
export const getOrderListByPage = params =>
  request({
    url: '/order/getOrderListByPage',
    method: 'get',
    params,
  });

// 查看支付订单信息
export const getSingleSchoolById = id =>
  request({
    url: '/order/getSingleSchoolById',
    method: 'get',
    params: {
      id,
    },
  });
