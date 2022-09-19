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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: aquamarine;
}
</style>
