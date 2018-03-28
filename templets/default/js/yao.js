/*右侧摇一摇咨询*/
document.writeln("<style>");
document.writeln(".right_yyy{ position:fixed; right:0; top:30%; width:3rem; z-index:98;}");
document.writeln(".right_yyy img{ width:100%;}");
document.writeln("</style>");
document.writeln("<div class=\"right_yyy\"><a href=\"/swt/\"><img src=\"/templets/default/images/yaoyiyao.gif\" /></a></div>");
var SHAKE_THRESHOLD = 1600;
var last_update = 0;
var x = y = z = last_x = last_y = last_z = 0;
if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', deviceMotionHandler, false);
} else {
    alert('本设备不支持摇一摇事件');
}
function deviceMotionHandler(eventData) {
  var acceleration = eventData.accelerationIncludingGravity;
  var curTime = new Date().getTime();
  if ((curTime - last_update) > 100) {
    var diffTime = curTime - last_update;
    last_update = curTime;
    x = acceleration.x;
    y = acceleration.y;
    z = acceleration.z;
    var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
    var status = document.getElementById("status");

    if (speed > SHAKE_THRESHOLD) {
        openswt();
    }
    last_x = x;
    last_y = y;
    last_z = z;
  }
}
function openswt() {onKST();}