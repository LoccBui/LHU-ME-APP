<template>
    <div class="post-info-container">

        <div class="header-post">
           
            <div class="user-box">
                <div class="avatar">
                     <img src="../assets/img/loc.jpg" alt="Avatar" class="avatar-self">
                 </div>

                <div class="post-box-user">
                    <span class="post-user">LocBui</span>
                    <span class="post-time">2 giờ trước</span>
                </div>
            </div>


           <div class="post-function">
                <img src="https://img.icons8.com/ios-glyphs/30/000000/expand-arrow--v1.png"  />
           </div>

        </div>


        <div class="main-post">
            [THÔNG BÁO]
            BÁO CÁO THỰC TẬP VÀ TỐT NGHIỆP – Đợt Tháng 9/2022
            (Đối với sinh viên Khoá 2018 trở về trước)

            1. Lịch trình cụ thể (up trong course BCTTTN_Dot092022)
            2. Sinh viên Khóa 2018 và các khóa trở về trước chưa đăng ký thực tập và tốt nghiệp hoặc không đậu 1 trong hai học phần đều đăng ký theo link dưới đây.
            3. Link đăng ký: https://forms.gle/WPcRhr58MHW2pAHRA
            4. Lệ phí báo cáo tốt nghiệp lần 2: 3.00.000 VNĐ.
        </div>

        <div class="post-function">
            <Button :srcImg="'https://img.icons8.com/material-outlined/20/000000/filled-like.png'" :type="'love'"/>
            <Button :srcImg="'https://img.icons8.com/fluency-systems-regular/20/000000/comments--v2.png'" :type="'comment'"/>
            <Button :srcImg="'https://img.icons8.com/fluency-systems-regular/20/000000/share.png'" :type="'share'" />
            <Button :srcImg="'https://img.icons8.com/external-creatype-glyph-colourcreatype/20/000000/external-eyes-basic-creatype-glyph-colourcreatype-3.png'"  :type="'eyes'" />
        </div>

    </div>
</template>

<script>
import Button from './Button.vue';
export default {
    name: "PostInfo",
    components: { Button },
    data(){
        return{
        }
    },
    methods:{
        replace(src, type){
            
        }
    }
}
</script>

<style lang="scss">

.post-info-container{
    height: auto;
    padding: 20px;
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
    padding: 10px 0;
}

.post-function{
    display: flex;
    justify-content: space-between;
}

</style>