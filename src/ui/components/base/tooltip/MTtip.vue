<template>
    <div
        class="tooltip__container"
        ref="container"
        @mouseover="showToolTip = true"
        @mouseout="showToolTip = false"
    >
        <div class="tooltip__content" ref="content">
            <slot class="content" name="content"></slot>
        </div>
        <Teleport to="#app">
            <div
                v-if="show && showToolTip"
                class="tooltip__textbox"
                :class="toolTipPosition + ' ' + visiable"
                :style="style"
            >
                {{ text }}
            </div>
        </Teleport>
    </div>
</template>

<style scoped>
@import url(./tooltip.css);
</style>

<script>
export default {
    name: "MToolTip",
    props: {
        text: {
            type: String,
            default: "",
        },
        show: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            toolTipPosition: "bottom",
            style: {
                left: "",
                top: "",
                right: "",
                bottom: "",
            },
            showToolTip: false,
        };
    },
    updated() {
        /**
         * Vị trí tooltip
         * @return không
         * author: NXHinh (30/08/2023)
         */
        let parentPosition = this.$refs.container.getBoundingClientRect();
        if (parentPosition.left + 50 > window.innerWidth) {
            this.toolTipPosition = "left";
            this.style.left = parentPosition.left - 10 + "px";
            this.style.top = parentPosition.bottom - this.$refs.container.offsetHeight / 2 + "px";
        } else {
            this.style.left = parentPosition.left + this.$refs.container.offsetWidth / 2 + "px";
            this.style.top = parentPosition.bottom + 15 + "px";
        }
    },
    computed: {
        visiable() {
            return this.showToolTip ? "tooltip__textbox--visiable" : "";
        },
    },
};
</script>
