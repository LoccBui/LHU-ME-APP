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
    methods:{
        expandBoxHover(){
            alert("à")
        }
    }
 }
 </script>
 
 <style lang="scss" >
#container{
    width: var(--widthBox);
    height: var(--heightBox);
    background-color: white;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 12px;
    padding: 5px;
}

.header-box{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.overlay{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0, 0.4);
    z-index: 3;
}

</style>