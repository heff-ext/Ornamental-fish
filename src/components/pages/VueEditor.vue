<template>
    <div>
      <back-header pagename="创建百科内容" class="back-header-careatep"></back-header>
      <div class="container">
          <quill-editor ref="myTextEditor" v-model="content" :options="editorOption"></quill-editor>
          <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
      </div>
    </div>
</template>

<script>
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import { quillEditor } from 'vue-quill-editor';
    import PageHeader from '@/components/commons/PageHeader';
    import axios from "axios"
    import qs from 'qs'
    export default {
        name: 'editor',
        data: function(){
            return {
                content: '',
                classificationId:"",
                editorOption: {
                    placeholder: '请输入内容'
                }
            }
        },
        created(){
            console.log(this.$route.query.classificationId);
            this.classificationId = this.$route.query.classificationId;
        },
        components: {
            quillEditor,
            "back-header":PageHeader
        },
        methods: {
            onEditorChange({ editor, html, text }) {
                this.content = html;
            },
            submit(){
            var params = {
                            "baike_content":this.content,
                            "classification_id": this.classificationId
                            }
                axios({
                 headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    method: 'post',
                    url: '/baike/publish',
                    withCredentials: true,
                    async:false,
                    data: qs.stringify(params)
                }).then(response => {
                    if(response.data.status == 0) {
                        this.$message.success('提交成功！');
                        this.$router.push("/main");
                    }
                    else
                        this.$message.error('提交失败！');
                }).catch(response => {
                    alert1("未知错误");
                    console.log(response);
                })
            }
        }
    }
</script>
<style scoped>
  .editor-btn{
      margin-top: 20px;
      float: left;

  }
  .container{
    padding: 30px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding-bottom: 100px;
  }
  .back-header-careatep {
    margin-top: -30px;
    margin-bottom: 30px;
  }
</style>
