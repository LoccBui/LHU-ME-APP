<template>
  <div class="container">
    <button class="btn" @click="actionButton()" >
        <img 
            class="post-function-icon"
            :src="sourceImage"
            alt="Image" 
        />       
        <span class="numberPost"> {{dataButton}} </span>
    </button>
  </div>
</template>

<script>
import {ic_openEyes, ic_love, ic_noneHeart} from '../assets/img/Image'


export default {
    name: "ButtonPost",
    props: ['srcImg', 'type', 'dataButton'],
    data(){
        return{
            sourceImage: this.srcImg,
            typeBtn: this.type,
            icon_openEyes: ic_openEyes,
            icon_love: ic_love,
            icon_noneHeart: ic_noneHeart,
            dataBtn: this.dataButton,
        }
    },
    
    methods: {
        actionButton(){
            if(this.typeBtn === 'love'){
                this.sourceImage = `${this.icon_love}`
                this.typeBtn = "loved"
                this.dataBtn++
                this.$emit('update-data-button', {
                    data: this.dataBtn,
                    type: 'love'
                })
            }
            else if(this.typeBtn === 'loved') {
                this.sourceImage = `${this.icon_noneHeart}`
                this.typeBtn = "love"
                this.dataBtn--
                this.$emit('update-data-button',{
                    data: this.dataBtn,
                    type: 'love'
                })
            }

            if(this.typeBtn === 'comment') {
                this.$emit('focus-input-new-comment')
            }

            if(this.typeBtn === 'share'){
            }

            if(this.typeBtn === 'see'){
                this.sourceImage = `${this.icon_openEyes}`
                this.typeBtn = "saw"
                this.dataBtn++
                this.$emit('update-data-button',{
                    data: this.dataBtn,
                    type: 'saw'
                })
            }

        }

    }
}
</script>

<style lang="scss" scoped>

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


.post-function-icon{
    width: 20px;
    height: 20px;
}
</style>