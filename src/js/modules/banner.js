//提供banner的数据接口
//测试banner数据是否拿到 banner.js:7 {type: "banner", code: 0, banner_list: Array(3)}
/* 
"banner_list" : [
        {
            "imgUrl" : "https://res.vmallres.com/pimages//pages/picImages/SvoDG8hGzgJRqyqqDy3M.jpg",
            "imgLink" : "https://www.vmall.com/product/10086478053817.html"
        },
        {
            "imgUrl" : "https://res.vmallres.com/pimages//pages/picImages/umfjbo8MJzplGtwWvECR.jpg",
            "imgLink" : "https://www.vmall.com/huawei"
        },
        {
            "imgUrl" : "https://res.vmallres.com/pimages//pages/picImages/XmPuLTHlBHxaJFMl8Zh9.jpg",
            "imgLink" : "https://www.vmall.com/product/10086226569988.html"
        }
    ]

*/
//map 把一个数组返回一个新数组 新数组中每一项和li
//join 数组转字符串 " "连接

/* 
<ul>
     <li class="${i == 0 ? 'show' : ''}"><a href="${v.imgLink}"><img src="${v.imgUrl}" alt=""></a></li>
     <li class="${i == 0 ? 'show' : ''}"><a href="${v.imgLink}"><img src="${v.imgUrl}" alt=""></a></li>
     <li class="${i == 0 ? 'show' : ''}"><a href="${v.imgLink}"><img src="${v.imgUrl}" alt=""></a></li>  
</ul>

*/

// <ul>
//     <li class="show"><a href="#"><img src="/static/img/banner_img1.jpg" alt=""></a></li>
//     <li><a href="#"><img src="/static/img/banner_img2.jpg" alt=""></a></li>
//     <li><a href="#"><img src="/static/img/banner_img3.jpg" alt=""></a></li>
// </ul>
// <ol>
//     <li class="active"></li>
//     <li></li>
//     <li></li>
// </ol>
// <div class="banner-mask"></div>

define(["jquery"], function ($) {
  var $banner = $("#banner");
  function initBanner(res) {
    //console.log(res);
    var tmp = `
            <ul>
                ${res.banner_list
                  .map((v, i, a) => {
                    return `
                        <li class="${i == 0 ? "show" : ""}"><a href="${
                      v.imgLink
                    }"><img src="${v.imgUrl}" alt=""></a></li>
                        `;
                  })
                  .join("")}
            </ul>
            <ol>
                ${res.banner_list
                  .map((v, i, a) => {
                    return `
                        <li class="${i == 0 ? "active" : ""}"></li>
                        `;
                  })
                  .join("")}
            </ol>
            <div class="banner-mask"></div>
        `;
    $banner.html(tmp);
    handleBanner();
  }
  //添加banner交互
  //动态 委托 参数2事件触发元素
  //被mask挡住
  function handleBanner() {
    $banner.on("click", "ol li", function () {
      
      $(this).attr("class", "active").siblings().attr("class", "");
      var $ulLis =  $banner.find('ul li');
      $ulLis.eq( $(this).index() ).attr('class','show').siblings().attr('class','');
    });
  }

  return initBanner;
});
