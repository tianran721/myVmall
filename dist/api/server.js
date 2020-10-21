requirejs.config({
  paths: {
    jquery: "../lib/jquery-3.4.1.min",
  },
});

//return 提供banner.json >jq中是一个promise对象
//解构
//return{...} 提供全站数据接口
define(["jquery"], function ($) {
  //indexBaner api
  function getBannerData() {
    return $.ajax("/api/mock/banner.json");
  }
  //detail
  function getBanner2Data() {
    return $.ajax("/api/mock/banner2.json");
  }
  //indexIphone
  function getPhoneData() {
    return $.ajax("/api/mock/phone.json");
  }
  function getBookData() {
    return $.ajax("/api/mock/book.json");
  }
  function getPadData() {
    return $.ajax("/api/mock/pad.json");
  }
  //getDetailData
  //{type: "pad", title: "精品平板", code: "0", goods_list: Array(5)}
  //遍历
  //res.goods_list[i] 指定id的数据
  //console.log( $.ajax(`/api/mock/${type}.json`))
 
  function getDetailData(type, id) {
    return new Promise((resolve, reject) => {
      //console.log( $.ajax(`/api/mock/${type}.json`))
      $.ajax(`/api/mock/${type}.json`).then((res) => {
        //console.log(res.goods_list)
        for (var i = 0; i < res.goods_list.length; i++) {
          if (id == res.goods_list[i].goodsId) {
            // console.log(res.goods_list[i])
            resolve(res.goods_list[i]);
          }
        }
      });
    });
  }
  //反向代理
  //return promise对象
  //php {"code : 0", "message" : "login success"}
  // function actionLogin() {
  //   return $.ajax('/api2/login.php');
  // }
  // actionLogin()
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  return {
    getBannerData,
    getBanner2Data,
    getPhoneData,
    getBookData,
    getPadData,
    getDetailData,
  };
});
