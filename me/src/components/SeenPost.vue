<template>

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
                
                <div class="list-view-cover">
                    
                <div v-for="user in dataSeenPostAPI" :key="user.UserID" > 
                        <div class="list-seen">        
                            <div class="user-seen-avatar">
                                <img class="avatar-self" 
                                src="https://file.lhu.edu.vn/me/avatar/122000110"
                                alt="User" />
                            </div>
                                    
                            <div class="user-seen-info">
                                <span>{{user.FullName}}</span>
                                <span>{{user.UserName}} - {{user.DepartmentID}}</span>
                                <span>{{user.UpdateTime}}</span>
                            </div>
                        </div>
                        
                        <hr class="line-break">
                   </div>
                </div>

            </template>


        </BoxContainer>
</template>

<script>
import axios from 'axios';
import BoxContainer from './BoxContainer.vue';

export default {
    name: "SeenBox",
    props: ['widthBox', 'heightBox', 'dataIDPost'],
    components: {  BoxContainer },
    data() {
        return {
            width: this.widthBox,
            height: this.heightBox,       
            dataSeenPostAPI: []
        }
    },
    beforeMount(){
        this.getAPISeen()
    },

    methods:{
        closeBox(){
            this.$emit('close-box', 'seenBox')
        },

        getAPISeen(){
            console.log('----')
            console.log(this.dataIDPost)
            
            try {    
            axios.post('/MessageView_Select',{
            "MessageID": `${this.dataIDPost}`
            })
            .then(response => {
                this.dataSeenPostAPI.push(...response.data.data);
            }) 
            } catch (error) {
                console.log(error)
                this.loading= true
            }
        }
    }
}

</script>

<style lang="scss" scoped>

.list-view-cover{
    overflow:scroll;
    max-height: 500px;
}



.list-seen{
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: white;

    .user-seen-info{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 10px;
    }   
}

.line-break{
    border: 1px solid #E7E9EB;
}

.close-icon{
    width: 20px;
    height: 20px;
    &:hover{
        cursor: pointer;
    }
}

</style>>
