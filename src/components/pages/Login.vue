<template>
  <div class="login" style="margin-top:50px;">

    <div class="header">
      <div class="switch" id="switch"><a class="switch_btn_focus" id="switch_qlogin" href="javascript:void(0);" tabindex="7">快速登录</a>
        <a class="switch_btn" id="switch_login" href="javascript:void(0);" tabindex="8">快速注册</a><div class="switch_bottom" id="switch_bottom" style="position: absolute; width: 64px; left: 0px;"></div>
      </div>
    </div>


    <div class="web_qr_login" id="web_qr_login" style="display: block; height: 335px;">

      <!--登录-->
      <div class="web_login" id="web_login">


        <div class="login-box">


          <div class="login_form">
<!--            <form action="" name="loginform" accept-charset="utf-8" id="login_form" class="loginForm" method="post"><input type="hidden" name="did" value="0"/>-->
            <div id="userCueLogin" class="cue">*请输入用户名和密码</div>
              <input type="hidden" name="to" value="log"/>
              <div class="uinArea" id="uinArea">
                <label class="input-tips" for="u">帐号：</label>
                <div class="inputOuter" id="uArea">

                  <input type="text" id="u" name="username" class="inputstyle"/>
                </div>
              </div>
              <div class="pwdArea" id="pwdArea">
                <label class="input-tips" for="p">密码：</label>
                <div class="inputOuter" id="pArea">

                  <input type="password" id="p" name="p" class="inputstyle"/>
                </div>
              </div>

              <div style="padding-left:50px;margin-top:20px;"><input type="button" value="登 录" style="width:150px;" class="button_blue" @click="dologin"/></div>
<!--            </form>-->
          </div>

        </div>

      </div>
      <!--登录end-->
    </div>

    <!--注册-->
    <div class="qlogin" id="qlogin" style="display: none; ">

      <div class="web_login"><form name="form2" id="regUser" accept-charset="utf-8"  action="" method="post">
        <input type="hidden" name="to" value="reg"/>
        <input type="hidden" name="did" value="0"/>
        <ul class="reg_form" id="reg-ul">
          <div id="userCue" class="cue">快速注册请注意格式</div>
          <li>

            <label for="user"  class="input-tips2">用户名：</label>
            <div class="inputOuter2">
              <input type="text" id="user" name="user" maxlength="16" class="inputstyle2"/>
            </div>

          </li>

          <li>
            <label for="passwd" class="input-tips2">密码：</label>
            <div class="inputOuter2">
              <input type="password" id="passwd"  name="passwd" maxlength="16" class="inputstyle2"/>
            </div>

          </li>
          <li>
            <label for="passwd2" class="input-tips2">确认密码：</label>
            <div class="inputOuter2">
              <input type="password" id="passwd2" name="" maxlength="16" class="inputstyle2" />
            </div>

          </li>

          <li>
            <label for="phone" class="input-tips2">手机号：</label>
            <div class="inputOuter2">

              <input type="text" id="phone" name="phone" maxlength="15" class="inputstyle2"/>
            </div>

          </li>

          <li>
            <div class="inputArea">
              <input type="button" id="reg"  style="margin-top:10px;margin-left:85px;" class="button_blue" value="同意协议并注册" @click = "registerFunc"/> <a href="#" class="zcxy" target="_blank">注册协议</a>
            </div>

          </li><div class="cl"></div>
        </ul></form>


      </div>


    </div>
    <!--注册end-->
  </div>
</template>


<script>
  import $ from 'jquery';
  // window.jQuery = $;
  import jQuery from 'jquery'
  import '@/assets/css/login2.css'
  import axios from 'axios'

  import '@/assets/css/bootstrap.css';
  import 'bootstrap-dialog/dist/css/bootstrap-dialog.css';
  import bootstrap from 'bootstrap';
  import BootstrapDialog from 'bootstrap-dialog';
  window.alert1 = (msg) => {
      BootstrapDialog.show({
          title:'提示信息',
          message: msg
      });
  }

export default {
  name: "login",
  data() {
    return {
    }

  },
    mounted(){
      this.loginMethod();
      // this.logintab();
      // this.registerFunc();
    },
    update(){
        // this.registerFunc();
    }
    ,
  methods: {
      loginMethod(){
          $('#switch_qlogin').click(function(){
              $('#switch_login').removeClass("switch_btn_focus").addClass('switch_btn');
              $('#switch_qlogin').removeClass("switch_btn").addClass('switch_btn_focus');
              $('#switch_bottom').animate({left:'0px',width:'70px'});
              $('#qlogin').css('display','none');
              $('#web_qr_login').css('display','block');

          });
          $('#switch_login').click(function(){

              $('#switch_login').removeClass("switch_btn").addClass('switch_btn_focus');
              $('#switch_qlogin').removeClass("switch_btn_focus").addClass('switch_btn');
              $('#switch_bottom').animate({left:'154px',width:'70px'});

              $('#qlogin').css('display','block');
              $('#web_qr_login').css('display','none');
          });
          if(this.getParam("a")=='0')
          {
              $('#switch_login').trigger('click');
          }
      }//loginMethod
      ,
      logintab(){
          scrollTo(0);
          $('#switch_qlogin').removeClass("switch_btn_focus").addClass('switch_btn');
          $('#switch_login').removeClass("switch_btn").addClass('switch_btn_focus');
          $('#switch_bottom').animate({left:'154px',width:'96px'});
          $('#qlogin').css('display','none');
          $('#web_qr_login').css('display','block');
      },
      dologin(){
          if ($('#u').val() == ""){
              $('#u').focus().css({
                  border: "1px solid red",
                  boxShadow: "0 0 2px red"
              });
              $('#userCueLogin').html("<font color='red'><b>×用户名不能为空</b></font>");
              return false;
          }
          if ($('#p').val() == ""){
              $('#p').focus().css({
                  border: "1px solid red",
                  boxShadow: "0 0 2px red"
              });
              $('#userCueLogin').html("<font color='red'><b>×密码不能为空</b></font>");
              return false;
          }

          //这里发送axios请求
          axios({
              headers: {
                  'Content-Type': 'application/json;'
              },
              method: 'post',
              url: '/user/login',
              params:{
                  username:$('#u').val(),
                  password:$('#p').val(),
              },
              withCredentials: true
          }).then(response => {
              console.log(response);
              alert1(response.data.msg);
              if(response.data.status != 0) {
                  return;
              }
              sessionStorage.setItem("currentUser", JSON.stringify(response.data.data));
              this.$router.push('/main');
          }).catch(response => {
              alert1("未知错误");
              console.log(response);
          })


      }
      ,
      registerFunc(){

          if ($('#user').val() == "") {
              $('#user').focus().css({
                  border: "1px solid red",
                  boxShadow: "0 0 2px red"
              });
              $('#userCue').html("<font color='red'><b>×用户名不能为空</b></font>");
              return false;
          }



          if ($('#user').val().length < 4 || $('#user').val().length > 16) {

              $('#user').focus().css({
                  border: "1px solid red",
                  boxShadow: "0 0 2px red"
              });
              $('#userCue').html("<font color='red'><b>×用户名位4-16字符</b></font>");
              return false;

          }
           var pwdmin = 6;

          if ($('#passwd').val().length < pwdmin) {
              $('#passwd').focus();
              $('#userCue').html("<font color='red'><b>×密码不能小于" + pwdmin + "位</b></font>");
              return false;
          }
          if ($('#passwd2').val() != $('#passwd').val()) {
              $('#passwd2').focus();
              $('#userCue').html("<font color='red'><b>×两次密码不一致！</b></font>");
              return false;
          }

          var sqq = /^[1-9]{1}[0-9]{4,9}$/;
          if ($('#phone').val().length < 11) {
              $('#phone').focus().css({
                  border: "1px solid red",
                  boxShadow: "0 0 2px red"
              });
              $('#userCue').html("<font color='red'><b>×手机格式不正确</b></font>");return false;
          } else {
              $('#phone').css({
                  border: "1px solid #D7D7D7",
                  boxShadow: "none"
              });
          }
          //这里发送axios请求
          axios({
              headers: {
                  'Content-Type': 'application/json;'
              },
              method: 'post',
              url: '/user/registerUser',
              params:{
                  username:$('#user').val(),
                  password:$('#passwd').val(),
                  phone:$('#phone').val()
              },
              withCredentials: true
          }).then(response => {
            alert1(response.data.msg);
          }).catch(response => {
              console.log(response);
              alert1("失败！");
          })
          // $('#regUser').submit();
      }//registerFunc
      ,
      //根据参数名获得该参数 pname等于想要的参数名
      getParam(pname) {
      var params = location.search.substr(1); // 获取参数 平且去掉？
      var ArrParam = params.split('&');
      if (ArrParam.length == 1) {
          //只有一个参数的情况
          return params.split('=')[1];
      }
      else {
          //多个参数参数的情况
          for (var i = 0; i < ArrParam.length; i++) {
              if (ArrParam[i].split('=')[0] == pname) {
                  return ArrParam[i].split('=')[1];
              }
          }
      }
  }
  }
};
</script>

<style scoped>
.el-input {
        width:300px;
}
  .login{
    background:rgba(0,0,0,0.02)
  }
</style>
