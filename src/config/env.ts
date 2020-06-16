// 配置编译环境和线上环境之间的切换
const env: NodeJS.ProcessEnv = process.env;
const systemName: string = '校园卫士业务管理系统';
const requestBaseUrl: string = '/schoolServer/api/';
const paramsName: string = '';
const fileAddress: string = 'file/download/';
const exportTemplate: string = 'file/exportTemplate?fileName=';
const imagesAddress: string = 'images/';
const imagesAddress2: string = 'api/file/imgFeisou?filePath=';
const whiteList: Array<string> = []; // 白名单
module.exports = {
  env,
  systemName,
  requestBaseUrl,
  whiteList,
  fileAddress,
  imagesAddress,
  imagesAddress2,
  exportTemplate,
  paramsName,
};
export {
  env,
  systemName,
  requestBaseUrl,
  whiteList,
  fileAddress,
  imagesAddress,
  imagesAddress2,
  exportTemplate,
  paramsName,
};
