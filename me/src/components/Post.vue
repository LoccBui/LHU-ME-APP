<template>
  <div>
    <div class="loading" v-if="loading">
      <img class="icon-loading" src="../assets/img/gif/icon_spinner.gif" alt="Loading">
    </div>

    <div v-else class="post-container" >
      <div  v-for="(post,index) in dataPostAPI" :key="index">
          <div class="space">
            <PostInfo :dataPostAPI="post"  />
          </div>
      </div>          
    </div>


  </div>

 
 
</template>

<script>
import PostInfo from './PostInfo.vue'
import axios from 'axios'

export default {
    name: "Post",
    components: { PostInfo },
    data(){
      return{
          dataPostAPI: null,
          loading: true
      }
    },
    created(){
      try {
        var url = 'http://localhost:3000/data'
        axios.get(url)
          .then(response => {
              this.dataPostAPI = response.data;
              this.loading = false
          }) 
      } catch (error) {
        console.log(error)
        this.loading= true
      }
    },  
    methods: {
      
    }
}
</script>

<style>

.post-container{
    margin: 0 auto;
    width: 700px;
    height: auto;
    background-color: #FFFFFF;    
}

.space{
  margin-top: 50px;
}

.icon-loading{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}


</style>