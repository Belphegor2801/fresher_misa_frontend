<template>
    <div class="toast">
        <i class="icon--24" 
            :class="{'icon--toast-success': type==this.$ToastTypeEnum.Success, 
                    'icon--toast-info': type==this.$ToastTypeEnum.Info,
                    'icon--toast-warning': type==this.$ToastTypeEnum.Warning,
                    'icon--toast-error': type==this.$ToastTypeEnum.Error,}"
        > </i>
        <p> {{message}}</p>
        <i class="toast__close-button icon--36 icon--button icon--close" 
            id="asset-form--close-button"
            @click="onCloseToast">
        </i>
    </div>
</template>

<script>
import ToastStore from "@/core/store/ToastStore.ts";
export default {
    name: "MToast",
    props: {
        id: {
            type: String,
        },
        type: {
            type: Number,
        },
        message: {
            type: String,
        }
    },

    setup() {
        const toastStore = ToastStore();
        return {toastStore};
    },

    methods: {
        /**
         * Đóng toast
         * @return không
         * author: NXHinh (21/09/2023)
         */
        onCloseToast() {
            // console.log("close: ", this.id);
            this.toastStore.closeToast(this.id);
        }
    },
    mounted() {
        /**
         * Phát sự kiện đóng Toast Message đến component cha sau 4 giây
         * author: NXHinh (21/09/2023)
         */
        setTimeout(this.onCloseToast, 4000);
    }
}
</script>

<style scoped>
@import url(./toast.css);
</style>