const hashCode: (str: string) => number = (str) => {
  let h = 0;
  const len = str.length;
  const t = 2147483648;
  for (let i = 0; i < len; i++) {
    h = 31 * h + str.charCodeAt(i);
    if (h > 2147483647) h %= t; //java int溢出则取模
  }
  /*var t = -2147483648 * 2;
   while (h > 2147483647) {
   h += t
   }*/
  return h;
};

//时间戳来自客户端，精确到毫秒，但仍旧有可能在在多线程下有并发，
//尤其hash化后，毫秒数前面的几位都不变化，导致不同日期hash化的值有可能存在相同，
//因此使用下面的随机数函数，在时间戳上加随机数，保证hash化的结果差异会比较大
/*
 ** randomWord 产生任意长度随机字母数字组合
 ** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
 ** 用法  randomWord(false,6);规定位数 flash
 *      randomWord(true,3，6);长度不定，true
 * arr变量可以把其他字符加入，如以后需要小写字母，直接加入即可
 */
const randomWord: (randomFlag: boolean, min: number, max?: number) => string = (
  randomFlag,
  min,
  max
) => {
  let str = '';
  let range = min;
  let _str = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  // 随机产生
  if (randomFlag && max) {
    range = Math.round(Math.random() * (max - min)) + min;
  }
  for (let i = 0; i < range; i++) {
    const pos = Math.round(Math.random() * (_str.length - 1));
    str += _str[pos];
  }
  return str;
};
//获取hashcode
const getHashCode = () => {
  //定义一个时间戳，计算与1970年相差的毫秒数  用来获得唯一时间
  const timestamp = new Date().valueOf();
  const myRandom = randomWord(false, 6);
  const hashcode = hashCode(myRandom + timestamp.toString());
  return hashcode;
};

export default getHashCode;
