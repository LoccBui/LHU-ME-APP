<template>
    <BoxContainer :widthBox="`${this.widthBox}`" :heightBox="`${this.heightBox}`" >

        <template #content>
            <div class="loading" v-if="loading">
                <img class="icon-loading" src="../assets/gif/icon_spinner.gif" alt="Loading">
            </div>

            <div v-else id="container">

                <div class="info-user-body" >
                    <div v-for="info in dataUser" :key="info.Email">
                        <div class="info-user-img-cover" >
                            <img class="info-user-img" 
                            :src="`https://file.lhu.edu.vn/me/avatarorigin/${dataIDUser}.jpg `">
                        </div>
                        <div class="blank-div"></div>
                        <div class="info-user-detail">
                            <span class="info-user-name">{{info.UserName}}</span>
                            <div class="more-detail">
                                <p class="info-user-fullname">{{info.FullName}}</p>
                                <p class="info-user-email">{{info.Email}}</p>
                                <button @click="addFriend()"  class="add-user">Kết bạn</button>
                                <button @click="closeBox()"  class="close-box">Đóng</button>
                            </div>
                        </div>
                    </div>
                </div> 
                
            </div>
        </template>
       
        <template #footer></template>
    </BoxContainer>
</template>

<script>
import axios from 'axios';
import BoxContainer from './BoxContainer.vue';
export default {
    name: "InfoUserBox",
    props: ['dataIDUser'],
    components: {  BoxContainer },
    data() {
        return {
            IDUser: this.dataIDUser,    
            dataUser: [],
            loading: true,
            widthBox: '300px',
            heightBox: '150px'
        }
    },
    beforeMount(){
        this.getAPIInfoUser()
    },
    
    methods:{
        closeBox(){
            this.$emit('close-box', 'infoUserBox')
        },

        getAPIInfoUser(){  
            console.log(this.IDUser)
            try {    
                axios.post('/User_Info_String',{
                "FriendID": `${this.IDUser}`  // IDUser is eliminated last characters
            })
            .then(response => {
                this.dataUser.push(...response.data.data);
                this.loading = false
            }) 
            } catch (error) {
                console.log(error)
                this.loading= true
            }
        },

        addFriend(){
            alert("add")
        }
    }
}
</script>

<style lang="scss" scoped>

#container{
    width: var(--widthBox);
    height: var(--heightBox);
    z-index: 1000;

    &:hover{
        width: 500px;
        height: auto;
    }

    &:hover .blank-div{
        width: 100%;
        height: 150px;
    }

    &:hover .more-detail{
        display: block;
    }
}


.info-user-body{
    position: relative;
    width: 100%;
    height: 100%;   
}

.info-user-img-cover{
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    transform: translateY(-50%)  
}

.blank-div{
    width: 100%;
    height: 100px;
}



.info-user-detail{
    display: flex;
    flex-direction: column;

}

.info-user-name{
    font-size: 25px;
    font-weight: bold;
    margin-top: 20px;
    color: #1565C0;
}

.info-user-img{
    border-radius: 10px;
    width: 200px;
    height: 200px;
    object-fit: cover;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px;
}

.more-detail{
    font-size: 20px;
    display: none;
}

.close-box,
.add-user{
    width: 100%;
    background-color: #1565C0;
    border: none;
    padding: 10px;
    border-radius:10px;
    color: white;
    margin: 5px 0px;

    &:hover{
        cursor: pointer;
        outline: 1px solid #0090DB;
    }
}

.close-box{
    outline: 1px #0C0C0C;
    background-color: #F3F4F1;
    color: #0C0C0C;
    border: 1px solid #0C0C0C;

    &:hover{
        cursor: pointer;
        outline: 1px solid #383838;
    }

    
}

</style>>
