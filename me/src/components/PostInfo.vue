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

                    <img class="img-attach" alt="File" 
                        :src="`https://file.lhu.edu.vn/me/attach/${file.FileID}/${file.FileName}`"/>
                </div>
            </div>


            <div class="infoURL">
                <span v-html="URLInfo"></span>
            </div>

            <div class="post-function">
                <ButtonPost 
                    :dataButton="numberLiked"  
                    :srcImg="`${icon_noneHeart}`" 
                    :type="'love'  
                "/>

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
                    @click.native="openCloseSeenBox()"
                    :dataButton="NumberView" 
                    :srcImg="`${icon_closeEyes}`"
                    :type="'see'
                "/>
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
            <div class="drop-down-menu">
                <Box v-if="postMenuDropDown" 
                :widthBox="'300px'" 
                :heightBox="'auto'" 
                :contentBox="postDropDownMenu()" />
            </div>

        </div>

            <!-- Share Box -->
        <div class="sharing-box">
            <Box v-if="shareBoxOpen" 
                type="shareBox"
                :widthBox="'500px'"
                :heightBox="'auto'" 
                :contentBox="shareBoxContent()"  
                :dataBoxOpen="shareBoxOpen"
                @close-share-box="openCloseShareBox()"/>
        </div>

        <!-- Seen Post -->
        <div class="seen-box">
            <Box v-if="seenBoxOpen" 
            type="seenBox"
            :widthBox="'500px'"
            :heightBox="'auto'" 
            :dataBoxOpen="seenBoxOpen"
            :contentBox="seenBoxContent()" 
            @close-seen-box="openCloseSeenBox()"
            @seen-post-api="abc"
            @get-id-post = getIdPost
            :dataIDPost="dataIDPost"
            />  
        </div>

        <!-- Info User Post Box -->
        <div class="info-user-post">
            <Box v-if="infoUserBoxOpen"
                type="infoUserBox"
                :widthBox="'600px'"
                :heightBox="'auto'" 
                :contentBox="infoUserPostContent()"
                :dataBoxOpen="infoUserBoxOpen"
                @close-info-box="openCloseInfoBox()"
            />
        </div>

        <!-- File Upload Box -->
        <div class="file-upload-box">
            <Box 
            v-if="uploadFileOpen"
            type="uploadFileBox"
            :widthBox="'500px'"
            :heightBox="'auto'" 
            :contentBox="uploadFileContent()"
            :dataBoxOpen="uploadFileOpen"
            @close-upload-box="openCloseUploadBox()"
            @file-sending="fileSending"
            />
            
        </div>

      
    </div>
</template>

<script>
import ButtonPost from './ButtonPost.vue';
import Box from './Box.vue';
import {ic_noneHeart, ic_comment, ic_share, ic_closeEyes, ic_attach, ic_upload} from '../assets/img/Image'

export default {
    name: "PostInfo",
    props: ["dataPostAPI", "idPost"],
    components: { ButtonPost, Box },
    data(){
        return{
            postMenuDropDown: false,
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
        getIdPost(){
            this.dataIDPost = this.idPost    
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

        postDropDownMenu(){
            return `
                <div class="post-menu">
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
                        `      
        },

        showDropDownMenu(){
            this.postMenuDropDown = !this.postMenuDropDown
        },

        // Not use Yet: To close box
        keyPressClose () {
            document.onkeydown = function(e) {
                 e = e || window.event;
                if (e.key == "Escape") {
                   
                }
            };
        },

        openCloseShareBox(){ 
            this.shareBoxOpen = !this.shareBoxOpen
            this.enableScroll()
        },

        shareBoxContent(){
            return `
               <div class="overlay">
                    <div class="cover-box">
                    
                    <div class="header-box">
                        <h3>Chia sẻ bài viết này</h3>

                        <div class="close-box" >
                            <img src="https://img.icons8.com/fluency-systems-regular/20/000000/x.png" class="close-icon">    
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
        },

        // Seen Box
        seenBoxContent() {
            return `
            <div class="overlay">
                <div class="cover-box">

                    <div class="header-box">
                        <h3>Những người đã xem bài viết</h3>

                        <div class="close-seen-box" >
                            <img src="https://img.icons8.com/fluency-systems-regular/20/000000/x.png" class="close-icon">    
                        </div>
                    </div>

                    <div class="list-seen">
                        
                        <div class="user-seen-avatar">
                            <img class="avatar-self" 
                            src="https://file.lhu.edu.vn/me/avatar/122000110"" 
                            alt="User" />
                        </div>
                            
                        <div class="user-seen-info">
                            <span>${this.userID}</span>
                            <span>${this.userName} -${this.departmentID} </span>
                            <span>${this.updateTime}</span>
                            <p></p>
    
                        </div>
                    </div>


                </div>
            </div>
                
            `
        },

        openCloseSeenBox(){
            this.seenBoxOpen = !this.seenBoxOpen
            this.enableScroll()
        },
        
        // Info user box
        infoUserPostContent(){
            return`
                    <div class="overlay" >
                        <div class="cover-box">

                            <div class="header-box">                
                                <h3>Thông tin người dùng</h3>
                                <div class="close-seen-box" >
                                    <img src="https://img.icons8.com/fluency-systems-regular/20/000000/x.png" class="close-icon">    
                                </div>
                            </div>

                            
                            <div class="info-user-body">

                                <div class="info-user-img-cover" >
                                    <img class="info-user-img" src="https://file.lhu.edu.vn/me/avatarorigin/NV00000371.jpg ">
                                </div>
                                
                                <div class="info-user-detail">
                                    <span class="info-user-name">Nguyễn Vũ Quỳnh - Jimmy_Nguyen</span>
                                    <span class="info-user-email">nguyen_vuquynh@yahoo.com</span>
                                    <button @click="abc" class="btn-add-info-user">Kết bạn</button>
                                </div>

                            </div>
                    </div>
                `
        },

        openCloseInfoBox(){
            this.infoUserBoxOpen = !this.infoUserBoxOpen
            this.enableScroll()
        },

        enableScroll(){
            var scroll = document.body.style.overflow 

            if (scroll === "hidden"){
                document.body.style.overflow = ""
            }
        },


        // File Upload Box
        openCloseUploadBox(){
            this.uploadFileOpen = !this.uploadFileOpen
            this.enableScroll()
        },


        uploadFileContent(){
            return `
            <div class="overlay" >
                
                    <div class="cover-box">
                        <div class="header-box">                
                            <h3> Tải lên file</h3>
                            <div class="close-seen-box" >
                                <img src="https://img.icons8.com/fluency-systems-regular/20/000000/x.png" class="close-icon">    
                            </div>
                        </div>


                        <div class="upload-file-body">
                            <form action="#">
                               
                                <label for="file-input">
                                    <img src="${this.icon_upload}" class="icon-upload-file" />
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

</style>