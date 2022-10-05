<template>
    
        <div class="overlay">
            <div id="container" :style="cssProps">
                <header>
                    <slot name="header"></slot>
                </header>

                <main>
                    <slot name="content"></slot>
                </main>

                <footer>
                    <slot name="footer"></slot>
                </footer>
            </div>
        </div>
 </template>
 
 <script>
 export default {
    name: 'BoxContainer',
    props: ['widthBox', 'heightBox'],
    data() {
        return {
            dataOpenBox: this.dataBoxOpen,
            dataSeenPostAPI: []
            
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
    mounted(){
    }
 }
 </script>
 
 <!-- Add "scoped" attribute to limit CSS to this component only -->
 <style lang="scss" scoped>


.overlay{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0, 0.4);
    z-index: 3;
}


.header-box{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

 </style>