$(window).load(function(){
	$('table td').css({
		'padding-left':'0px',
	})
	$('#BMapLib_transBox0 table tr td').eq(0).remove();
	$('.BMapLib_icon_nbs').append('<i class="fa fa-search" aria-hidden="true"></i>');
	$('.BMapLib_icon_tohere').append('<i class="fa fa-map-marker" aria-hidden="true"></i>');
	$('.BMapLib_icon_fromhere').append('<i class="fa fa-map-pin" aria-hidden="true"></i>');
	$('#BMapLib_trans0').attr('src','/templets/kangbei/images/iw_tail.png');
})
 var map = new BMap.Map('map');
	var poi = new BMap.Point(114.026546,22.652034);
	map.centerAndZoom(poi, 17);
	map.enableScrollWheelZoom();
	/*var content = '<div style="margin:0;line-height:25px;p">' +
            '<img src="/templets/kangbei/images/yypic.jpg" alt="" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>' +
            '地址：深圳市龙华区工业西路97号<br/>电话：0755-25111120<br/>简介：深圳康贝儿童医院是在国家卫计委等职能部门大力倡导下，经深圳市卫生行政管理部门批准的集医疗、科研、特教、康复、保健为一体的综合性儿童医院。' +
          '</div>';*/

//创建检索信息窗口对象
var searchInfoWindow = null;
searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
	title  : "深圳康贝儿童医院",      //标题
	width  : 350,             //宽度
	height : 145,              //高度
	panel  : "panel",         //检索结果面板
	enableAutoPan : true,     //自动平移
	searchTypes   :[
		BMAPLIB_TAB_SEARCH,   //周边检索
		BMAPLIB_TAB_TO_HERE,  //到这里去
		BMAPLIB_TAB_FROM_HERE //从这里出发
	]
});
var marker = new BMap.Marker(poi); //创建marker对象
marker.enableDragging(); //marker可拖拽
searchInfoWindow.open(marker);
marker.addEventListener("click", function(e){
    searchInfoWindow.open(marker);
})
map.addOverlay(marker); //在地图中添加marker
map.addControl(new BMap.ScaleControl());
