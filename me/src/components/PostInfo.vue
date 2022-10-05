<template>
    <div>
        <div class="post-info-container">

            <div class="header-post">
            
                <div class="user-box">
                    <div class="avatar-post">
                        <img :src="`https://file.lhu.edu.vn/me/avatar/${Avatar}.jpg`" 
                        alt="Avatar" class="avatar-self">
                    </div>

                    <div class="post-box-user">
                        <span class="post-user" v-html="SourceName" @click="openCloseInfoBox()" ></span>
                        <span class="post-time">2 giờ trước</span>
                    </div>
                </div>


            <div class="post-expand">
                <img @click="showDropDownMenu()" class="arrow-expand" src="https://img.icons8.com/ios/20/000000/expand-arrow--v1.png"/>
            </div>

            </div>

            <div v-html="content" class="main-post"> </div>
            
            
            <h1>{{dataSeenPost.UserID}}</h1>
            
            <!-- <div v-for="(item, index)  of testSubCom" :key="index">   
                {{item.concat('')}}
            </div> -->



            <div class="wrap-image">
                <div v-for="(file,index) of AttachJsonString" :key="index" class="attach-file-post">         

                    <img  :src="`https://file.lhu.edu.vn/me/attach/${file.FileID}/${file.FileName}`"
                    class="img-attach" alt="File" 
                    />
                </div>
            </div>


            <div class="infoURL">
                <span v-html="URLInfo"></span>
            </div>

            <div class="post-function">
                <ButtonPost 
                    :dataButton="numberLiked"  
                    :srcImg="`${icon_noneHeart}`" 
                    :type="'love'"  
                    @update-data-button="updateDataButton"
                />

                <ButtonPost 
                    @focus-input-new-comment="focusInputCommnent()" 
                    :dataButton="NumberComment" 
                    :srcImg="`${icon_comment}`" :type="'comment'  
                "/>

                <ButtonPost      
                    :dataButton="NumberShared"
                    @click.native="openCloseShareBox()" 
                    :srcImg="`${icon_share}`"
                    :type="'share'
                  "/>

                <ButtonPost 
                    @click.native="openSeenPost()"
                    :dataButton="NumberView" 
                    :srcImg="`${icon_closeEyes}`"
                    :type="'see'"
                    @update-data-button="updateDataButton"
                    />
            </div>

            <div class="post-action-like-info" >
                <div class="number-like-info" v-html="UserLike"></div>
            </div>


            <!-- Comment -->
            <div class="comment-post-info">
                <div> {{CommentJsonString || ''}}</div>

                <div v-for="(comment,index) of CommentJsonString" :key="index" class="comment-cover">

                    <div class="wrapper-left-comment">
                        <div class="left-comment-cover">
                        
                            <div class="user-comment">
                                <img class="avatar-self" 
                                :src="`https://file.lhu.edu.vn/me/avatar/${comment.Avatar}.jpg`" 
                                alt="User" />
                            </div>
                
                            <div class="comment-box">
                                <span class="comment-name">{{comment.SourceName}}</span>
                                <span v-html="comment.CommentText" class="comment-content"></span>      

                                <div class="comment-function">         
                                    <a href="#" class="comment-time">1 giờ trước </a>                            
                                    <a href="#" class="comment-love">1 lượt thích</a>                            
                                    <a href="#" class="comment-response">Trả lời</a>     
                                </div>
                            </div>                            
                        </div>

                        <div class="love-comment" @click="testValue()" >
                            <img class="post-function-icon" :src="`${icon_noneHeart}`" alt="Love Comment Icon">
                        </div>                         
                    </div>
                
                </div>

            </div>

            <div class="post-new-comment">
                <div class="avatar-post">
                    <img src="../assets/img/loc.jpg" alt="Avatar" class="avatar-self">
                </div>

                <input ref="inputNewComment" class="input-new-comment" type="text" placeholder="Viết bình luận..." />

                <div>
                    <img class="comment-icon-attach" :src="`${icon_attacch}`" alt="Attach File"  @click="openCloseUploadBox()"  />
                </div>
            </div>
       
            <!-- Drop down Box-->
            <div class="post-menu" v-if="postMenuDropDownOpen">
                    <h5 class="post-menu-item ">
                        <div class="drop-down-icon">
                            <img class="abc" src="https://img.icons8.com/ios/18/000000/appointment-reminders--v1.png"/>
                        </div>
                        Không nhận thông báo
                    </h5>
                    <h5 class="post-menu-item">
                        <div class="drop-down-icon">
                            <img src="https://img.icons8.com/material-rounded/18/000000/copy.png"/>
                        </div>
                        Sao chép bài viết
                    </h5>
                    <h5 class="post-menu-item">
                        <div class="drop-down-icon">
                            <img src="https://img.icons8.com/ios-glyphs/20/000000/error--v1.png"/>
                        </div>
                        Báo cáo vi phạm
                    </h5>
            </div>

        </div>


        <!-- Seen Post -->   
        <SeenPost v-if="seenBoxOpen"            
            :widthBox="'500px'"
            :heightBox="'auto'" 
            @close-box="closeBox"
         />

        <!-- Share Post -->          
        <ShareBox v-if="shareBoxOpen"      
            :widthBox="'500px'"
            :heightBox="'auto'" 
            @close-box="closeBox"
        />

        <!-- Info User Box -->
        <InfoUserBox v-if="infoUserBoxOpen"          
            :widthBox="'600px'"
            :heightBox="'auto'" 
            @close-box="closeBox"
        />

        <!-- File Upload Box -->
       <UploadFileBox v-if="uploadFileOpen"
            :widthBox="'500px'"
            :heightBox="'auto'" 
            @close-box="closeBox"
       />
  
    </div>
</template>

<script>
import {ic_noneHeart, ic_comment, ic_share, ic_closeEyes, ic_attach, ic_upload} from '../assets/img/Image'
import Box from './Box.vue';
import SeenPost from './SeenPost.vue'
import ShareBox from './ShareBox.vue';
import ButtonPost from './ButtonPost.vue';
import InfoUserBox from './InfoUserBox.vue';
import UploadFileBox from './UploadFileBox.vue';

export default {
    name: "PostInfo",
    props: ["dataPostAPI", "idPost"],
    components: { ButtonPost, Box, SeenPost, ShareBox, InfoUserBox, UploadFileBox },
    data(){
        return{
            postMenuDropDownOpen: false,
            shareBoxOpen: false,
            seenBoxOpen: false,
            infoUserBoxOpen: false,
            uploadFileOpen: false,
            content: '',
            numberLiked: '',
            NumberComment: '',
            NumberShared: '',
            NumberSubComm:'',
            NumberView: '',
            URLInfo: '',
            SourceName: '',
            UserLike: '',
            Avatar: '',
            CommentJsonString: [],
            AttachJsonString: [],
            subComment: '',

            dataSeenPost: [],

            // icon
            icon_noneHeart: ic_noneHeart,
            icon_comment: ic_comment,
            icon_share: ic_share,
            icon_closeEyes: ic_closeEyes,
            icon_attacch: ic_attach,
            icon_upload: ic_upload,

            //Seeb box 
            dataIDPost: '',

            departmentID: '',
            fullName: '',
            userName: '',
            userID: '',
            updateTime: '',


            // upload file
            fileUpload: [],

            // test
            testSubCom: '',
            nameFile: '',

            // Box show
            
        }
    },
    mounted(){
        this.getIdPost()
    },  

    created(){
       if(this.dataPostAPI !== null){
            //  console.log("API", this.dataPostAPI)
            this.handlePostAPI(this.dataPostAPI)
       }
       else{
            console.log("Can get API")
       }
       this.keyPressClose()
    },
    methods:{
        closeBox(typeBox){
            switch(typeBox){
                case 'seenBox':
                    this.seenBoxOpen = false    
                    this.enableScroll()
                    break;
                case 'shareBox':
                    this.shareBoxOpen = false
                    this.enableScroll()
                    break;
                case 'infoUserBox':
                    this.infoUserBoxOpen = false
                    this.enableScroll()
                    break;
                case 'uploadFileBox':
                    this.uploadFileOpen = false
                    this.enableScroll()
                    break;
                default:
                    this.enableScroll()
            }
         
        },
        openCloseShareBox(){
            this.shareBoxOpen = !this.shareBoxOpen
            this.preventScroll()
        },


        openSeenPost(){
            this.seenBoxOpen = !this.seenBoxOpen
            this.preventScroll()        
        },

        openCloseInfoBox(){
            this.infoUserBoxOpen = !this.infoUserBoxOpen
            this.preventScroll()
        },
        
        openCloseUploadBox(){
            this.uploadFileOpen = !this.uploadFileOpen
            this.preventScroll()
        },


        getIdPost(){
            this.dataIDPost = this.idPost    
        },

        // Update Value Button Post Function 
        updateDataButton(newValue){
            if(newValue.type === 'love' ){
                this.numberLiked = newValue.data
            }
            else if(newValue.type === 'saw' ){
                this.NumberView = newValue.data
            }
        },

        abc(value){
            for(var element=0; element<= value[0].length; element++ ){
                const valueGet = value[0][element]
                
                this.departmentID = valueGet.DepartmentID,
                this.fullName =  valueGet.FullName,
                this.updateTime = valueGet.UpdateTime,
                this.userID = valueGet.UserID,
                this.userName = valueGet.UserName 
            }       
        },

        fileSending(value) {
            console.log('method')

            this.fileUpload.push(value)
            console.log(this.fileUpload)

            console.log(value)
            this.nameFile = value
        },

        handlePostAPI(data){
            this.content = data.Contents   
            this.numberLiked = data.NumberLike
            this.NumberComment = data.NumberComment
            this.NumberShared = data.NumberShared
            this.NumberView = data.NumberView
            this.NumberSubComm = data.NumberSubComm
            this.URLInfo = data.URLInfo
            this.SourceName = data.SourceName
            this.UserLike= data.UserLike
            this.Avatar = data.Avatar
            this.CommentJsonString = JSON.parse(data.CommentJsonString)
            this.AttachJsonString = JSON.parse(data.AttachJsonString)


            // this.testSubCom = JSON.parse(data.CommentJsonString)[0].subComm
        },

        
        focusInputCommnent(){
            this.$refs.inputNewComment.focus()
        },

        showDropDownMenu(){
            this.postMenuDropDownOpen = !this.postMenuDropDownOpen
        },

        // Not use Yet: To close box
        keyPressClose () {
            document.onkeydown = function(e) {
                 e = e || window.event;
                if (e.key == "Escape") {
                   
                }
            };
        },

        
        enableScroll(){
            var scroll = document.body.style.overflow 

            if (scroll === "hidden"){
                document.body.style.overflow = ""
            }
        },

        preventScroll(){
            var scroll = document.body.style.overflow 
            if(scroll === ""){
                document.body.style.overflow = "hidden"
            }
        }   
    }

}
</script>

<style lang="scss" scoped>

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
                &:hover{
                    text-decoration: underline;
                }       
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
    width: inherit;
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
    position: relative;
    display: flex;
    align-items: center;
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
        padding: 10px;
        margin-left: 10px;
        text-indent: 10px; //margin placeholder
        border-radius: 20px;
        border: thin solid rgba(84, 84, 87, 0.25);   


        &:focus{
            border: thin solid rgba(84, 84, 87, 0.25);   
            outline: none;
        }
    }

    .comment-icon-attach{
        position: absolute;
        width: 20px;
        right: 0;
        transform: translate(-50%, -50%);

        &:hover{
            cursor: pointer;
        }
    }

}


.wrapper-left-comment{
    display: flex;
    padding: 2px;
    background-color: wheat;    

    &:hover{
        cursor: pointer;
    }
}

.img-attach{
    width: 100%;
    height: 100%;
    background-color: #1565C0;
}


.comment-cover{
    text-align: start;


    .left-comment-cover{
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-grow: 3;

        .user-comment{
            height: 100%;
        }
    }


    .avatar-self{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        vertical-align: middle;
    }

    .comment-box{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 10px;
        width: 90%;

        .comment-name{
            color:#1565C0;
            font-weight: bold;
        }

        .comment-function{
            margin-top: 10px;

            .comment-time,
            .comment-love,
            .comment-response {
                color: #959595;
                text-decoration: none;
                cursor: pointer;
            }

            .comment-response{
                margin-left: 10px;
            }

        }

       
           
    }

    .love-comment{
        display: flex;
        align-items: center;


        .post-function-icon{
            width: 20px;
            height: 20px;
        }
    }

}

.post-menu{
    position: absolute;
    top: 60px;
    right: 10px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 12px;
    overflow: visible;
    z-index: 10;
    
    .post-menu-item{
        margin: 0px;
        padding: 10px;
        display: flex;
        align-items: center;
        background-color: inherit;

        &:hover{
            color: white;
            background-color: #248fc1;
            cursor: pointer;
        }

        &:first-child{
            border-top-left-radius: inherit;
            border-top-right-radius: inherit;
        }

        &:last-child{
            border-bottom-left-radius: inherit;
            border-bottom-right-radius: inherit;
        }
        
        .drop-down-icon{
            width: 50px;
        }
    }

    &::before{
        content: "";
        position: absolute;
        right: -6px;
        width: 0;
        height: 0;
        border: 8px solid black;
        border-color: transparent transparent white white;
        transform-origin: 0 0;
        transform: rotate(135deg);    
        box-shadow: -1px 2px 5px 0 rgba(0, 0, 0, 0.24);
        z-index: -1;
    }

    &::after{
        content: "";
        display: block;
        position: absolute;
        right: 0;
        top: -15px;
        width: 100%;
        z-index: -1;
        height: 15px;
        z-index: -1;
    }

}


</style>