/**
 * 输入的时候自动格式化
 * 自动补充空格/禁止输入不合格的字符串
 */

// 手机号 123 1234 1234
const phone = val => {
  let value = val.replace(/\D/g, "").substr(0, 11);
  let len = value.length;
  if (len > 3 && len < 8) {
    value = value.replace(/^(\d{3})/g, "$1 ");
  } else if (len >= 8) {
    value = value.replace(/^(\d{3})(\d{4})/g, "$1 $2 ");
  }
  return value
}
// 金额 123,123,123.12 最多两位小数
const money = val => {
  val = val.replace(/,/g, "");
  let reg = /\-{0,1}\d*(\.?\d{0,2})/g;
  val = val.replace(/^(0+)/gi, "");
  val = val.match(reg)[0];
  if (val.indexOf(".") > -1) {
    let int = val.split(".")[0];
    let float = val.split(".")[1] ? val.split(".")[1] : "";
    val = int.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,") + "." + float;
  } else {
    val = val.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
  }
  return val;
}
// 银行卡 1111 2222 3333 4444
const bank = val => {
  return val
  .replace(/\D/g, "")
  .substr(0, 16)
  .replace(/(\d{4})(?=\d)/g, "$1 ");
}

// 小数
const decimal = val => {
  val = val.replace(/^[0]+/, '0')
  val = val[0] === '.' ? '0' + val : val;
  val = val.replace(/^(0)[1-9]/, function($0){
    return $0.replace('0','')
  })
  // 去除空字符串
  val = val.replace(/\s+/g, '')
  // 去除非数字
  val = val.replace(/[^(0-9 |\.)]/g, '');
  // 只显示一个小数点
  var tar = false;
  val = val.replace(/\./g, function($0){
    if(!tar) {
      tar = true
      return $0
    } else {
      return ''
    }
  })
  tar = false
  return val
}

// 整数
const integer = val => {
  val = val.replace(/\\D/g, '');
  val = val.replace(/^[0][0]+/g, '0');
  val = val.replace(/^0([^0])/, function($0, $1) {
    return $1;
  })
  return val
}

// 非空字符串
const full = val => {
  return val.replace(/\s+/g, '')
}

// 大写字母

const capitalLetter = val => {
  return val.toLocaleUpperCase()
}

export default {
  integer,
  decimal,
  bank,
  money,
  phone,
  full,
  capitalLetter
};