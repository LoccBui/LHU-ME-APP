<template>

    <div id="box-container" :style="cssProps">
    <BoxContainer  :widthBox="width" :heightBox="height" >
            <template #header>
                <div class="header-box">                
                    <h3>Thông tin người dùng</h3>
                    <div class="close-seen-box" >
                        <img src="https://img.icons8.com/fluency-systems-regular/20/000000/x.png"  class="close-icon"
                        @click="closeBox()">    
                    </div>
                </div>
            </template>

            <template #content>
                <div class="info-user-body">
                    <div class="info-user-img-cover" >
                        <img class="info-user-img" 
                        src="https://file.lhu.edu.vn/me/avatarorigin/NV00000371.jpg ">
                    </div>

                    <div class="info-user-detail">
                        <span class="info-user-name">Nguyễn Vũ Quỳnh - Jimmy_Nguyen</span>
                        <span class="info-user-email">nguyen_vuquynh@yahoo.com</span>
                        <button class="btn-add-info-user">Kết bạn</button>
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
    name: "InfoUserBox",
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
            this.$emit('close-box', 'infoUserBox')
        }
    }
}
</script>

<style lang="scss" scoped>
#container{
    position: relative;
    z-index: 2;
    width: var(--widthBox);
    height: var(--heightBox);
    background-color: red;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    z-index: 1000;
    border-radius: 12px;
    padding: 5px;
}

</style>>
