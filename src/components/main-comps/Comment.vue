<template>
     <div class="infinite-list-wrapper" style="overflow:auto">
      <ul class="infinite-list" v-infinite-scroll="load">
        <li v-for="(item,i) in comments" :key="i" class="author-title reply-father infinite-list-item">
            <div class="userArea">
              <el-avatar class="header-img" :size="40" :src="item.headImg"></el-avatar>
              <div class="author-info">
                  <span class="author-name">{{item.name}}</span>
                  <span class="author-time">{{item.time}}</span>
              </div>
            </div>
            <div class="talk-box">
                <p>
                    <span class="reply">{{item.comment}}</span>
                </p>
                <p v-if="item.media_path != null && item.media_path != ''">
                  <img :src="item.media_path" class="listMedia">
                </p>
            </div>
            <div class="icon-btn">
                <span @click="showReplyInput(i,item.name,item.id)"><i class="iconfont el-icon-s-comment"></i>{{item.commentNum}}</span>
<!--                <i class="iconfont el-icon-caret-top"></i>{{item.likes_count}}-->
            </div>
            <div class="reply-box">
                <div v-for="(reply,j) in item.reply" :key="j" class="author-title">
                  <div class="userArea">
                    <el-avatar class="header-img" :size="40" :src="'/post/getMedia?mediaPath=' + reply.fromHeadImg"></el-avatar>
                    <div class="author-info">
                        <span class="author-time">{{reply.time}}</span>
                        <span class="author-name">{{reply.froms}} <span class="reply-name">回复 {{reply.tos}}:</span></span>
                    </div>
                  </div>
                    <div class="talk-box">
                        <p>
                            <span class="reply">{{reply.comment}}</span>
                        </p>
                    </div>
                    <div class="icon-btn">
                        <span @click="showReplyInput(i,reply.froms,reply.id)"><i class="iconfont el-icon-s-comment"></i>{{reply.commentNum}}</span>
<!--<i class="iconfont el-icon-caret-top"></i>{{reply.likes_count}}-->
                    </div>
                </div>
            </div>
            <div  v-show="_inputShow(i)" class="my-reply my-comment-reply">
                <el-avatar class="header-img" :size="40" :src=" '/post/getMedia?mediaPath=' + currentUser.head"></el-avatar>
                <div class="reply-info" >
                    <div tabindex="0" contenteditable="true" spellcheck="false" placeholder="输入评论..."   @input="onDivInput($event)"  class="reply-input reply-comment-input"></div>
                </div>
                <div class=" reply-btn-box">
                    <el-button class="reply-btn" size="medium" @click="sendCommentReply(i)" type="primary">发表评论</el-button>
                </div>
        </div>
        </li>
      </ul>
    </div>
</template>

<script>
  import axios from 'axios'
const clickoutside = {
    // 初始化指令
    bind(el, binding, vnode) {
    function documentHandler(e) {
    // 这里判断点击的元素是否是本身，是本身，则返回
        if (el.contains(e.target)) {
            return false;
        }
    // 判断指令中是否绑定了函数
        if (binding.expression) {
            // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
            binding.value(e);
        }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.vueClickOutside = documentHandler;
    document.addEventListener('click', documentHandler);
    },
    update() {},
    unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.vueClickOutside);
    delete el.vueClickOutside;
  },
};
export default {
    name:'articleComment',
    props:['comments','currentUser'],
    data(){
        return{
          count:0,
            btnShow: false,
            index:'0',
            replyComment:'',
            tos:'',
            to_id:""
        }
    },
    created(){
        console.log(this.currentUser);
    },
    directives: {clickoutside},
    methods: {
      load () {
        this.count += 2
      }
      ,
        showReplyBtn(){
            this.btnShow = true
        },
        hideReplyBtn(){
            this.btnShow = false
            replyInput.style.padding= "10px"
            replyInput.style.border ="none"
        },
        showReplyInput(i,name,id){
            this.comments[this.index].input_show = false
            this.index =i
            this.comments[i].input_show = true
            this.tos = name
            this.to_id = id
        },
        _inputShow(i){
          if(this.comments[i].input_show == "true")
            return true;
          else if (this.comments[i].input_show == "false")
              return false;
          else
              return true;
        },
        sendComment(){
            if(!this.replyComment){
                 this.$message({
                    showClose: true,
                    type:'warning',
                    message:'评论不能为空'
                })
            }else{
                let a ={}
                let input =  document.getElementById('replyInput')
                let timeNow = new Date().getTime();
                let time= this.dateStr(timeNow);
                a.name= this.myName
                a.comment =this.replyComment
                a.headImg = '/post/getMedia?media_path;='+ this.currentUser.head
                a.time = time
                a.commentNum = 0
                a.likes_count = 0
                this.comments.push(a)
                this.replyComment = ''
                input.innerHTML = '';

            }
        },
        sendCommentReply(i,j){
            if(!this.replyComment){
                 this.$message({
                    showClose: true,
                    type:'warning',
                    message:'评论不能为空'
                })
            }else{
                console.log(this.comments[i])
                let a = {}
                let timeNow = new Date().getTime();
                let time= this.dateStr(timeNow);
                a.froms= this.currentUser.username
                a.tos = this.tos;
                a.fromHeadImg = this.currentUser.head
                a.comment =this.replyComment
                a.time = time
                a.commentNum = 0
                a.likes_count = 0
                a.to_id = this.comments[i].froms;
                a.post_id = this.comments[i].id;//项目的id
                this.comments[i].reply.push(a);
                console.log(this.comments[i]);
                a.time = timeNow;

                axios({
                    headers: {
                        'Content-Type': 'application/json;'
                    },
                    method: 'post',
                    url: '/comment/addcomment',
                    params:a,
                    async:false,
                    withCredentials: true
                }).then(response => {
                    console.log(response.data);
                }).catch(response => {
                    alert1("未知错误");
                    console.log(response);
                })
                this.replyComment = ''
                document.getElementsByClassName("reply-comment-input")[i].innerHTML = ""
            }
        },
        onDivInput: function(e) {
            this.replyComment = e.target.innerHTML;
        },
        dateStr(date){
            //获取js 时间戳
            var time=new Date().getTime();
            //去掉 js 时间戳后三位，与php 时间戳保持一致
            time=parseInt((time-date)/1000);
            //存储转换值
            var s;
            if(time<60*10){//十分钟内
                return '刚刚';
            }else if((time<60*60)&&(time>=60*10)){
                //超过十分钟少于1小时
                s = Math.floor(time/60);
                return  s+"分钟前";
            }else if((time<60*60*24)&&(time>=60*60)){
                //超过1小时少于24小时
                s = Math.floor(time/60/60);
                return  s+"小时前";
            }else if((time<60*60*24*30)&&(time>=60*60*24)){
                //超过1天少于30天内
                s = Math.floor(time/60/60/24);
                return s+"天前";
            }else{
                //超过30天ddd
                var date= new Date(parseInt(date));
                return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
            }
        }
    },
}
</script>

<style lang="stylus" scoped>
.infinite-list-item
    list-style-type none
.my-reply
    padding 10px
    background-color #fafbfc
    margin-right 4.5em
    .header-img
        display inline-block
        vertical-align top
    .reply-info
        display inline-block
        margin-left 0.5em
        width 90%
        @media screen and (max-width:1200px) {
            width 80%
        }
        .reply-input
            min-height 20px
            line-height 22px
            padding 10px 10px
            color #000
            background-color #fff
            border-radius 5px
            text-align left;
            &:empty:before
                content attr(placeholder)
            &:focus:before
                content none
            &:focus
                padding 8px 8px
                border 2px solid #009CDA
                box-shadow none
                outline none
    .reply-btn-box
        height 25px
        margin 10px 0
        .reply-btn
            position relative
            float right
            margin-right 30px
.my-comment-reply
    margin-left 2em
    .reply-input
        width flex
.author-title:not(:last-child)
    border-bottom: 1px solid rgba(178,186,194,.3)
.author-title
    padding 10px
    max-height 40%
    min-height 100px
    .userArea
      margin-left 2em
      margin-right 4.5em
      text-align left
      .header-img
          display inline-block
          vertical-align top
      .author-info
          display inline-block
          margin-left 0.5em
          height 3em
          line-height 1.4em

          >span
              display block
              cursor pointer
              overflow hidden
              white-space nowrap
              text-overflow ellipsis
          .author-name
              color #000
              font-size 16px
              font-weight bold
              text-align left
              .reply-name
                  color #009CDA
          .author-time
              text-align left
              font-size 12px
    .talk-box
        margin 10px 4.5em 0px 3.2em
        >p
           margin-left 2em
           text-align left
        .reply
            font-size 20px
            color #555555
        .listMedia
           width 10vw
           height 10vw
    .reply-box
        margin 10px 4.5em 0 2em
        background-color #efefef
    .icon-btn
        margin 0px 4.5em 5px 2em
        padding 0 !important
        text-align right
        // @media screen and (max-width : 1200px){
        //     width 20%
        //     padding 7px
        // }
        >span
            cursor pointer
        .iconfont
            margin 0 5px
</style>
