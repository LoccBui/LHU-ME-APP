<template>
  <div class="post-container">
    <PostInfo />
  </div>
</template>

<script>
import PostInfo from './PostInfo.vue';
export default {
    name: "Post",
    components: { PostInfo }
}
</script>

<style>

.post-container{
    margin: 0 auto;
    width: 550px;
    height: 500px;
    background-color: #FFFFFF;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius:20px;
    border-width: thin;
    border-color: rgba(0,0,255,0.25);
    
}

</style>