import request from './BaseAxios';

// 登录接口
export const loginByAccount = (account: string, password: string, validateCode: string, key: string) => request({
  url: '/user/login',
  method: 'post',
  data: {
    account,
    password,
    validateCode,
    key
  }
});
export interface userVO {
  userName: string;
  account: string;
  password: string
  userType: string;
  createTime?: string;
  createUserId?: string;
  deleteTime?: string;
  deleteUserId?: string;
  id?: string;
  isDel?: string;
  orgCode?: string
  povice?: string;
  roleCodes?: string;
  schoolId?: string;
  updateTime?: string;
  updateUserId?: string;
}
// 添加用户
export const addUser = (data: userVO) => request({
  url: '/user/addUser',
  method: 'post',
  data
});

// 修改用户
export const updateUser = (data: userVO) => request({
  url: '/user/updateUser',
  method: 'post',
  data
});

interface userSearchForm extends baseSearchParams {
  schoolId: string
  povice: string
  account: string;
  orgCode: string;
}

// 分页查询用户
export const getUserListByPage = (params: userSearchForm) => request({
  url: '/user/getUserListByPage',
  method: 'get',
  params
});

// 根据用户id查询用户信息
export const getSingleUserByID = (id: string) => request({
  url: '/user/getSingleUserByID',
  method: 'get',
  params: {
    id
  }
});

// 批量删除用户
export const batchDeleteTeacher = (ids: string) => request({
  url: '/user/batchDeleteTeacher',
  method: 'get',
  params: {
    ids
  }
});
