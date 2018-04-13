$(function(){

// 3. 商品列表
function loadListData(){
  return axios.get('home/goodslist');
}
function renderList(paramData){
  return new Promise(function(resolve,reject){
   let text = template('listTpl',paramData.data);
   $('#listInfo').html(text);
    resolve();
  })
}



//2.菜单处理
function loadMenuData(){
  return axios.get('home/catitems');
}

function renderMenu(paramData){
   return  new Promise(function(resolve,reject){
      let text = template('menuTpl',{list:paramData.data});
      $("#menuInfo").html(text);
      resolve();
   })
}
 

 //1.轮播图
 //获取轮播图的数据
 function loadSwiperData(){
  return axios.get('home/swiperdata');
 }
 // 渲染轮播图模板
 function renderSwiper(paramData){
   return new Promise(function(resolve,reject){
      let html = template('swiperTpl',{list:paramData.data});
      $('#swiperinfo').html(html);
      resolve();
   });

 }
 function handleSwiper(){
  return new Promise(function(resolve,reject){
        new Swiper('.swiper-container',{
        loop : true,
        pagination: {
        el: '.swiper-pagination',
       },
       autoplay: {
        disableOnInteraction: false,
      }
    })
        resolve();
  })
 }

   //页面初始化完成之后,触发改事件
  $(document).on("pageInit", function(e, pageId, $page) {
    // 处理轮播效果
    loadSwiperData()
      .then(renderSwiper)
      .then(handleSwiper)
      .then(function(){
        $.toast('success');
      })
      .catch(function(){
        $.toast('服务器错误');
      })

      //菜单
      loadMenuData()
      .then(renderMenu)
      .then(function(){
        $.toast("success");
      })
     .catch(function(){
      $.toast("响应失败");
     })

     //商品列表
     loadListData()
     .then(renderList)
     .then(function(){
      $.toast('success');
     })
     .catch(function(){
      $.toast('响应失败');
     })
  });
  $.init();

})
