<template>
  <div class="menuContainer">

    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo myMenu"
      mode="horizontal"

      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1" class="My-el-menu-item" @click="setShow1">交流中心</el-menu-item>
      <el-menu-item index="2" class="My-el-menu-item" @click="setShow2">百科中心</el-menu-item>
      <div class="header-right">
        <!-- 跳转到发布按钮 -->
        <div class="sendPost"></div>
        <div class="header-user-con">
          <!-- 用户头像 -->
          <div class="user-avator">
            <img :src="userMedia" />
          </div>
          <!-- 用户名下拉菜单 -->
          <el-dropdown class="user-name" trigger="click" >
                    <span class="el-dropdown-link">
                        {{username}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="userSetting">用户设置</el-dropdown-item>
              <el-dropdown-item @click.native="userLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-menu>
    <el-collapse-transition>
      <div v-show="show1" class="childMenu">
        <el-tabs type="border-card">
          <el-tab-pane v-for="(item,i) in menuItems" :key="item.id" :label="item.class_name">
            <el-link type="primary" class="primaryMenuItem" v-for="childItem in menuItems[i].itemList" :key="childItem.id" @click="findByClass(childItem.id)">{{childItem.class_name}}</el-link>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-collapse-transition>
    <el-collapse-transition>
      <div v-show="show2" class="childMenu">
        <el-tabs type="border-card">
          <el-tab-pane v-for="(item,i) in menuItems" :key="item.id" :label="item.class_name">
            <el-link type="primary" class="primaryMenuItem" v-for="childItem in menuItems[i].itemList" :key="childItem.id" @click="getBaike(childItem.id)">{{childItem.class_name}}</el-link>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>

    // collapse 展开折叠
    import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
    import axios from 'axios'

    export default {
        name: "main",
        props:['menuItems'],
        data() {
            var currentUser = sessionStorage.getItem("currentUser");
            currentUser = JSON.parse(currentUser);
            return {
                activeIndex: '1',
                show1:true,
                show2:false,
                username:currentUser.username,
                userMedia:"/post/getMedia?mediaPath=" + currentUser.media_path
                // menuItems:''
                // [
                //     {id:"1", class_name:'大马哈鱼种', itemList:[{id:"2", class_name:'大马哈鱼'},{id:"3", class_name:'草鱼'}]},
                //     {id:"2", class_name:'里几鱼种', itemList:[{id:"2", class_name:'里几鱼'},{id:"3", class_name:'鲤鱼'}]}
                // ]
            };
        },
        created(){
        },
        components:{
            [CollapseTransition.name] : CollapseTransition
        },
        methods:{
            setShow1(){
                this.show1 = !this.show1;
                this.show2 = false;
                this.$emit("menuType",1)
            }
            ,
            setShow2(){
                this.show2 = !this.show2;
                this.show1 = false;
                this.$emit("menuType",2)
            }
            ,
            findByClass(id) {
                var _this = this;
                axios({
                    headers: {
                        'Content-Type': 'application/json;'
                    },
                    method: 'post',
                    url: '/post/findbyclass',
                    params:{
                        classid:id
                    },
                    async:false,
                    withCredentials: true
                }).then(response => {
                    _this.$emit("commentList", response.data);
                    _this.$emit("classificationId",id);
                }).catch(response => {
                    alert1("未知错误");
                    _this.$emit("commentList", null)
                })
            },
            userSetting(){
                this.$router.push("/userSetting")
            },
            userLogout() {
                axios({
                    url:'/user/logout',
                    method: 'get',
                }).then(response => {
                    alert1("注销成功！")
                    this.$router.push("/login")
                }).catch(response => {
                    alert1("未知错误！");
                })
            },
            getBaike(id) {
                var _this = this;
                axios({
                    headers: {
                        'Content-Type': 'application/json;'
                    },
                    method: 'post',
                    url: '/baike/findbyclass',
                    params:{
                        classid:id
                    },
                    async:false,
                    withCredentials: true
                }).then(response => {
                    _this.$emit("baike", response.data.baike_content);
                    _this.$emit("classificationId",id);
                }).catch(response => {
                    alert1("未知错误");
                    _this.$emit("baike", null);
                })
            }
        }
    }
</script>

<style scoped>
  .myMenu{
    padding-left: 8%;
    margin-top: -60px;
    text-align: left;
  }
  .My-el-menu-item{
    margin-left: 1%;
    margin-right: 1%;
  }
  /* .menuContainer{
    overflow-x: auto;
  } */
  .childMenu{
    background: #ffd04b;
  }
  .primaryMenuItem{
    margin: 2%;
  }

  .header .logo {
    float: left;
    width: 250px;
    line-height: 70px;
  }
  .header-right {
    float: right;
    padding-right: 50px;
  }
  .header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
  }

  .user-name {
    margin-left: 10px;
  }
  .user-avator {
    margin-left: 20px;
    width: 5vh;
    height:5vh
  }
  .user-avator img {
    display: block;
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
  .el-dropdown-link {
    color: #fff;
    cursor: pointer;
  }
  .el-dropdown-menu__item {
    text-align: center;
  }
</style>
