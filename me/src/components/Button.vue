<template>
  <div class="container">
    <button class="btn" @click="show()" >
        <img :src="sourceImage" />       
    </button>
  </div>
</template>

<script>
export default {
    name: "Button",
    props: ['srcImg', 'type'],
    data(){
        return{
            sourceImage: this.srcImg,
            typeBtn: this.type
        }
    },
    

    methods: {
        show(){
            if(this.typeBtn === 'love'){
                this.sourceImage = 'https://img.icons8.com/color/20/000000/filled-like.png'
                this.typeBtn = "loved"
            }
            else if(this.typeBtn === 'loved') {
                this.sourceImage = 'https://img.icons8.com/material-outlined/20/000000/filled-like.png'
                this.typeBtn = "love"
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
    width: 130px;
    flex: 1;
    border: none;

    &:hover{
        background-color: #c6baba;
        cursor: pointer;
    }

}
</style>