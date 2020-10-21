//配置
requirejs.config({
  paths: {
    jquery: "../lib/jquery-3.4.1.min",
  },
});

//测试jq
//引入server.js
//测试拿到banner数据
/* 
    {type: "banner", code: 0, banner_list: Array(3)}
    banner_list: Array(3)
    0: {imgUrl: "https://res.vmallres.com/pimages//pages/picImages/SvoDG8hGzgJRqyqqDy3M.jpg", imgLink: "https://www.vmall.com/product/10086478053817.html"}
    1: {imgUrl: "https://res.vmallres.com/pimages//pages/picImages/umfjbo8MJzplGtwWvECR.jpg", imgLink: "https://www.vmall.com/huawei"}
    2: {imgUrl: "https://res.vmallres.com/pimages//pages/picImages/XmPuLTHlBHxaJFMl8Zh9.jpg", imgLink: "https://www.vmall.com/product/10086226569988.html"}
    length: 3
    __proto__: Array(0)
    code: 0
    type: "banner"
    __proto__: Object
*/
//{ getBannerData } 拿到首页的数据。
// initBanner 拿到bannner的数据
/* 
    Object
    code: "0"
    goods_list: Array(5)
    0: {goodsImg: "https://res0.vmallres.com/pimages//product/6901443…F94A5C5575108AF27F42DEEA8415F70E58F97882DEDmp.png", goodsId: "10086619736763", goodsName: "HUAWEI Mate 30 4G", goodsPrice: 4299, chooseColor: Array(3), …}
    1: {goodsImg: "https://res0.vmallres.com/pimages//product/6901443…79392B572C21EE009917E689200B6B6089FEB1C4ED9mp.png", goodsId: "10086601038627", goodsName: "荣耀20S", goodsPrice: 1899, chooseColor: Array(3), …}
    2: {goodsImg: "https://res0.vmallres.com/pimages//product/6901443293513/428_428_1555464685019mp.png", goodsId: "10086407020352", goodsName: "HUAWEI P30 Pro", goodsPrice: 4988}
    3: {goodsImg: "https://res0.vmallres.com/pimages//product/6901443320394/428_428_1563504284133mp.png", goodsId: "10086612323550", goodsName: "荣耀9X PRO", goodsPrice: 2199}
    4: {goodsImg: "https://res0.vmallres.com/pimages//product/6901443…A85DA0DF00A352F8C0995FDABD97F3CE5AA390EFDFBmp.png", goodsId: "10086310519591", goodsName: "荣耀20i", goodsPrice: 1199}
    length: 5
    __proto__: Array(0)
    title: "手机"
    type: "phone"
    __proto__: Object
*/
define(["jquery", "../api/server", "./modules/banner"], function (
  $,
  { getBannerData, getPhoneData,getBookData,getPadData },
  initBanner
) {
  //console.log($);
  getBannerData().then((res) => {
    //console.log(res)
    initBanner(res);
  });
  //getPhoneData
  getPhoneData().then((res) => {
    //console.log(res)
    initGoods("#phone", res);
  });
  //initGoods
  //li 动态
  //repeat(3)
  //a 跳转 ?
  //goodsId 唯一标识符
  function initGoods(id, res) {
    //console.log(res,id)
    var $elem = $(id);
    var tmp = `
            <h2 class="goods_title">${res.title}</h2>
            <ul class="goods_list clearfix">
                ${res.goods_list
                  .map((v, i) => {
                    return `
                    <li>
                        <a href="/view/detail.html?type=${res.type}&id=${v.goodsId}">
                            <div><img src="${v.goodsImg}" alt=""></div>
                            <h3>${v.goodsName}</h3>
                            <p>¥${v.goodsPrice}</p>
                        </a>
                    </li>
                    
                    `;
                    
                  })
                  .join("").repeat(3)}
            </ul> 
        `;
        $elem.html(tmp)
  }

  //getBookData
  /* 
    {type: "book", title: "笔记本电脑", code: "0", goods_list: Array(5)}
    code: "0"
    goods_list: Array(5)
    0: {goodsImg: "https://res1.vmallres.com/pimages//product/6901443…357169D6798A25B33ADBC6672CAEAA0D4A9C5359BB6mp.png", goodsId: "10086523442577", goodsName: "HUAWEI MateBook D", goodsPrice: 4988, chooseColor: Array(2), …}
    1: {goodsImg: "https://res1.vmallres.com/pimages//product/6901443…4A5DE29E2E4BBDBA60B9A7F6D90898A56C4E9E00EAAmp.png", goodsId: "10086690375130", goodsName: "荣耀MagicBook 2019 科技尝鲜版", goodsPrice: 3699, chooseColor: Array(1), …}
    2: {goodsImg: "https://res1.vmallres.com/pimages//product/6901443297962/428_428_1555752016264mp.png", goodsId: "10086586095009", goodsName: "HUAWEI MateBook X Pro", goodsPrice: 7999}
    3: {goodsImg: "https://res1.vmallres.com/pimages//product/6901443…162660FD51C6430A395BC0441BE2E327990E0343DCFmp.png", goodsId: "10086774565098", goodsName: "荣耀 MagicBook Pro 科技尝鲜版", goodsPrice: 4199}
    4: {goodsImg: "https://res1.vmallres.com/pimages//product/6901443313198/428_428_1563350288356mp.png", goodsId: "10086431645343", goodsName: "【新品】荣耀MagicBook 2019", goodsPrice: 3999}
    length: 5
    __proto__: Array(0)
    title: "笔记本电脑"
    type: "book"
    __proto__: Object
  */
  getBookData().then((res) => {
    //console.log(res)
    initGoods("#book", res);
  });

  //getPadData
  //index.js:92 {type: "pad", title: "精品平板", code: "0", goods_list: Array(5)}
  getPadData().then((res) => {
    //console.log(res)
    initGoods("#pad", res);
  });
});
