$(document).ready(function(){
    //获取科室
    url = "/plus/API.php";
    postData = {k:2};
    $.post(url, postData, function(result) {
        var str = JSON.parse(result);
        for(var i in str) {
            if(str[i] == 0) {
                break;
            }
            $("#keshi").append(
                 "<option value='"+str[i]["section_name"]+"'>"+str[i]["section_name"]+"</option>"
            );
        }
    });
});
function show_order(){
	$('.order-screen').fadeIn();
}
function hide_order(){
	$('.order-screen').fadeOut();
}
function post_order(){
	var gh_name = $("#name");//姓名
	var gh_tel = $("#tel");//电话
	var gh_date = $("#time");//时间
	var gh_offices = $("#keshi option:selected");//科室
	var gh_sex = $("#sex");//性别
	var gh_des = $("#des");//描述
	tel_re = /^(1\d{10}|((010|02\d|0[3-9]\d{2})-?)?([1-9]\d{6,7}))$/;
	if(gh_name.length>0 &&gh_name.val() ==""){
		showMsg('姓名不能为空！',2000);
		gh_name.focus();
		return false;
	}
	if(gh_tel.length>0 &&gh_tel.val() ==""){
		showMsg('联系电话不能为空！',2000);
		gh_tel.focus();
		return false;
	}
	if(!tel_re.test(gh_tel.val())) {
    showMsg('联系电话格式不正确，请输入11位手机号码！',2000);
    gh_tel.focus();
		return false;
  }
	if(gh_sex.length>0 &&gh_sex.val() =="0"){
		showMsg('请选择性别！',2000);
    gh_sex.focus();
		return false;
	}
	if(gh_offices.length>0 &&gh_offices.val() =="0"){
		showMsg('请选择科室！',2000);
    gh_offices.focus();
		return false;
	}
	if(gh_date.length>0 &&gh_date.val() ==""  ){
		showMsg('请选择您的预约时间！',2000);
    gh_date.focus();
		return false;
	}
  var data = new Array();
  var weburl = window.location.href;
  var sourceUrl = weburl.split("//")[1];
  data["sourceUrl"] = sourceUrl;
  data["k"] = 1;
  data["name"] = gh_name.val();
  data["phone"] = gh_tel.val();
  data["keshi"] = gh_offices.val();
  data["sex"] = gh_sex.val();
  data["time"]  = gh_date.val();
  data["bingzheng"] = gh_des.val();
  var jsondata = {name:data["name"],phone:data["phone"],keshi:data["keshi"],time:data['time'],bingzheng:data["bingzheng"],k:data["k"],sourceUrl:data["sourceUrl"],sex:data["sex"]};
  url = '/plus/API.php';
  $.post(url,jsondata, function(result) {
      var result = JSON.parse(result);
      if(result.status==1) {
        showMsg("预约成功！我们将会在30分钟内联系您。");
        $('.order-screen').fadeOut(300);
      }else{
        showMsg("提交失败，请拨打电话0755-25111120进行预约。");
      }
  });
}
/*消息提示框，用来代替alert*/
/*data参数为提示内容，必需*/
/*time参数为显示时间，到时间后自动消失，可选*/
/*width参数为窗口宽度，可选*/
function showMsg(data, time, width){
  $(".msg").remove();
  (typeof(timeout1) != "undefined") ? clearTimeout(timeout1) : "";
  (typeof(timeout2) != "undefined") ? clearTimeout(timeout2) : "";
  var msg = data ? data : "";
  var msg_width = width ? width : 280;
  var msg_style = '<style class="msg_style msg_remove">.msg{display:none; background:#fff; position:fixed; top:35%; left:50%; width:'+msg_width+'px; max-width:500px; min-width:280px; text-align:center; border-radius:5px; color:#555; box-shadow:0 0 10px 2px rgba(0,0,0,0.5); z-index:1100;} .msg .close{position:absolute; top:0; right:0; width:30px; height:30px; line-height:30px; font-size:26px; font-weight:bold; background:rgba(0,0,0,0.1); cursor:pointer;} .msg h3{border-bottom:1px solid #ccc; margin:0 10px; padding:10px 0;} .msg p{margin:15px;}</style>';
  var msg_html = '<div class="msg msg_remove"><div class="close">×</div><h3>温馨提示</h3><p>'+msg+'</p></div>';
  var msg_script = '<script class="msg_script msg_remove">\n$(".msg").css("margin-left",-$(".msg").width()/2+"px");\n$(".msg .close").click(function(){$(".msg").fadeOut(300);\nsetTimeout(function(){$(".msg_remove").remove()},1000)})\n<\/script>';
  $("body").append(msg_style+msg_html+msg_script);
  $(".msg").fadeIn(300);
  var htime_script = time ? '<script class="htime_script msg_remove">var timeout1 = setTimeout(function(){$(".msg").fadeOut(300)},'+time+');var timeout2 = setTimeout(function(){$(".msg_remove").remove()},'+(time+300)+')<\/script>' : '';
  $("body").append(htime_script);
}