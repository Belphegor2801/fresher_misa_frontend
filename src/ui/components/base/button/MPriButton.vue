<template>
    <button id="button" :type=type :tabindex="tabindex"
            class="pri-btn" :class="'pri-btn--' + buttonClass" 
            ref="button"
            :style="{'width': width}">
        <i v-if="icon" class="icon--20 icon--button mr-4" :class=icon></i>
        {{text}}
    </button>
</template>

<script>
export default {
    name: "MPriButton",
    props: {
        // Loại button
        type: {
            type: String,
            default: "button",
            values: ["button", "submit"]
        },
        // class của button
        buttonClass: {
            type: String,
            default: "main-button",
            values: ["main-button", "sub-button", "outline-button"]
        },
        // chữ trong button
        text: {
            type: String,
        },
        // tabindex
        tabindex: {
            type: Number,
            default: 0
        },
        // icon của button
        icon: {
            type: String,
            default: ""
        },
        width: {
            type: String,
            default: '',
        },
    },
    methods: {
        /**
         * Focus ref
         * @return không
         * author: NXHinh (21/09/2023)
         */
        focusOnButton() {
            const buttonRef = this.$refs.button;
            buttonRef.focus();
        },
    },
}
</script>

<style scoped>
    @import url(./button.css);
</style>