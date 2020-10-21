//1.initCart


//$cart_List
//input value 数量


requirejs.config({
  paths: {
    jquery: "../lib/jquery-3.4.1.min",
  },
});
define(["jquery", "./modules/cartStorge"], function (
  $,
  { getCartStorge, setCartStorge }
) {
  var $cart = $("#cart");

  initCart();

  function initCart() {//初始化cart
    //初始化购物车页面
    var $cart_list = $cart.find(".cart_list");
    var $cart_title_selectAll = $('.cart_title_selectAll')
    var cartList = getCartStorge();
    //console.log("cartList: ", cartList);

    var tmp = cartList
      .map((v, i, a) => {
        return `
              <li>
                  <div>${
                    v.goodsChecked
                      ? '<input class="cb" type="checkbox" checked>'
                      : '<input class="cb" type="checkbox">'
                  }</div>
                  <div>${v.goodsName} ( ${v.goodsColor} )</div>
                  <div>¥ ${v.goodsPrice}.00</div>
                  <div>
                      <span class="reduceBtn">-</span>
                      <input class="cart_list_text" type="text" value="${
                        v.goodsNumber
                      }">
                      <span class="addBtn">+</span>
                  </div>
                  <div class ="priceNumber">¥ ${v.goodsNumber * v.goodsPrice}.00</div>
                  <div class="removeBtn">删除</div>
              </li>
          `;
      })
      .join("");

    $cart_list.html(tmp);

    //总共多少件
    var AllNumber = 0
    var AllMoney = 0
    var $cart_computed_price_1 = $('.cart_computed_price p').eq(1)
    var $cart_computed_price_0 = $('.cart_computed_price p').eq(0)
    var $cart_list_text = $('.cart_list_text')
    var cbs = $cart.find('.cb').get()
    for(var i = 0; i < cbs.length; i++){
      if(cbs[i].checked){
        AllNumber += Number($cart_list_text.eq(i).val())
        AllMoney += cartList[i].goodsNumber * cartList[i].goodsPrice
      }
    }
    $cart_computed_price_1.html(`已选择 ${AllNumber}件商品`)
    $cart_computed_price_0.html(`总计：¥ ${AllMoney}.00`)

    chooseNumberFn(cartList);
    removeCartFn(cartList);
    chooseCheckboxFn(cartList);
    if(isAllCheckboxFn()){
      $cart_title_selectAll.prop('checked',true)
    }
    else{
      $cart_title_selectAll.prop('checked',false)
    }
    chooseAllCheckbox(cartList)
  }
  // + -
  //setlocalStorge ，initCart()
  //删除 splice() 位置，个数
  function chooseNumberFn(cartList) {
    var $reduceBtn = $cart.find(".reduceBtn");
    var $addBtn = $cart.find(".addBtn");
    var $cart_list_text = $cart.find(".cart_list_text");
    //+
    $addBtn.click(function () {
      //console.log('$addBtn: ', $addBtn);
      var index = $(this).closest("li").index();
      //console.log('index: ', index);
      //console.log(cartList)
      cartList[index].goodsNumber++;
      setCartStorge(cartList);
      initCart();
    });
    //-
    $reduceBtn.click(function () {
      //console.log('$addBtn: ', $addBtn);
      var index = $(this).closest("li").index();
      //console.log('index: ', index);
      console.log(cartList);

      if (cartList[index].goodsNumber <= 0) {
        return;
      }
      cartList[index].goodsNumber--;
      setCartStorge(cartList);
      initCart();
    });
    //input val() 是字符串
    $cart_list_text.on("input", function () {
      if (!Number($(this).val())) {
        $(this).val("");
        return;
      }
    });
    $cart_list_text.on("blur", function () {
      if (!Number($(this).val())) {
        $(this).val(1);
      }
      var index = $(this).closest("li").index();
      cartList[index].goodsNumber = Number($(this).val());
      setCartStorge(cartList);
      initCart();
    });
  }
  function removeCartFn(cartList) {//删除
    var $removeBtn = $(".removeBtn");
    $removeBtn.click(function () {
      var index = $(this).closest("li").index();
      cartList.splice(index, 1);
      setCartStorge(cartList);
      initCart();
    });
  }
  //test isAll
  function chooseCheckboxFn(cartList) {//复选框切换本地的checked
    //console.log('cartList: ', cartList);
    var $cbs = $cart.find('.cb')
    
    //console.log('$cart_title_selectAll: ', $cart_title_selectAll);

    $cbs.click(function(){
      // console.log('$cbs: ', $cbs);
      var index = $(this).closest('li').index()
      cartList[index].goodsChecked = this.checked
      setCartStorge(cartList)
      initCart()
      
    })
  }
  function isAllCheckboxFn(cartList){//checkbox全选 
    var cbs = $cart.find('.cb').get()
    for(var i = 0; i < cbs.length;i++){
      if(!cbs[i].checked){
        return false
      }
    }
    return true
  }
  function chooseAllCheckbox(cartList){//全选框fn
    var $cart_title_selectAll = $('.cart_title_selectAll')
    $cart_title_selectAll.click(function(){
      //console.log('$cart_title_selectAll: ', $cart_title_selectAll);
      for(var i = 0 ; i < cartList.length; i++){
        cartList[i].goodsChecked = this.checked
      }
      setCartStorge(cartList)
      initCart()
    })
  }



});
