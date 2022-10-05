<template>
    <div id="box-container" :style="cssProps">
    <BoxContainer  :widthBox="width" :heightBox="height" >
            <template #header>
                <div class="header-box">                
                    <h3> Tải lên file</h3>
                    <div class="close-seen-box" >
                        <img src="https://img.icons8.com/fluency-systems-regular/20/000000/x.png" class="close-icon"
                        @click="closeBox()">        
                    </div>
                </div>               
            </template>

            <template #content>
                <div class="upload-file-body">
                    <form action="#">
                        
                        <label for="file-input">
                            <img :src="`${icon_upload}`" class="icon-upload-file" />
                        </label>
                        <input style="display:block;" id="file-input" type="file" multiple required/>
                    </form>

                    Tải file lên 
                    <button class="btnIconText">Icon</button>

                    <div id="detail-upload-render">
                            
                    </div>
                </div>

                <div class="progress-file-area">
                    <div class="detail-progress">
                        <span class="file-name">${this.nameFile}</span>
                        <span>Uploading</span>           
                    </div>


                    <div class="detail-progress">
                        <span class="file-name">${this.nameFile}</span>
                        <span>Uploading</span>    
                    </div>


                    <div class="detail-progress">
                        <span class="file-name">${this.nameFile}</span>
                        <span>Uploading</span>    
                    </div>

                </div>

            </template>

            <template #footer></template>
        </BoxContainer>
    </div>
</template>

<script>
import {ic_upload} from '../assets/img/Image'

import BoxContainer from './BoxContainer.vue';
export default {
    name: "UploadFile",
    props: ['widthBox', 'heightBox'],
    components: {  BoxContainer },
    data() {
        return {
            width: this.widthBox,
            height: this.heightBox,   
            icon_upload: ic_upload,
        }
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
            this.$emit('close-box', 'uploadFileBox')
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

</style>>
