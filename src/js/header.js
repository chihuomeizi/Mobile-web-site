$(function(){
 //搜索的功能
 //设置遮罩层
 let layer = $('<div class="search"><div id="searchInfo"></div></div>');
 //追加到页面
  layer.appendTo('body');
  //遮罩层隐藏
 layer.hide();

 //根据输入的关键 加载列表数据
 function  loadKeyWordData(keyword){
   return axios.get("goods/qsearch",{
    params:{
      query:keyword
    }
   });
 }

 function  renderList (paramData){
  return new Promise(function(resolve,reject){
  let html = template('searchTpl',paramData.data);
  $("#searchInfo").html(html);
  resolve();
  })
 }


//处理所有的事件
$("#search").on("focus",function(){
layer.show()
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
