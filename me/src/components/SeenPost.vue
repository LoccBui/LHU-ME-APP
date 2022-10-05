<template>

    <div id="box-container" :style="cssProps">
    <BoxContainer  :widthBox="width" :heightBox="height" >
            <template #header>
                <div class="header-box">
                        <h3>Những người đã xem bài viết</h3>

                        <div class="close-seen-box" >
                            <img src="https://img.icons8.com/fluency-systems-regular/20/000000/x.png" class="close-icon" @click="closeBox()">    
                        </div>
                    </div>
            </template>

            <template #content>
                <div class="list-seen">        
                        <div class="user-seen-avatar">
                            <img class="avatar-self" 
                            src="https://file.lhu.edu.vn/me/avatar/122000110"
                            alt="User" />
                        </div>
                            
                        <div class="user-seen-info">
                            <span>${this.userID}</span>
                            <span>${this.userName} -${this.departmentID} </span>
                            <span>${this.updateTime}</span>
                        </div>
                    </div>
            </template>

            <template #footer></template>
        </BoxContainer>
    </div>
</template>

<script>
import BoxContainer from './BoxContainer.vue';
export default {
    name: "SeenBox",
    props: ['widthBox', 'heightBox'],
    components: {  BoxContainer },
    data() {
        return {
            width: this.widthBox,
            height: this.heightBox,          
        }
    },
    mounted(){
    },
    computed:{
        cssProps(){
            return {
                '--widthBox': this.width,
                '--heightBox': this.height
            }
        }   
    },
    methods:{
        closeBox(){
            this.$emit('close-box', 'seenBox')
        }
    }
}

</script>

<style lang="scss">
#container{
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
    border-radius: 12px;
    padding: 5px;
}

.close-icon{
    &:hover{
        cursor: pointer;
    }
}

</style>>
