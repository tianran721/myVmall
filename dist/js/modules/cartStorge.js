/* 
  {
    goodsChecked: true
    goodsColor: "蝶羽蓝"
    goodsId: "10086601038627"
    goodsName: "荣耀20S"
    goodsNumber: 1
    goodsPrice: 1899
  }
*/
//相同的数据 累加
//累加数据 
//index 累加的对象
//累加后重新设置
//test
/* 
[
    0: {goodsChecked: true, goodsName: "荣耀20S", goodsColor: "蝶羽黑", goodsPrice: 1899, goodsNumber: 3,…}
    1: {goodsChecked: true, goodsName: "荣耀20S", goodsColor: "蝶羽蓝", goodsPrice: 1899, goodsNumber: 1,…}
    2: {goodsChecked: true, goodsName: "荣耀20S", goodsColor: "蝶羽白", goodsPrice: 1899, goodsNumber: 1,…}
]
*/
define(["jquery"], function ($) {
  var key = "cartList";
  function addCartStorge(data, cb) {
    var cartList = getCartStorge();
    var flag = false;
    var index = -1;
    for (var i = 0; i < cartList.length; i++) {
      if (
        cartList[i].goodsId == data.goodsId &&
        cartList[i].goodsColor == data.goodsColor
      ) {
        flag = true;
        index = i;
      }
    }
    if (flag) {//累加
      cartList[index].goodsNumber += data.goodsNumber
      setCartStorge(cartList)
    } else {//localstorge新添加
      cartList.push(data)
      setCartStorge(cartList)
    }
    cb()
  }
  //json对象转字符串
  function setCartStorge(data) {
    return window.localStorage.setItem(key, JSON.stringify(data));
  }
  //字符串解析json
  //  ||'[]' 解析空时 防止报错
  function getCartStorge() {
    return JSON.parse(window.localStorage.getItem(key) || "[]");
  }
  return {
    addCartStorge,
    setCartStorge,
    getCartStorge,
  };
});



