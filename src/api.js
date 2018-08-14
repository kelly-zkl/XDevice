// 处理成json
export const JSONParse = (params) => {
  let jp = '';
  if (!!params) {
    jp = JSON.parse(params);
  }
  return jp;
};
// 验证手机号码
export const mobileValidator = (phone) => {
  let bol = true;
  if (!/^1(3|4|5|7|8)\d{9}$/.test(phone)) {
    bol = false;
  }
  return bol;
};
//整数
export const numValid = (num) => {
  let isNum = false;
  if (/^[0-9]*$/.test(num)) {
    isNum = true;
  }
  return isNum;
};
// 验证密码
export const pwdValidator = (pwd) => {
  let bol = true;
  if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/.test(pwd)) {
    bol = false;
  }
  return bol;
};
// 图片公用验证 gif / jpg / png / jpeg
export const globalValidImg = (file, msg) => {
  let isJPG = false;
  if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type
    === 'image/gif') {
    isJPG = true;
  }
  const isLt1M = file.size / 1024 / 1024 < 1;
  if (!isJPG) {
    msg.error('上传图片只能是 JPG,gif或者png格式!');
  }
  else if (!isLt1M) {
    msg.error('上传图片大小不能超过 1MB!');
  }
  return isJPG && isLt1M;
};
// p12验证
export const globalValidP12 = (file, msg) => {
  let isP12 = false;
  if (file.type === 'application/x-pkcs12'
    || file.name.substring(file.name.length - 4, file.name.length)
    === '.p12') {
    isP12 = true;
  }
  if (!isP12) {
    msg.error('上传格式只能是p12!');
  }
  return isP12;
};

//身份证号码验证
export const userCardValid = (cardNo) => {
  let isCardNo = false;
// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
  if (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(cardNo)) {
    isCardNo = true;
  }
  return isCardNo;
};
