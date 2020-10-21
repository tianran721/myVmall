requirejs.config({
  paths: {
    jquery: "../lib/jquery-3.4.1.min",
  },
});

define(["jquery", "../api/server", "./modules/banner","./modules/cartStorge"], function (
  $,
  { getBanner2Data, getDetailData },
  initBanner,
  { addCartStorge }
) {
  getBanner2Data().then((res) => {
    //console.log(res)
    //console.log(type, id);
    initBanner(res);
  });

//getDetailData
//type=phone&id=10086619736763
//[type=phone,phone]
//phone
//10086619736763
//测试  pad 10086466203116
/* 
  {goodsImg: "https://res0.vmallres.com/pimages//product/6901443…79392B572C21EE009917E689200B6B6089FEB1C4ED9mp.png", goodsId: "10086601038627", goodsName: "荣耀20S", goodsPrice: 1899, chooseColor: Array(3), …}
  chooseColor: (3) ["蝶羽黑", "蝶羽蓝", "蝶羽白"]
  goodsId: "10086601038627"
  goodsImg: "https://res0.vmallres.com/pimages//product/6901443323753/428_428_189FA79392B572C21EE009917E689200B6B6089FEB1C4ED9mp.png"
  goodsInfo: (2) ["https://res.vmallres.com/pimages/detailImg/2019/09…2BCCE5790B5B564139869054F804F9A7F0EB7F7E2FE71.jpg", "https://res.vmallres.com/pimages/detailImg/2019/09…3C9D516591CCF7925F411D677BDBE4495F2A9C55F5225.jpg"]
  goodsName: "荣耀20S"
  goodsPrice: 1899
  photoLarge: "https://res.vmallres.com/pimages//product/6901443323753/group//800_800_F2B85D092975471744CE1DFC710A90EBE1DE99D73B4EAA3B.png"
  photoNormal: "https://res.vmallres.com/pimages//product/6901443323753/group//428_428_F2B85D092975471744CE1DFC710A90EBE1DE99D73B4EAA3B.png"
  __proto__: Object
*/
  //json继续筛选
  //detail
  /* 
    goodsInfo: Array(2)
      0: "https://res.vmallres.com/pimages/detailImg/2019/09/06/6D22BCCE5790B5B564139869054F804F9A7F0EB7F7E2FE71.jpg"
      1: "https://res.vmallres.com/pimages/detailImg/2019/09/06/AC93C9D516591CCF7925F411D677BDBE4495F2A9C55F5225.jpg"
  
  */
  var type = location.search.match(/type=([^&]+)/)[1];
  var id = location.search.match(/id=([^&]+)/)[1];
  var $detail = $("#detail");
  var $detailGoods = $("#detailGoods");
  getDetailData(type, id).then((res) => {
    //console.log(res);
    initDetail(res);
  });
  function initDetail(res) {
    var tmp = `
            <div class="detail_gallery l">
                <div class="detail_gallery_normal">
                    <img src="${res.photoNormal}" alt="">
                    <span></span>
                </div>
                <div class="detail_gallery_large">
                    <img src="${res.photoLarge}" alt="">
                </div>
            </div>
            <div class="detail_message l">
                <h2>${res.goodsName}</h2>
                <p>价 格 <span class="detail_message_price">¥${res.goodsPrice}.00</span></p>
                <p>选择颜色 
                    ${ res.chooseColor.map((v,i,a)=>{
                        if(i==0){
                            return `<span class="detail_message_box active">${v}</span>`;
                        }
                        else{
                            return `<span class="detail_message_box">${v}</span>`;
                        }
                    }).join('') }
                </p>
                <div class="detail_message_btn clearfix">
                    <div class="detail_message_num l">
                        <input type="text" value="1">
                        <span>+</span>
                        <span>-</span>
                    </div>
                    <div class="detail_message_cart l"><a href="javascript:;">加入购物车</a></div>
                    <div class="detail_message_computed l"><a href="/view/cart.html">立即下单</a></div>
                </div>
            </div>
        `;
        var tmp2 = `
            <h3>-- 商品详情 --</h3>
            ${
                res.goodsInfo.map((v,i,a)=>{
                    return `<img src="${v}" alt="">`;
                }).join('')
            }`;
        $detail.html(tmp);
        $detailGoods.html(tmp2);
        magnifier();
        chooseColorFn();
        chooseNumberFn();
        addCartFn(res);
  }
  //magnifier
  //$detail_gallery_normal 图片
  //差值 * 比例值
  function magnifier() {
    var $detail_gallery_normal = $(".detail_gallery_normal");
    var $detail_gallery_large = $(".detail_gallery_large");
    var $detail_gallery_large_img = $(".detail_gallery_large img");
    //console.log( $detail_gallery_large,$detail_gallery_large_img)
    var $detail_gallery_normal_span = $(".detail_gallery_normal span");
    //var $detail_gallery_large_img = $('.$detail_gallery_large').find('img')
    $detail_gallery_normal
      .hover(
        () => {
          $detail_gallery_normal_span.show();
          $detail_gallery_large.show();
        },
        () => {
          $detail_gallery_normal_span.hide();
          $detail_gallery_large.hide();
        }
      )
      .mousemove((ev) => {
        var L =
          ev.pageX -
          $detail_gallery_normal.offset().left -
          $detail_gallery_normal_span.outerWidth() / 2;
        var T =
          ev.pageY -
          $detail_gallery_normal.offset().top -
          $detail_gallery_normal_span.outerHeight() / 2;
        if (L < 0) {
          L = 0;
        } else if (
          L >
          $detail_gallery_normal.outerWidth() -
            $detail_gallery_normal_span.outerWidth()
        ) {
          L =
            $detail_gallery_normal.outerWidth() -
            $detail_gallery_normal_span.outerWidth();
        }
        if (T < 0) {
          T = 0;
        } else if (
          T >
          $detail_gallery_normal.height() - $detail_gallery_normal_span.height()
        ) {
          T =
            $detail_gallery_normal.height() -
            $detail_gallery_normal_span.height();
        }
        $detail_gallery_normal_span.css({
          left: L,
          top: T,
        });
        var scaleX =
          L /
          ($detail_gallery_normal.outerWidth() -
            $detail_gallery_normal_span.outerWidth());
        var scaleY =
          T /
          ($detail_gallery_normal.outerHeight() -
            $detail_gallery_normal_span.outerHeight());
        $detail_gallery_large_img.css({
          left:
            -scaleX *
            ($detail_gallery_large_img.outerWidth() -
              $detail_gallery_large.outerWidth()),
          top:
            -scaleY *
            ($detail_gallery_large_img.outerHeight() -
              $detail_gallery_large.outerHeight()),
        });
      });
  }
  //chooseColorFn
  function chooseColorFn() {
    var detail_message_box = $(".detail_message_box");
    //console.log(detail_message_box);
    detail_message_box.click(function () {
      $(this).addClass("active").siblings().removeClass("active");
    });
  }
  //chooseNumberFn
  //字符串转类型
  function chooseNumberFn() {
    var $number = $(".detail_message_num input");
    var $addBtn = $(".detail_message_num span").eq(0);
    var $reduceBtn = $(".detail_message_num span").eq(1);
    $addBtn.click(function () {
      var n = Number($number.val()) + 1;
      $number.val(n);
    });
    $reduceBtn.click(function () {
      var n = Number($number.val()) - 1;
      if (n <= 0) {
        return;
      }
      $number.val(n);
    });
    $number.on("input", function () {
      if (!Number($(this).val())) {
        $(this).val("");
      }
    });
    $number.on("blur", function () {
      if (!Number($(this).val())) {
        $(this).val(1);
      }
    });
  }
  //addCartFn
  //localStorge
  /* 
    goodsId
    goodsChecked
    goodsName
    goodsColor 页面获取
    goodsNumber 页面获取
    goodsPrice
  */
  //addCartFn
  //cmd + shift + L
  //动态获取 filter() 过滤 $detail_message_box:  k.fn.init [span.detail_message_box.active, prevObject: k.fn.init(3)]
  // var data = {
      //   goodsChecked = true,
      //   goodsName = res.goodsName,
      //   goodsColor = $detail_message_box.html(),
      //   //goodsNumber = ,
      //   goodsPrice = res.goodsPrice,
      //   goodsId = res.goodsId

      // }
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
//本地存储 模块化
function addCartFn(res){   //添加购物车功能
  var $detail_message_cart = $detail.find('.detail_message_cart');
  $detail_message_cart.click(function(){
      var $detail_message_box = $detail.find('.detail_message_box').filter('.active');
      var $detail_message_num = $detail.find('.detail_message_num input');
      //alert(123)
      var data = {
          goodsChecked : true,
          goodsName : res.goodsName,
          goodsColor : $detail_message_box.html(),
          goodsPrice : res.goodsPrice,
          goodsNumber : Number($detail_message_num.val()),
          goodsId : res.goodsId
      };
      console.log(data);
      addCartStorge(data,function(){
        alert('添加购物车成功')
      })
  });
}
});





