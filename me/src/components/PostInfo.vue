<template>
    <div>
        <div class="post-info-container">

            <div class="header-post">
            
                <div class="user-box">
                    <div class="avatar-post">
                        <img src="../assets/img/loc.jpg" alt="Avatar" class="avatar-self">
                    </div>

                    <div class="post-box-user">
                        <span class="post-user" v-html="SourceName"></span>
                        <span class="post-time">2 giờ trước</span>
                    </div>
                </div>


            <div class="post-expand">
                <img @click="showDropDownMenu()" class="arrow-expand" src="https://img.icons8.com/ios/20/000000/expand-arrow--v1.png"/>
            </div>

            </div>

            <div v-html="content" class="main-post"> </div>

            <div class="infoURL">
                <span v-html="URLInfo"></span>
            </div>

            <div class="post-function">
                <ButtonPost :dataButton="numberLiked"  :srcImg="'https://img.icons8.com/material-outlined/20/000000/filled-like.png'" :type="'love'  "/>
                <ButtonPost @focus-input-new-comment="focusInputCommnent()" :dataButton="NumberComment" :srcImg="'https://img.icons8.com/fluency-systems-regular/20/000000/comments--v2.png'" :type="'comment'  "/>
                <ButtonPost @open-share-box="openShareBox()" :dataButton="NumberShared" :srcImg="'https://img.icons8.com/fluency-systems-regular/20/000000/share.png'" :type="'share' " />
                <ButtonPost  :dataButton="NumberView" :srcImg="'https://img.icons8.com/external-creatype-glyph-colourcreatype/20/000000/external-eyes-basic-creatype-glyph-colourcreatype-3.png'"  :type="'eyes'" />
            </div>

            <div class="post-action-like-info" >
                <img src="https://img.icons8.com/fluency/20/000000/facebook-like.png"/>
                <div class="number-like-info" v-html="UserLike"></div>
            </div>


            <div class="comment-post-info">
                <div> {{CommentJsonString || ''}}</div>
                <h1> comment box</h1>
                
            </div>

            <div class="post-new-comment">
                <div class="avatar-post">
                    <img src="../assets/img/loc.jpg" alt="Avatar" class="avatar-self">
                </div>

                <input ref="inputNewComment" class="input-new-comment" type="text" placeholder="Viết bình luận..." >
            </div>

            <!-- Box appear -->
            <div class="drop-down-menu">
                <Box v-if="postMenuDropDown" :widthBox="'300px'" :heightBox="'auto'" :contentBox="postDropDownMenu()" />
            </div>

        </div>

            <!-- Share Box -->
        <div class="sharing-box">
            <Box v-if="shareBoxOpen" :widthBox="'500px'" :heightBox="'auto'"
             :contentBox="showShareBox()" />
        </div>

          

    </div>
</template>

<script>
import ButtonPost from './ButtonPost.vue';
import Box from './Box.vue';
export default {
    name: "PostInfo",
    props: ["dataPostAPI"],
    components: { ButtonPost, Box },
    data(){
        return{
            postMenuDropDown: false,
            shareBoxOpen: false,
            content: '',
            numberLiked: '',
            NumberComment: '',
            NumberShared: '',
            NumberView: '',
            URLInfo: '',
            SourceName: '',
            UserLike: '',
            CommentJsonString: '',
        }
    },
    created(){
       if(this.dataPostAPI !== null){
        // console.log(this.dataPostAPI.Contents)
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
            this.UserLike= data.UserLike

            let commentJson = JSON.parse(data.CommentJsonString)
            this.CommentJsonString = commentJson[0].CommentText 
        },
        
        focusInputCommnent(){
            this.$refs.inputNewComment.focus()
        },

        postDropDownMenu(){
            return `
                <div class="post-menu">
                    <h5 class="post-menu-item">Không nhận thông báo</h5>
                    <h5 class="post-menu-item">Báo cáo vi phạm</h5>
                    <h5 class="post-menu-item">Sao chép bài viết</h5>
                </div>
            `      
        },

        showDropDownMenu(){
            this.postMenuDropDown = !this.postMenuDropDown
        },

        openShareBox(){ 
            this.shareBoxOpen = true
        },

        showShareBox(){
            return `
               <div class="overlay">
                    <div class="post-share-box">
                    
                    <div class="header-share-box">
                        <h3>Chia sẻ bài viết này</h3>
                        <div class="close-box">
                            <img class="close-icon" @click="abc()" src="https://img.icons8.com/fluency-systems-regular/20/000000/x.png"/>    
                        </div>
                    </div>

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
                </div>
                </div>
            `      
        }
        
       
    }

}
</script>

<style lang="scss">

.post-info-container{
    position: relative;
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


        .avatar-self{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            vertical-align: middle;
        }

        .post-box-user{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-left: 10px;

            .post-user{
                color: #1565C0;
                cursor: pointer;
            }

            .sharedUser{
                color: #959595;
            }
         }
    }

    .post-expand{

    
        .arrow-expand:hover{
            cursor: pointer;
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
    border: thin solid rgba(84, 84, 87, 0.25);   
    overflow: hidden;
    padding: 20px 0;


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
    justify-content: space-around;
    padding: 10px 0;
    border: thin solid rgba(84, 84, 87, 0.25);   
    overflow: hidden;
}

.post-action-like-info{
    display: flex;
    align-items: center;
    text-align: start;
    padding: 10px;
    height: auto;
    border: thin solid rgba(84, 84, 87, 0.25);   
    
    
    .number-like-info{
        color:#1565C0;
        margin-left: 5px;

        &:hover{
            text-decoration: underline;
            cursor: pointer;
        }
    }

}

.comment-post-info{
    width: 100%;
    border: thin solid rgba(84, 84, 87, 0.25);   
    height: auto;
}

.post-new-comment{
    display: flex;
    padding: 20px 0 0;

    .avatar-post{

        .avatar-self{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            vertical-align: middle;
        }
    }
    
    .input-new-comment{
        flex: 1;
        margin-left: 10px;
        text-indent: 10px; //margin placeholder
        border-radius: 20px;
        border: thin solid rgba(84, 84, 87, 0.25);   

        &:focus{
            border: thin solid rgba(84, 84, 87, 0.25);   
            outline: none;
        }
    }

}

</style>