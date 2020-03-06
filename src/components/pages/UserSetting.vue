<template>
    <div>
      <!--按钮区-->
      <div class="btnContainer">
        <back-header pagename="用户设置" class="back-header-careatep" backUrl="/main"></back-header>
        <el-button type="primary" class="Publish" @click="postUser">确定</el-button>
      </div>
<!--      头像-->
      <div class="headArea">
        <el-upload
          class="avatar-uploader"
          action="post/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
<!--      表单内容-->
      <div>
        <div class="ineditInput">
          <span class="editLabel">用户名：</span><el-input v-model="username" placeholder="请输入用户名" class="inpEd"></el-input>

        </div>
        <div class="ineditInput">
          <span class="editLabel">密  码：</span><el-input type="password" v-model="password" placeholder="请输入密码" class="inpEd"></el-input>
        </div>
        <div class="ineditInput">
          <span class="editLabel">手  机：</span><el-input v-model="phone" placeholder="请输入手机" class="inpEd"></el-input>
        </div>
      </div>
    </div>
</template>

<script>
    import PageHeader from '@/components/commons/PageHeader'
    import axios from "axios"
    export default {
        name: "userSetting",
        data(){
            var currentUser = sessionStorage.getItem("currentUser");
            currentUser = JSON.parse(currentUser);
            return {
                imageUrl: currentUser.media_path,
                imgReturnUtl:'',
                username:currentUser.username,
                password:'',
                phone:currentUser.phone
            }
        },
        components:{
            "back-header" : PageHeader
        },
        created(){},
        methods:{
            backup(){
                this.$router.go(-1);//返回上一层
            }
            ,
            handleAvatarSuccess(response, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                this.imgReturnUtl = response;
                console.log(response);
            },

            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            postUser(){
                var user = {};
                var currentUser = sessionStorage.getItem("currentUser");
                currentUser = JSON.parse(currentUser);
                user.id = currentUser.id;
                if(this.username != null && this.username != "")
                    user.username=this.username;
                else
                    user.password = currentUser.password;
                if(this.password != null && this.password != "")
                    user.password=this.password;
                else
                    user.password = currentUser.password;
                if(this.phone != null && this.phone != "")
                    user.phone=this.phone;
                else
                    user.phone = currentUser.phone;
                if(this.imgReturnUtl != null && this.imgReturnUtl != "")
                    user.media_path=this.imgReturnUtl;
                else
                    user.media_path = currentUser.media_path;
                axios({
                    headers: {
                        'Content-Type': 'application/json;'
                    },
                    method: 'post',
                    url: '/user/setting',
                    withCredentials: true,
                    async:false,
                    params:user
                }).then(response => {
                    console.log(response.data);
                    this.$router.push("/login");

                }).catch(response => {
                    alert("未知错误");
                    console.log(response);
                })
            }
        }
    }
</script>

<style lang="stylus" scoped>
  .btnContainer
      text-align left
      margin-left 10%
      margin-right 10%
      margin-bottom 5%
      display flex
      .back-header-careatep
          width 90%
          justify-content center
          margin 0 0 0 10%
          padding-top 0.8%
      .Publish
          float right
          margin-right 9%
  .headArea
      margin-left 10%
      margin-right 10%
      width 80%
      .avatar-uploader
          margin-left 10%
          border 1px dashed #d9d9d9
          border-radius 6px
          cursor pointer
          position relative
          overflow hidden
          width 20vh
          height 20vh
          display flex
          align-items center
          justify-content center
          .avatar-uploader-icon
            font-size 28px
            color #8c939d
            width 178px
            height 178px
            line-height 178px
            text-align center
          .avatar
            width 178px
            height 178px
            display block
      .avatar-uploader:hover
          border-color #409EFF
  .ineditInput
      text-align left
      margin-left 10%
      margin-right 10%
      padding 2% 8% 1% 8%
      .inpEd
        margin-top 1%
</style>
