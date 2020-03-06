import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/pages/Login'
import Main from '@/components/pages/Main'
import ArticleComment from '@/components/main-comps/Comment'
import CreatePosts from "@/components/pages/CreatePosts"
import UserSetting from "@/components/pages/UserSetting"
import VueEditor from "@/components/pages/VueEditor"
Vue.use(Router)

export default new Router({
  // mode:"history",
  routes: [
    {
      path:"/",
      redirect:"/login"
    },
    {
      path: '*',
      redirect: '/main'
    }
    ,
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/main',
      name: 'main',
      component: Main
    }
    ,
    {
      path: '/comment',
      name: 'articleComment',
      component: ArticleComment
    }
    ,
    {
      path: '/createp',
      name: 'createPosts',
      component: CreatePosts
    },
    {
      path: '/userSetting',
      name: 'userSetting',
      component: UserSetting
    }
    ,
    {
      path: '/vueEditor',
      name: 'vueEditor',
      component: VueEditor
    }
  ]
})
