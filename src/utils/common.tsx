import { Radio, Select } from 'antd';
import React from 'react';
import { staticRouter } from '../constant/index';
// 删除对象中属性为空的属性
export const deleteEmptyItem = (data: any) => {
  Object.keys(data).forEach(item => {
    if (data[item] === undefined || data[item] === null || data[item] === '') {
      delete data[item];
    }
  });
  return data;
};

// 对象中属性为undefined或null的属性置为空字符串
export const itemUndToEmp = (data: any) => {
  Object.keys(data).forEach(item => {
    if (data[item] === undefined || data[item] === null) {
      data[item] = '';
    }
  });
  return data;
};

// 比较两个对象是否相等
export const compare = (origin: any, target: any) => {
  if (typeof target === 'object') {
    if (
      typeof origin !== 'object' ||
      Object.keys(target).length !== Object.keys(origin).length
    )
      return false;
    for (let key of Object.keys(target))
      if (!compare(origin[key], target[key])) return false;
    return true;
  } else {
    return origin === target;
  }
};

// 格式化日期
export const formatDate = function(date: Date, fmt: string): string {
  let o: any = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'h+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length),
    );
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? o[k]
          : ('00' + o[k]).substr(('' + o[k]).length),
      );
    }
  }
  return fmt;
};

export const getTestData = function(
  mainKey: string,
  columns: Array<completeColumn>,
  rows: number = 10,
): Promise<any> {
  let testTableData: Array<Object> = [];
  let tempRowData: any = {};
  columns.forEach(item => {
    tempRowData[item.dataIndex] = 'test';
  });
  for (let i = 0; i < rows; i++) {
    tempRowData[mainKey] = i;
    testTableData.push(Object.assign({}, tempRowData));
  }
  return new Promise(resolve => {
    resolve({
      data: testTableData,
      total: 10,
    });
  });
};

export const getObjType = function(obj: any): string {
  let toString = Object.prototype.toString;
  let map: any = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  };
  if (obj instanceof Element) {
    return 'element';
  }
  return map[toString.call(obj)];
};

// 深克隆
export const deepClone = (data: any) => {
  let type: string = getObjType(data);
  let obj: any;
  if (type === 'array') {
    obj = [];
  } else if (type === 'object') {
    obj = {};
  } else {
    //不再具有下一层次
    return data;
  }
  if (type === 'array') {
    for (let i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]));
    }
  } else if (type === 'object') {
    for (let key in data) {
      obj[key] = deepClone(data[key]);
    }
  }
  return obj;
};

// 判断是否为空或空数组或空属性对象
export const isNotEmpty = (data: any) => {
  let boolean: boolean = false;
  if (getObjType(data) === 'object') {
    // 对象
    boolean = Object.getOwnPropertyNames(data).length > 0;
  } else if (getObjType(data) === 'array') {
    // 数组
    boolean = data.length > 0;
  } else {
    boolean = Boolean(data);
  }
  return boolean;
};

// 获得key与label值
export const getValueAndLabel = (
  array: Array<any> = [],
  valueKey: string,
  labelKey: string,
) => {
  return array.map(item => {
    return { value: item[valueKey] + '', label: item[labelKey] + '' };
  });
};

// 获取浏览器版本
export const getBrowserType = () => {
  let isOpera = navigator.userAgent.indexOf('Opera') > -1; //判断是否Opera浏览器
  let isIE =
    navigator.userAgent.indexOf('compatible') > -1 &&
    navigator.userAgent.indexOf('MSIE') > -1 &&
    !isOpera; //判断是否IE浏览器
  let isIE11 = navigator.userAgent.indexOf('rv') > -1 && !isOpera; //判断是否IE浏览器
  let isEdge =
    navigator.userAgent.indexOf('Windows NT 6.1; Trident/7.0;') > -1 && !isIE; //判断是否IE的Edge浏览器
  let isFF = navigator.userAgent.indexOf('Firefox') > -1; //判断是否Firefox浏览器
  let isSafari =
    navigator.userAgent.indexOf('Safari') > -1 &&
    navigator.userAgent.indexOf('Chrome') === -1; //判断是否Safari浏览器
  let isChrome =
    navigator.userAgent.indexOf('Chrome') > -1 &&
    navigator.userAgent.indexOf('Safari') > -1; //判断Chrome浏览器
  let isUC = navigator.userAgent.indexOf('UCBrowser') > -1; //判断UCbrowser浏览器
  let isQQ = navigator.userAgent.indexOf('QQBrowser') > -1; //判断qqbrowser浏览器

  if (isIE) {
    let reIE = new RegExp('MSIE (\\d+\\.\\d+);');
    reIE.test(navigator.userAgent);
    let fIEVersion = parseFloat(RegExp['$1']);
    if (fIEVersion === 7) {
      return 'IE7';
    } else if (fIEVersion === 8) {
      return 'IE8';
    } else if (fIEVersion === 9) {
      return 'IE9';
    } else if (fIEVersion === 10) {
      return 'IE10';
    } else {
      return 'IE7以下版本';
    } //IE版本过低
  } else if (isIE11) {
    return 'IE11';
  } else if (isSafari) {
    return 'Safari';
  } else if (isChrome) {
    return 'Chrome';
  } else if (isFF) {
    return 'Firefox';
  } else if (isOpera) {
    return 'Opera';
  } else if (isEdge) {
    return 'Edge';
  } else if (isUC) {
    return 'UC浏览器';
  } else if (isQQ) {
    return 'QQ浏览器';
  } else {
    return '其它浏览器';
  }
};

export const renderSelect = (
  dicData: Array<dicDataObj | string>,
  type?: string,
) => {
  if (type === 'radio') {
    return dicData.map(item => {
      return getObjType(item) === 'string' ? (
        <Radio value={item} key={item as string}>
          {' '}
          {item}{' '}
        </Radio>
      ) : (
        <Radio
          value={(item as dicDataObj).value}
          key={(item as dicDataObj).value}
        >
          {' '}
          {(item as dicDataObj).label}{' '}
        </Radio>
      );
    });
  } else {
    return dicData.map(item => {
      return getObjType(item) === 'string' ? (
        <Select.Option value={item as string} key={item as string}>
          {' '}
          {item}{' '}
        </Select.Option>
      ) : (
        <Select.Option
          value={(item as dicDataObj).value}
          key={(item as dicDataObj).value}
        >
          {' '}
          {(item as dicDataObj).label}{' '}
        </Select.Option>
      );
    });
  }
};

export const getFileType = (fileName: string) => {
  return fileName.substring(fileName.lastIndexOf('.'));
};

export const getNumber = (data: any) => {
  if (!data) {
    return 100;
  } else {
    return parseInt(data);
  }
};

export const getStaticRouter = (
  allMenu: Array<selfRoute> = staticRouter,
  userMenus: Array<string>,
) => {
  let tempArray: Array<selfRoute> = [];
  allMenu.forEach(item => {
    if (item.children && item.children.length > 0) {
      // 有子菜单
      let tempArray2 = getStaticRouter(item.children, userMenus);
      if (tempArray2 && tempArray2.length > 0) {
        item.children = tempArray2;
        tempArray.push(item);
      }
    } else {
      if (userMenus.indexOf(item.id) >= 0) {
        tempArray.push(item);
      }
    }
  });
  return tempArray;
};
