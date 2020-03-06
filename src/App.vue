<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

    import $ from 'jquery';
    import jQuery from 'jquery'
    window.$ = $;
    window.jquery = $;
    window.jQuery = $;
    window.Jquery = $;
    window.JQuery = $;
    window.JQUERY = $;


export default {
  name: 'App'
}
</script>

<style>
  @import "./assets/css/CHinese.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  /*background: #fff url(/assets/images/timg.jpeg) 50% 0 no-repeat;*/
}
.ql-container {
  min-height: 400px;
}

.ql-snow .ql-tooltip {
  transform: translateX(117.5px) translateY(10px) !important;
}
</style>
