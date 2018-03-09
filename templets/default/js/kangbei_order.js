$(document).ready(function(){
    //科室列表
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
	var gh_name = $("input[name='gh_name']");//姓名
	//var gh_sex = $("input[name='gh_sex']");//性别
	//var gh_age = $("input[name='gh_age']");//年龄
	var gh_tel = $("input[name='gh_tel']");//电话
	//var gh_qq = $("input[name='gh_qq']");//QQ
	var gh_date = $("input[name='gh_date']");//时间
	var gh_offices = $('select[name="gh_offices"] option:selected');//科室
    var gh_des = $("textarea[name='gh_des']");//描述
	//var gh_code = $("input[name='gh_code']");
	//var gh_fromurl = window.location.href;//来源
    var tel_re = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0-9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
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
  data["time"]  = gh_date.val();
  data["bingzheng"] = gh_des.val();
  var jsondata = {name:data["name"],phone:data["phone"],keshi:data["keshi"],time:data['time'],bingzheng:data["bingzheng"],k:data["k"],sourceUrl:data["sourceUrl"]};
  url = '/plus/API.php';
  $.post(url,jsondata, function(result) {
    try {
      var result = JSON.parse(result);
    } catch(error) {
        　　
    } 
      if(result.status==1) {
        showMsg("预约成功！我们将会在30分钟内联系您。");
        $('.order-screen').fadeOut(300);
      }else{
        if(result.error_det) {
            showMsg(result.error_det);
        }else{
           showMsg("提交失败，请拨打电话0755-25111120进行预约。");
        }
      }
  });
}
/*消息提示框，用来代替alert*/
/*data参数为提示内容，必需*/
/*time参数为显示时间，到时间后自动消失，可选*/
function showMsg(data, time){
  var msg = data ? data : "";
  var msg_style = '<style class="msg_style msg_remove">.msg{display:none; background:#fff; position:fixed; top:35%; left:50%; width:280px; margin-left:-140px; text-align:center; border-radius:5px; color:#555; box-shadow:0 0 10px 2px rgba(0,0,0,0.5); z-index:1100;} .msg .close{position:absolute; top:0; right:0; width:30px; height:30px; line-height:30px; font-size:26px; font-weight:bold; background:rgba(0,0,0,0.1); cursor:pointer;} .msg h3{border-bottom:1px solid #ccc; margin:0 10px; padding:10px 0;} .msg p{margin:15px;}</style>';
  var msg_html = '<div class="msg msg_remove"><div class="close">×</div><h3>温馨提示</h3><p>'+msg+'</p></div>';
  var msg_script = '<script class="msg_script msg_remove">$(".msg .close").click(function(){$(".msg").fadeOut(300);setTimeout(function(){$(".msg_remove").remove()},1000)})<\/script>';
  $("body").append(msg_style+msg_html+msg_script);
  $(".msg").fadeIn(300);
  var htime_script = time ? '<script class="htime_script msg_remove">setTimeout(function(){$(".msg").fadeOut(300)},'+time+');setTimeout(function(){$(".msg_remove").remove()},'+(time+300)+')<\/script>' : '';
  $("body").append(htime_script);
}
