<template>
    <div class="post-info-container">

        <div class="header-post">
           
            <div class="user-box">
                <div class="avatar">
                     <img src="../assets/img/loc.jpg" alt="Avatar" class="avatar-self">
                 </div>

                <div class="post-box-user">
                    <span class="post-user" v-html="SourceName"></span>
                    <span class="post-time">2 giờ trước</span>
                </div>
            </div>


           <div class="post-function">
                <img src="https://img.icons8.com/ios-glyphs/30/000000/expand-arrow--v1.png"  />
           </div>

        </div>


        <div v-html="content" class="main-post">
        </div>


        <div class="infoURL">
            <span v-html="URLInfo"></span>
        </div>

        <div class="post-function">
            <ButtonPost :dataButton="numberLiked"  :srcImg="'https://img.icons8.com/material-outlined/20/000000/filled-like.png'" :type="'love'"/>
            <ButtonPost :dataButton="NumberComment" :srcImg="'https://img.icons8.com/fluency-systems-regular/20/000000/comments--v2.png'" :type="'comment'"/>
            <ButtonPost :dataButton="NumberShared" :srcImg="'https://img.icons8.com/fluency-systems-regular/20/000000/share.png'" :type="'share'" />
            <ButtonPost :dataButton="NumberView" :srcImg="'https://img.icons8.com/external-creatype-glyph-colourcreatype/20/000000/external-eyes-basic-creatype-glyph-colourcreatype-3.png'"  :type="'eyes'" />
        </div>

    </div>
</template>

<script>
import ButtonPost from './ButtonPost.vue';
export default {
    name: "PostInfo",
    props: ["dataPostAPI"],
    components: {  ButtonPost },
    data(){
        return{
            content: '',
            numberLiked: '',
            NumberComment: '',
            NumberShared: '',
            NumberView: '',
            URLInfo: '',
            SourceName: ''
        }
    },
    created(){
       if(this.dataPostAPI !== null){
        console.log(this.dataPostAPI.Contents)
            this.handlePostAPI(this.dataPostAPI)
       }
       else{
            console.log("chua nhan")
       }
    },
    methods:{
        handlePostAPI(data){
            this.content = data.Contents   
            this.numberLiked = data.NumberLike
            this.NumberComment = data.NumberComment
            this.NumberShared = data.NumberShared
            this.NumberView = data.NumberView
            this.URLInfo = data.URLInfo
            this.SourceName = data.SourceName
        }
    }

}
</script>

<style lang="scss">

.post-info-container{
    height: auto;
    padding: 20px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius:20px;
    border: thin solid rgba(84, 84, 87, 0.25);   
}

.post-info-container + .post-info-container{
    margin-top: 100px;
}

.header-post{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 40px;

    .user-box{
        display: flex;
        
        .avatar{
            border-radius: 20%;
        }

        .avatar-self{
            width: 40px;
            height: 40px;
            border-radius: 20%;
            vertical-align: middle;
        }

        .post-box-user{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-left: 10px;
         }
    }

 
}

.main-post{
    text-align: start;
    padding: 10px 0;
    line-height: 25px;
}

.infoURL{
    height: auto;
    border-radius:10px; 
    border: thin solid rgba(84, 84, 87, 0.25);   
    overflow: hidden;
    padding: 0 0 20px;


    .url-img-large  img{
        width: 100%;
        height: 100%;
    }

    a{
        text-align: start;
        color: #1565C0;
        text-decoration: none;
    }

    .url-description{
        font-size: 13px;
        color: #959595;
    }
}




.post-function{
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
}

</style>