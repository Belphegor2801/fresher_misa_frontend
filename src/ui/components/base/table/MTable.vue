<template>
        <div class="table-container" ref="assetsTable">
            <Teleport to="#app">
                <h-loading v-if="false"></h-loading>
            </Teleport>
            <table class="table--asset-list">
                <thead>
                    <slot name="table--header"></slot>
                </thead>
                <div class="table__empty" v-if="this.items.length == 0">
                    <div class="table__empty--text" > {{ this.$MResource.AssetTable.AssetTableEmpty }}</div>
                </div>
                <tbody v-else>
                    <slot name="table--body"></slot>
                </tbody>
                <tfoot>
                    <slot name="table--footer"></slot>
                </tfoot>
            </table> 
        </div>
</template>

<script>
    export default {
        name: "MTable",
        props: {
            store: {
                type: Object,
            },
            items: {
                type: Array,
            }
        }
    }
</script>

<style>
    @import url(./table.css);
</style>