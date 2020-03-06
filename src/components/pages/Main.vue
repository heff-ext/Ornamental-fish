<template>
    <div class="menuContainer">
      <menu-comp :menuItems="menuItems" @menuType="getMenuType" @commentList="getCommentList" @classificationId="getClassificationId" @baike="getBaike"></menu-comp>
      <comment-comp v-if="comments != null && comments.length >0 && currentMenu == 1"  :currentUser="currentUser" :comments="comments"></comment-comp>
      <baike-detail v-if="baike_content != null && baike_content != '' && currentMenu == 2" :content="baike_content"> </baike-detail>
      <div class="addPost" @click="createPost" v-html="btnText">
      </div>
    </div>
</template>

<script>

    // collapse 展开折叠
    import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
    import Menu from "@/components/main-comps/Menu"
    import Comment from "@/components/main-comps/Comment"
    import request from '@/utils/request'
    import axios from "axios"
    import BaikeDetail from "@/components/main-comps/BaikeDetail"

    export default {
        name: "main",
        data() {
            var currentUser = sessionStorage.getItem("currentUser");
            currentUser = JSON.parse(currentUser);
            currentUser.head = currentUser.media_path;
            return {
                currentUser:currentUser,
                currentMenu:1,
                btnText:"发布",
                comments:[],
                activeIndex: '1',
                show1:true,
                menuItems:"",
                classificationId:"",
                baike_content:""
                // [
                //     {id:"1", class_name:'大马哈鱼种', itemList:[{id:"2", class_name:'大马哈鱼'},{id:"3", class_name:'草鱼'}]},
                //     {id:"2", class_name:'大胡鱼种', itemList:[{id:"2", class_name:'大胡子鱼'},{id:"3", class_name:'贵鱼'}]},
                //     {id:"3", class_name:'里几鱼种', itemList:[{id:"2", class_name:'里几鱼'},{id:"3", class_name:'鲤鱼'}]}
                // ]
            };
        },
        mounted(){
            this.getClass1();
        },
        components:{
            [CollapseTransition.name] : CollapseTransition,
            'comment-comp' : Comment,
            'menu-comp':Menu,
            'baike-detail':BaikeDetail
        },
        methods: {
            getMenuType(payload){
                this.currentMenu = payload;
                console.log("currentMenu: "+payload);
                if(payload == 1)
                    this.btnText = "发布"
                else if (payload == 2)
                    this.btnText = "投稿"
            }
            ,
            getClass1() {
                // 获取类型数据
                var _this = this;
                //这里发送axios请求
                axios({
                    headers: {
                        'Content-Type': 'application/json;'
                    },
                    method: 'post',
                    url: '/classification/getClasses',
                    withCredentials: true,
                    async:false
                }).then(response => {
                    _this.menuItems = response.data
                }).catch(response => {
                    alert("未知错误");
                    console.log(response);
                })
            },
            getCommentList(payload) {
                // alert(1111);
                this.comments = payload;
            },
            getClassificationId(payload) {
                // alert(1111);
                this.classificationId = payload;
                console.log(payload);
            },
            getBaike(payload) {
                this.baike_content = payload
            }
            ,
            createPost () {
                if(this.classificationId == null || this.classificationId == "") {
                    alert1("请选择要" + this.btnText + "的类型！");
                    return;
                }
                if(this.currentMenu == 1)
                    this.$router.push({path:"/createp", query:{ classificationId:this.classificationId}})
                else if(this.currentMenu == 2)
                    this.$router.push({path:"/vueEditor", query:{ classificationId:this.classificationId}})
            }
        }
    }
</script>

<style scoped>
  .addPost{
    border-radius: 50%;
    position: fixed;
    width: 4em;
    height: 4em;
    right: 1em;
    bottom: 1em;
    box-shadow: 1px 1px 6px #8A8B8B, -1px -1px 6px #8A8B8B;
    z-index: 100;
    display:flex;
    align-items:center;
    justify-content:center;
  }
</style>
