// 校验链接地址
export function isExternal(path: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(path);
}

// 校验手机号码
export function isValidatePhone(phone: string): boolean | string {
  let isPhone = /^1[345678]\d{9}$/;
  //增加134 减少|1349[0-9]{7}，增加181,增加145，增加17[678]
  if (phone) {
    if (phone.length === 11) {
      if (isPhone.test(phone)) {
        return true;
      } else {
        return '手机号码格式不正确';
      }
    } else {
      return '手机号码长度不为11位';
    }
  } else {
    return '手机号码不能为空';
  }
}

// 校验是否为ip地址
export function isValidIP(ip: string) : boolean{
  let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
  return ip ? reg.test(ip) : false;
}
