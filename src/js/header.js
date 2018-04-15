$(function(){
 //搜索的功能
 //设置遮罩层
 let layer = $('<div class="search"><div id="searchInfo"></div></div>');
 //追加到页面
  layer.appendTo('body');
  //遮罩层隐藏
 layer.hide();

  //实现搜索点击时跳转
  window.showDetail = function (id,name){
   let flag = false;
   let  history = localStorage.getItem('searchHistory');
   if(history){
     // 从第二次开始执行该分支
    // 将字符串信息转换为json对象
    let historyInfo = JSON.parse(history);
    //判断数组中是否包含的有指定的id
    historyInfo.some(function(item){
     if(id === item.goods_id){
       // 如果当前传递过来的id和已经存在的相等，就证明已经存在
       flag = true;
       //找到之后终止
       return true;
     }
    })
    if(!flag){
     //如果不不存在,就添加进去
      let info = {
        goods_id : id,
        goods_name : name
      }
      historyInfo.push(info);
      localStorage.setItem('searchHistory',JSON.stringify(historyInfo));
    }
   
   }else{

       //获取你点击时候的数据
   let info ={
    goods_id : id,
    goods_name : name
   }
   //及获取到的人数据添加到数组中
   let arr = [];
   arr.push(info);
  // 将获取到的数据存储到localStorage中\
   localStorage.setItem('searchHistory',JSON.stringify(arr));

  }
   // 实现跳转
    location.href = '/goods-detail.html?goods_id=' + id;

   }

 //根据输入的关键 加载列表数据
 function  loadKeyWordData(keyword){
   return axios.get("goods/qsearch",{
    params:{
      query:keyword
    }
   });
 }
  //将数据渲染到列表中
 function  renderList (paramData){
  return new Promise(function(resolve,reject){
  let html = template('searchTpl',paramData.data);
  $("#searchInfo").html(html);
  resolve();
  })
 }

                                               
//处理所有的事件
$("#search").on("focus",function(){
layer.show();
 //获取搜索历史的数据
 let historyInfo = localStorage.getItem('searchHistory');
 //判断获取的是否有数据
 if(historyInfo){
  //表示有数据
  historyInfo = JSON.parse(historyInfo);
  //将数据渲染到页面中
  let html = template('searchTpl',historyInfo);
  
  $("#searchInfo").html(html);
 }
})

$("#search").on("blur",function(){
  //保证点击a标签之后再触发隐藏操作
  setTimeout(function(){
   layer.hide();
   },0)

})

$("#search").on("input",function(){
  let text = $("#search").val();
loadKeyWordData(text).then(renderList)
}) 

})
