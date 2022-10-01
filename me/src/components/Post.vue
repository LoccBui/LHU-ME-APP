<template>
  <div>
    <div class="loading" v-if="loading">
      <img class="icon-loading" src="../assets/gif/icon_spinner.gif" alt="Loading">
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
          loading: true,
      }
    },
    mounted() {
        // alert(this.imga)
    },
    created(){
      try {    
        axios.post('/MessageHome_Select',{
          "LastOrderTime": "9999-01-01"
      })
      .then(response => {
          console.log(response.data)
            this.dataPostAPI = response.data.data;
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