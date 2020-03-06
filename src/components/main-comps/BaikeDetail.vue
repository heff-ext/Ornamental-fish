<template>
    <div>
      <p class="ql-editor" v-html="content"></p>
    </div>
</template>

<script>
    import PageHeader from '@/components/commons/PageHeader';
    export default {
        name: "baikeDetail",
        props:["content"],
        components:{
            "back-header" : PageHeader
        }
    }
</script>

<style scoped>
</style>
