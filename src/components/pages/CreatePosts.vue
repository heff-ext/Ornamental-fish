<template>
    <div class="createPostContainer">
      <!--按钮区-->
      <div class="btnContainer">
        <back-header pagename="发表帖子" class="back-header-careatep"></back-header>
        <el-button type="primary" class="Publish" @click="addComment">发表</el-button>
      </div>

      <!--  文字区   -->
      <div class="textContainer">
        <el-input
          type="textarea"
          placeholder="请输入内容"
          maxlength="500"
          show-word-limit
          class="postText"
          :autosize="{ minRows: 8, maxRows: 10}"
          v-model="postTextArea"
        >
        </el-input>
      </div>
      <!--上传区 -->
      <div class="uploadContainer">
        <el-upload
          action="/post/upload"
          list-type="picture-card"
          :multiple="true"
          :limit="6"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          class="uploadEL">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="30px" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>
    </div>
</template>

<script>
    import PageHeader from '@/components/commons/PageHeader';
    import axios from 'axios'

    export default {
        name: "createPosts",
        components:{
            "back-header" : PageHeader
        },
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                postTextArea: '',
                fileUrl:""
            };
        },
        created() {
            console.log(this.$route.query.classificationId);
        }
    ,
        methods:{
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleSuccess(response, file, fileList){
                console.log(response);
                console.log(file);
                this.fileUrl = response;
            },

            addComment(){
                var _this = this;
                //这里发送axios请求
                axios({
                    headers: {
                        'Content-Type': 'application/json;'
                    },
                    method: 'post',
                    url: '/post/publish',
                    params:{
                        post_media_path:_this.fileUrl,
                        content:_this.postTextArea,
                        classification_id:this.$route.query.classificationId
                     },
                    withCredentials: true
                }).then(response => {
                    alert1(response.data.msg);
                    this.$router.push("/main");
                }).catch(response => {
                    alert1("未知错误");
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
          padding-top 0.5%
      .Publish
          float right
          margin-right 9%
  .textContainer
      padding 1px auto
      margin-left 10%
      margin-right 10%
      /*height 50vh*/
      /*background rgba(0,0,0,0.3)*/
      .postText
          width 81%
          margin-left 1%
          /*height 30vh*/
  .uploadContainer
      margin 5% 0 5% 0
      margin-left 10%
      margin-right 10%
      text-align left

      .uploadEL
        margin-left 10%
        margin-right 10%
  .createPostContainer
      height 100%

</style>
