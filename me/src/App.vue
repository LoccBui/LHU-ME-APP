<template>
  <div id="app">
    <Post />
  </div>
</template>

<script>
import Post from './components/Post.vue';
export default {
  name: 'App',
  components: {
    Post
}
}
</script>

<style>
#app {
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* Scroll bar css*/
::-webkit-scrollbar {
   width: 10px;
   height: 10px;
 }

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #1565C0;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
