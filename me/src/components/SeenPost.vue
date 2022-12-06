<template>

    <div>
        <BoxContainer  :widthBox="width" :heightBox="height" >
        <template #header>
            <div class="header-box">
                    <h3>Những người đã xem bài viết</h3>

                    <div class="close-seen-box" >
                        <img src="https://img.icons8.com/fluency-systems-regular/20/000000/x.png" class="close-icon" @click="closeBox()">    
                    </div>
                </div>
        </template>

        <template #content >
                <div class="loading" v-if="loading">
                    <img class="icon-loading" src="../assets/gif/icon_spinner.gif" alt="Loading">
                </div>

                <div  v-else class="list-view-cover">
 
                    <div  v-for="user in dataSeenPostAPI" :key="user.UserID" > 
                    
                        <div class="list-seen" @click="openCloseInfoBox(user.UserID)">        
                            <div class="user-seen-avatar">
                                <img :src="`https://file.lhu.edu.vn/me/avatar/${user.UserID}.jpg`" 
                                    alt="Avatar" class="avatar-self">
                            </div>
                                    
                            <div class="user-seen-info">
                                <span class="info-fullname">{{user.FullName}}</span>
                                <span>{{user.UserName}} - {{user.DepartmentID}}</span>
                                <span :title="`${user.UpdateTime}`">{{user.UpdateTime}}</span>
                            </div>
                        </div>
                        
                        <hr class="line-break">
                    </div>
                </div>

        </template>


    
    </BoxContainer>

    <InfoUserBox v-if="infoUserBoxOpen"          
        :dataIDUser="this.userID"        
        @close-box="closeInfoBox"    
    />

</div>
</template>

<script>
import axios from 'axios';
import BoxContainer from './BoxContainer.vue';
import InfoUserBox from './InfoUserBox.vue';

export default {
    name: "SeenBox",
    props: ['widthBox', 'heightBox', 'dataIDPost'],
    components: { BoxContainer, InfoUserBox },
    data() {
        return {
            width: this.widthBox,
            height: this.heightBox,       
            dataSeenPostAPI: [],
            loading: true,
            userID: '',
            infoUserBoxOpen: false
        }
    },
    beforeMount(){
        this.getAPISeen()
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
        closeInfoBox(){
            this.infoUserBoxOpen = !this.infoUserBoxOpen
        },


        closeBox(){
            this.$emit('close-box', 'seenBox')
        },

        getAPISeen(){        
            try {    
            axios.post('/MessageView_Select',{
            "MessageID": `${this.dataIDPost}`
            })
            .then(response => {
                this.dataSeenPostAPI.push(...response.data.data);
                this.loading = false 
            }) 
            } catch (error) {
                console.log(error)
                this.loading= true
            }
        },

        openCloseInfoBox(UserID){
            this.userID = UserID
            this.infoUserBoxOpen = !this.infoUserBoxOpen
        }
    }
}

</script>

<style lang="scss" >

.avatar-self{
    width: 50px;
    height: 50px;
    border-radius: 20%;
    object-fit: cover;
}

.list-view-cover{
    overflow:scroll;
    max-height: 500px;
}
.list-seen{
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: white;

    &:hover{
        background-color: #F2ECFF;
        cursor: pointer;
    }

    .user-seen-info{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 10px;

        .info-fullname{
            font-weight: bold;
            color: #1565C0;
        }
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

.loading{
   height: 100px;
}
</style>