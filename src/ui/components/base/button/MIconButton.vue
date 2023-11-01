<template>
    <button class="icon-button">
        <div class="icon--20 icon--button " :class=icon ></div>
    </button>
</template>

<script>
export default {
    name: "MIconButton",
    props: {
        // icon của button
        icon: {
            type: String,
            default: "",
        },
    },
}
</script>

<style scoped>
@import url(./button.css);
</style>