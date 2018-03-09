<?php
    
    ////请求30最新预约人
    //if(!empty($_POST) && $_POST["k"] == 3) {
    //    $post_data["k"] = $_POST["k"];
    //    $result = send_post($url, $post_data);
    //    exit($result);
    //}
    class translation {
        /*
         *挂号信息转发中心 
         * $_POST["k"] == 1,请求挂号
         * $_POST["k"] == 2,请求科室
         */
          public $url = "http://list.kbetyy.com/index.php/Home/Api";//挂号地址http://gh.kbetyy.com/Api/
          public function __construct() {
              echo header("Access-Control-Allow-Origin:*");
            switch ($_POST['k']) {
                case 1:$this->send_register();break;
                case 2:$this->quest_department();break;
                default:$this->jsonRetun(['error_det'=>'参数错误','error'=>0]);
            }    
          }
          /**
           *请求挂号
           *
           */
          public function send_register(){
            $this->submit_limit();
              //提交挂号
              if(!empty($_POST) && $_POST["k"] == 1) {
                  $post_data["k"]          = $_POST["k"];
                  $post_data["username"]   = $_POST["name"]; 
                  $post_data["phone"]      = $_POST["phone"];
                  $post_data["keshi"]      = $_POST["keshi"];
                  $post_data["bingzheng"]  = $_POST["bingzheng"]; 
                  $post_data["time"]       = $_POST["time"];
                  $post_data["source_web"] = $_SERVER['HTTP_HOST'];
                  $post_data["source_url"] = $_POST["sourceUrl"];
                  $post_data["ip"]         = $_SERVER['REMOTE_ADDR'];//本地ip
                  $post_data["sex"]       = $_POST['sex'];
                  $result = $this->send_post($this->url, $post_data);
                  exit($result);
              }
          }
          /**
           *请求科室列表
           *
           */
          public function quest_department() {
            //请求科室列表
              $post_data["k"] = $_POST["k"];
              $result = $this->send_post($this->url, $post_data);
              exit($result);
          }
         /**
         * 发送post请求
         * @param string $url 请求地址
         * @param array $post_data post键值对数据
         * @return string
         */
        public function send_post($url, $post_data) {
          $postdata = http_build_query($post_data);
          $options = array(
            'http' => array(
              'method' => 'POST',
              'header' => 'Content-type:application/x-www-form-urlencoded',
              'content' => $postdata,
              'timeout' => 15 * 60 // 超时时间（单位:s）
            )
          );
          $context = stream_context_create($options);
          $result = file_get_contents($url, false, $context);
          return $result;
        }

        /**
         *请不要在1分钟内重复提交
         *
         */
        public function  submit_limit() {
          session_start();
          if(!empty($_SESSION['submit_time'])) {
            $time_limit = $_SESSION['submit_time']+60;

          }else{
            $time_limit = time();

          }
          if($time_limit > time()) {
            $this->jsonReturn(array('error'=>0,'error_det'=>'请不要在1分钟内重复请求！'));

          }
          $_SESSION['submit_time'] = time();

        }
        /**
         ** jsonl返回格式
         **/
        private function jsonReturn($arr=array('error'=>0),$status=0) {
          header('Content-type: application/json');
          $arr['status'] = $status;
          if($arr['error'] == 0) {
            $tmparr   = debug_backtrace();
            if($tmparr[0]['line']) {
              $arr['error_line'] =  $tmparr[0]['line'];

            }
            if($tmparr[0]['file']) {
              $arr['error_file'] = $tmparr[0]['file'];

            }

          }
          $data = json_encode($arr);
          exit($data);
        } 

        } 
    new translation;


