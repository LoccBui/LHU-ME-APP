<template>
  <div class="container">
    <button class="btn" @click="actionButton()" >
        <img :src="sourceImage" />       
        <span class="numberPost"> {{dataButton}} </span>
    </button>
  </div>
</template>

<script>
export default {
    name: "ButtonPost",
    props: ['srcImg', 'type', 'dataButton'],
    data(){
        return{
            sourceImage: this.srcImg,
            typeBtn: this.type,
        }
    },
    
    methods: {
        actionButton(){
            if(this.typeBtn === 'love'){
                this.sourceImage = 'https://img.icons8.com/color/20/000000/filled-like.png'
                this.typeBtn = "loved"
                this.dataButton++
            }
            else if(this.typeBtn === 'loved') {
                this.sourceImage = 'https://img.icons8.com/material-outlined/20/000000/filled-like.png'
                this.typeBtn = "love"
                this.dataButton--
            }

            if(this.typeBtn === 'comment') {
                this.$emit('focus-input-new-comment')
            }

            if(this.typeBtn === 'share'){
            }

            if(this.typeBtn === 'see'){
                this.sourceImage = 'https://img.icons8.com/sf-regular/19/000000/visible.png'
                this.typeBtn = "saw"
                this.dataButton++
            }

        }

    }
}
</script>

<style lang="scss">

.btn{
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    width: 150px;
    padding: 5px;
    background-color: white;

    &:hover{
        background-color: #c6baba;
        cursor: pointer;
    }

    .numberPost{
        margin-left: 5px;
    }

}
</style>