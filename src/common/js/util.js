/**
 * @autor:ycs
 * @date:2017/6/10
 * @email:897710401@qq.com
 */
jQuery.extend({
  getPropFromJSON: function (json, name) {
    if (json === undefined || jQuery.trim(json).length === 0)
      return undefined;
    let obj = JSON.parse(json)
    if (obj === undefined) {
      return undefined;
    }
    return obj[name];
  },

  setPropIfUndefine(obj, prop, value) {
    if (obj === null) return;
    if (obj[prop] === undefined) {
      obj[prop] = value;
    }
  },

  setPropFromJSON: function (json, name, value) {
    let target;
    if (json === undefined || jQuery.trim(json).length === 0) {
      target = {};
    } else {
      target = JSON.parse(json);
      if (jQuery.type(target) === "array") {
        target = {}
      }
    }
    target[name] = value;
    let stringify = JSON.stringify(target);
    return stringify;
  },

  Bean: {
    /**
     * @param source 网络请求的数据
     * @param target data声明的对象
     */
    copyProperty: function (source, target) {
      if (source === undefined) source = {};
      let targetFileds = Object.getOwnPropertyNames(target);
      let sourceFileds = Object.getOwnPropertyNames(source);
      let index;
      for (index in targetFileds) {
        let filed = targetFileds[index];
        if (!$.List.contains(sourceFileds, filed)) {
          source[filed] = undefined;
        }
      }
      return source;
    },
  },

  List: {
    contains: function (list, obj) {
      let index;
      for (index in list) {
        if (list[index] === obj) return true;
      }
      return false;
    }
  },


  Data: {
    formatDate: function (date, fmt) {
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1,
          (date.getFullYear() + '').substr(4 - RegExp.$1.length));
      }
      let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      };
      for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + '';
          fmt = fmt.replace(RegExp.$1,
            (RegExp.$1.length === 1) ? str : $.Data.padLeftZero(str));
        }
      }
      return fmt;
    },

    padLeftZero: function (str) {
      return ('00' + str).substr(str.length);
    }
  }
});
