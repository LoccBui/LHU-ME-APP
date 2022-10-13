<template>
    <BoxContainer  :widthBox="width" :heightBox="height" >
            <template #header>
                <div class="header-box">
                    <h3>Chia sẻ bài viết này</h3>

                    <div class="close-box" >
                        <img class="close-icon"
                            src="https://img.icons8.com/fluency-systems-regular/20/000000/x.png" 
                            @click="closeBox()">    
                    </div>
                </div>
            </template>

            <template #content>
                <div class="input-share-cover">
                    <label>Nhập người muốn chia sẻ</label>
                    <input 
                        v-model="inputSearch"  
                        class="input-share"
                        placeholder="Tìm kiếm" 
                        type="text" 
                        spellcheck="false" 
                        @keyup="searchShare(inputSearch)"                 
                        />    
                </div>

                <div class="list-sharing">
                    <div v-for="item in dataShareListAPI" :key="item.ObjectID" >
                        <div class="group-share" >
                            {{item.ObjectName}}
                            <br>
                            <div class="detail-share">
                                <span class="bold-text"> {{item.SharedUser}} </span>
                                 đã chia sẻ
                                <span class="bold-text"> [{{item.SharedTime}}]</span> 
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
    name: "ShareBox",
    props: ['widthBox', 'heightBox', 'dataIDPost'],
    components: {  BoxContainer },
    data() {
        return {
            width: this.widthBox,
            height: this.heightBox,  
            loading: false,
            dataShareListAPI: [],
            idPost: this.dataIDPost,
            inputSearch: ''    
        }
    },
    beforeMount(){
        this.getAPIShareList()
    },
  
    methods:{
        getAPIShareList(){
            try {    
                axios.post('/MessageShared_List',{"MessageID": `${this.idPost}`})
                .then(response => {
                    console.log(response.data.data)
                    
                    this.dataShareListAPI.push(...response.data.data);
                    this.loading = false 
                }) 
            } 
            catch (error) {
                console.log(error)
                this.loading= true
            }
        },

        // Not Optimized yet
        searchShare(valueInput){
            var timer= ''
            clearTimeout(timer)
            
            timer = setTimeout(() =>{
                try {    
                    axios.post('/MessageShareObject_Search',{"findString": `${this.inputSearch}`})
                    .then(response => {
                        console.log(response.data.data)
                }) 
                } 
                    catch (error) {
                        console.log(error)
                        this.loading= true
                    }
                }, 1000)
        },

        closeBox(){
            this.$emit('close-box','shareBox')
        },
    }
}

</script>

<style lang="scss">

.input-share-cover{
    text-align: start;
    display: flex;
    flex-direction: column;

    input:focus {
        color: #1565C0;
        font-weight: bold;       
    }


    .input-share{
        margin-top: 20px;
        padding: 10px;
        border-radius: 5px;
        caret-color: #1565C0;

        &:focus{
            border-color: #1565C0;
            outline: none;
        }
    }
}

.list-sharing{
    overflow:scroll;
    max-height: 500px;
    text-align: start;
    font-weight: bold;       

    &:hover .detail-share{
        display: block;
    }
    
}

.detail-share{
    margin-top: 10px;
    display: none;
    color: gray;
    font-weight: normal;     
    
    .bold-text{
        font-weight: bold;       
        color: gray;     
    }
}

.group-share{
    margin-top: 10px;
    padding: 15px;
    color: #1565C0;

    

    &:hover{
        background-color: #DADDE2;
    }
}
</style>