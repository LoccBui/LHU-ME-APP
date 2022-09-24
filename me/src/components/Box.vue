<template>
  <div id="box-container" :style="cssProps">
     <div v-html="contentBox"></div>
  </div>
</template>

<script>
export default {
    name: 'Box',
    props: ['widthBox', 'heightBox', 'contentBox','shareBoxOpen', 'seenBoxOpen'],
    data() {
        return {
            dataBoxOpen: this.shareBoxOpen
        }
    },
    computed:{
        cssProps(){
            return {
                '--widthBox': this.widthBox,
                '--heightBox': this.heightBox
            }
        }
        
    },
    methods:{
       shareBoxState(){
        let element = document.getElementsByClassName('close-icon')[0]

        element.addEventListener('click', () =>{
            this.dataBoxOpen = false
            this.$emit('close-share-box', this.dataBoxOpen)
        })

       }
    },
    mounted() {
       this.shareBoxState()
    }

}
</script>

<style lang="scss">
#box-container{
    width: var(--widthBox);
    height: var(--heightBox);
    z-index: 1000;
}

.post-menu{
    position: absolute;
    top: 60px;
    right: 10px;
    background-color: white;
    z-index: 100;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 15px;
    

    .post-menu-item{
        margin: 0px;
        padding: 10px;

        &:hover{
            color: white;
            background-color: #248fc1;
            cursor: pointer;
        }
    }

    &::before{
        content: "";
        position: absolute;
        right: -8px;
        width: 0;
        height: 0;
        border: 8px solid black;
        border-color: transparent transparent white white;
        transform-origin: 0 0;
        transform: rotate(135deg);    
        box-shadow: -1px 2px 5px 0 rgba(0, 0, 0, 0.24);
    }

    &::after{
        content: "";
        display: block;
        position: absolute;
        right: 0;
        top: -15px;
        width: 100%;
        height: 15px;
    }

}


// Share box
.overlay{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0, 0.4);
    z-index: 3;
}


.post-share-box{
    position: relative;
    z-index: 2;
    width: var(--widthBox);
    height: var(--heightBox);
    background-color: white;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    z-index: 1000;


    .header-box{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }


    .input-share{
        text-align: start;
        display: flex;
        flex-direction: column;
    }

}

.close-icon{
    &:hover{
        cursor: pointer;
    }
}


// Seen Post Box
.post-seen-box{
    width: var(--widthBox);
    height: var(--heightBox);
    z-index: 100;
    background-color: white;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 10px;
    z-index: 1000;
    overflow: hidden;

    .header-box{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}

.avatar-self{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: middle;
}

.list-seen{
    display: flex;
    align-items: center;
    background-color: #248fc1;
    padding: 10px;


    .user-seen-avatar{

    }

    .user-seen-info{
        display: flex;
        flex-direction: column;
        text-align: start;
        margin-left: 10px;
    }   
}

</style>