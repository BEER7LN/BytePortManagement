"use strict";

const Service = require("egg").Service;
const CryptoJS = require("crypto-js");

class CryptoService extends Service {
  async encode(data) {
    const aesKey = "e10adc3949ba59abbe56e057f20f883e";
    //将秘钥转换成Utf8字节数组
    var key = CryptoJS.enc.Utf8.parse(aesKey);

    // 加密参数
    const option = {
      iv: CryptoJS.enc.Utf8.parse(aesKey.substr(0, 16)),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    };

    //加密
    var encrypt = CryptoJS.AES.encrypt(JSON.stringify(data), key, option);
    var encryptData = encrypt.toString();

    console.log(encryptData);
    return encryptData;
  }

  async decode(encryptData) {
    const aesKey = "e10adc3949ba59abbe56e057f20f883e";
    //将秘钥转换成Utf8字节数组
    var key = CryptoJS.enc.Utf8.parse(aesKey);

    // 加密参数
    const option = {
      iv: CryptoJS.enc.Utf8.parse(aesKey.substr(0, 16)),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    };

    //解密
    var decrypt = CryptoJS.AES.decrypt(encryptData, key, option);
    var decryptData = JSON.parse(decrypt.toString(CryptoJS.enc.Utf8)); //解密后的数据

    return decryptData;
  }
}

module.exports = CryptoService;
