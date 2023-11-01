<template>
    <div class="dialog-container">
        <div class="dialog-background"></div>
        <div id="dialog" class="dialog">
            <div class="dialog__body">
                <div class="dialog__body--icon-container">
                    <div class="icon--24" :class="icon"></div>
                </div>
                <p>{{message}}</p>
            </div>
            <div class="dialog__footer">
                <a></a>
                <div class="dialog__footer--buttons">
                    <m-pri-button
                        buttonClass="main-button"
                        ref="mainButton"
                        :text="buttonText"
                        :onClick="buttonFunction"
                    ></m-pri-button>
                    <slot name="sub-button"></slot>
                    <slot name="outline-button"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "MDialog",
    props: {
        icon: {
            type: String,
            default: "icon--warning"
        },
        message: {
            type: String,
            default: ""
        },
        buttonText: {
            type: String,
            default: ""
        },
        buttonFunction: Function,
    },
    mounted () {
        // Focus vào main-button khi mounted
        this.$nextTick(() => {
            setTimeout(() => this.$refs.mainButton.focusOnButton(), 10);
        })
    },
}
</script>

<style scoped>
@import url(./dialog.css);
</style>