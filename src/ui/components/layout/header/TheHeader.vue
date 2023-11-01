<template>
    <div id="header" class="header">
        <div class="header__title">{{ this.$MResource.RouterTitle[this.$route.name] }}</div>
        <div class="header__menu">
            <div class="header__menu--text">Sở tài chính</div>
            <div class="header__menu--input">
                <div>Năm</div>
                <div><b>{{this.fixedAssetStore.year}}</b></div>
                <div class="icon__caret-up-and-down">
                    <div class="icon--button icon--caret-up" @click="increaseYear"></div>
                    <div class="icon--button icon--caret-down" @click="decreaseYear"></div>
                </div>
            </div>
            <div class="header__menu--icons">
                <div class="icon--24 icon--button icon--notification" @click="onShowDevelopingToast"></div>
                <div class="icon--24 icon--button icon--system" @click="onShowDevelopingToast"></div>
                <div class="icon--24 icon--button icon--support" @click="onShowDevelopingToast"></div>
                <div class="icon__profile-container" @click="onShowDevelopingToast">
                    <div class="icon--24 icon--button icon--profile"></div>
                    <div class="icon--button icon--caret-down" ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import FixedAssetStore from "@/core/store/FixedAssetStore.ts";
    export default {
        name: "TheHeader",

        setup () {
            const fixedAssetStore = FixedAssetStore();
            
            return {fixedAssetStore}
        },

        methods: {
            /**
             * Hiện thị Toast thông báo tính năng đang phát triển
             * @return không
             * author: NXHinh (18/08/2023)
             */
            onShowDevelopingToast() {
                this.$toastStore.onShowDevelopingToast()
            },
            /**
             * Tăng 1 năm
             * @return không
             * author: NXHinh (24/08/2023)
             */
            increaseYear (){
                this.fixedAssetStore.year = (parseInt(this.fixedAssetStore.year) + 1).toString()
            },
            /**
             * Giảm 1 năm
             * @return không
             * author: NXHinh (24/08/2023)
             */
            decreaseYear () {
                this.fixedAssetStore.year = (parseInt(this.fixedAssetStore.year) - 1).toString()
            },
        },
        data() {
            return {
                year: this.$MHelper.getCurrentYear(),
            }
        },
    }
</script>

<style scoped>
    @import url(./header.css); 
</style>