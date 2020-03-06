<template>
    <div>
      <el-page-header @back="goBack" :content="pagename" class="back-header">
      </el-page-header>
    </div>
</template>

<script>
    export default {
        name: "pageHeader",
        props:['pagename','backUrl'],
        methods:{
            goBack(){
                // this.$router.push(this.backUrl);
                this.$router.go(-1);//返回上一层
            }
        }

    }
</script>

<style lang="stylus" scoped>
</style>
