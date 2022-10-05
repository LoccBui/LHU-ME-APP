<template>
    <div id="box-container" :style="cssProps">
    <BoxContainer  :widthBox="width" :heightBox="height" >
            <template #header>
                <div class="header-box">
                    <h3>Chia sẻ bài viết này</h3>

                    <div class="close-box" >
                        <img src="https://img.icons8.com/fluency-systems-regular/20/000000/x.png" class="close-icon" @click="closeBox()" >    
                    </div>
                </div>
            </template>

            <template #content>
                <div class="input-share">
                        <label>Nhập người muốn chia sẻ</label>
                        <input type="text" />    
                </div>

                <div class="list-sharing">
                    <ul>
                        <li>1</li>
                        <li>1</li>
                        <li>1</li>
                    </ul>
                </div>
            </template>

            <template #footer></template>
        </BoxContainer>
    </div>
</template>

<script>
import BoxContainer from './BoxContainer.vue';
export default {
    name: "ShareBox",
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
            this.$emit('close-box','shareBox')
        }
    }
}

</script>

<style lang="scss" scoped>
#container{
    position: relative;
    width: var(--widthBox);
    height: var(--heightBox);
    background-color: white;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    z-index: 100;
    border-radius: 12px;
    padding: 5px;
}


.input-share{
    text-align: start;
    display: flex;
    flex-direction: column;
}

</style>>
