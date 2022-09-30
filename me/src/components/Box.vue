<template>
  <div id="box-container" :style="cssProps">
     <div v-html="contentBox"></div>
  </div>
</template>

<script>
export default {
    name: 'Box',
    props: ['widthBox', 'heightBox', 'contentBox','dataBoxOpen'],
    data() {
        return {
            dataOpenBox: this.dataBoxOpen,
            imgtest: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2SYykGGnKIMy_SEvwEWz8FFcZHh2FyEKqbg&usqp=CAU'

        }
    },
    computed:{
        cssProps(){
            return {
                '--widthBox': this.widthBox,
                '--heightBox': this.heightBox
            }
        }
        
    },
    methods:{
        closeBox(eventEmit) {
            let element = document.getElementsByClassName('close-icon')[0]

            element.addEventListener('click', () =>{
                this.dataOpenBox = false
                this.$emit(`${eventEmit}`, this.dataOpenBox)
            })
        },
        
        preventScroll(){
            var scroll = document.body.style.overflow 
            if(scroll === ""){
                document.body.style.overflow = "hidden"
            }
        },

        shareBoxState(){
            this.closeBox('close-share-box')
            this.preventScroll()
        },

        seenBoxState(){      
            this.closeBox('close-seen-box')
            this.preventScroll()
        },

        infoUserBoxState(){
            this.closeBox('close-info-box')
            this.preventScroll()
        },

        listenUploadFile(){
            const fileUploader = document.getElementById('file-input');
            const reader = new FileReader();
            const imageGrid = document.getElementById('detail-upload-render')
            const nameFile = document.getElementsByClassName('file-name')

            fileUploader.addEventListener('change', (event) => {
            const files = event.target.files;
            const file = files[0];
            const fileName = files[0].name;

            reader.readAsDataURL(file);
            
            reader.addEventListener('load', (event) => {
                const img = document.createElement('img');
                imageGrid.appendChild(img)
                img.src = event.target.result;
                img.alt = file.name;

                this.$emit('file-name', fileName)
                
            });
            });
        }

    },
    mounted() {
       this.shareBoxState()
       this.seenBoxState()
       this.infoUserBoxState()
       this.listenUploadFile()
    }

}
</script>

<style lang="scss">
#box-container{
    width: var(--widthBox);
    height: var(--heightBox);
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


// Share box
.overlay{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0, 0.4);
    z-index: 3;
}


.cover-box{
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


    .input-share{
        text-align: start;
        display: flex;
        flex-direction: column;
    }

}

.close-icon{
    &:hover{
        cursor: pointer;
    }
}


// Seen Post Box

.header-box{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.avatar-self{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
}

.list-seen{
    display: flex;
    align-items: center;
    background-color: #248fc1;
    padding: 10px;

    .user-seen-info{
        display: flex;
        flex-direction: column;
        text-align: start;
        margin-left: 10px;
    }   
}


// Info User Post Box

.info-user-body{
    display: flex;
    align-items: center;

    .info-user-img-cover{

        .info-user-img{
            border-radius: 50%;
            width: 200px;
            height: 200px;
            object-fit: cover;
            box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px;
        }
    }

    .info-user-detail{
        height: 200px;
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        padding: 20px;
        
        .info-user-name{
            font-size: 20px;
            font-weight: 600;
            color:#248fc1;

        }

        .btn-add-info-user{
            width: 100%;
            border-radius: 20px;
            padding: 10px;
            background-color: #248fc1;
            color: white;
            border: none;
            cursor: pointer;
        }
    }
}

// Upload File
.upload-file-body{
    border: 3px dashed #1565C0;
}

.progress-file-area{

    .detail-progress{
     padding: 10px;
        margin-top: 10px;
        background-color: rgb(173, 161, 161);
    }
}
</style>