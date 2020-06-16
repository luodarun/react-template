import * as Immutable from 'seamless-immutable';
export function mergeData(state: any, data: any, key?: string): any {
  // 使用Immutable使页面能够监听到深层次的数据变化
  let mergeObj: any = {};
  if (key) {
    // 合并其中的一个子项
    if (Array.isArray(data)) {
      // 如果是数组，且设置了值
      mergeObj[key] = data;
    } else {
      mergeObj[key] = Immutable.merge(state[key], data);
    }
  } else {
    mergeObj = data;
  }
  return Immutable.merge(state, mergeObj);
}
