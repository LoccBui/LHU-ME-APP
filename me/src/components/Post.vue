<template>
  <div>
    <div class="loading" v-if="loading">
      <h1>loading</h1>
    </div>

    <div v-else class="post-container" >

      <div  v-for="(post,index) in dataPostAPI" :key="index">
          <div class="space">
            <PostInfo   :dataPostAPI="post" />
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
    width: 550px;
    height: auto;
    background-color: #FFFFFF;    
}

.space{
  margin-top: 50px;
}


</style>