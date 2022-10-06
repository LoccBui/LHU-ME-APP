<template>
  <div>
    <div class="loading" v-if="loading">
      <img class="icon-loading" src="../assets/gif/icon_spinner.gif" alt="Loading">
    </div>

    <div v-else class="post-container" >
      <div  v-for="(post) in dataPostAPI" :key="post.MessageID">
          <div class="space">
            <PostInfo :dataPostAPI="post" :idPost="post.MessageID" />
          </div>
      </div>          
    </div>

    <div v-if="dataPostAPI.length" v-observe-visibility="handleScrolledToBottom"></div>

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
          dataPostAPI: [],
          loading: true,
          LastOrderTime: '9999-01-01',
          newestOrderTime: ''
      }
    },
    beforeMount() {
       this.getAPIPost()
    },

 
   methods: {

      getAPIPost(){
        try {    
        axios.post('/MessageHome_Select',{
          "LastOrderTime": `${this.LastOrderTime}`
        })
        .then(response => {
              this.dataPostAPI.push(...response.data.data);
              this.loading = false

              this.newestOrderTime = this.dataPostAPI.slice(-1).pop().OrderTime
          }) 
        } catch (error) {
          console.log(error)
          this.loading= true
        }
      },


      handleScrolledToBottom(isVisible){
        if(!isVisible) { return }
        if(this.OrderTime >= this.newestOrderTime ) {return}

        this.LastOrderTime = this.newestOrderTime

        this.getAPIPost()        
      }
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