<template>
    <div class="context-menu" :style="style" v-click-outside="clickOutSide">
        <div class="context-menu__item" @click="addItem" v-if="tool.add">
            <i class="icon--18 icon--add"></i>
            <span>{{ $MResource.ContextMenu.Add }}</span>
        </div>
        <div class="context-menu__item" @click="editItem" v-if="tool.edit">
            <i class="icon--18 icon--edit"></i>
            <span>{{ $MResource.ContextMenu.Edit }}</span>
        </div>
        <div class="context-menu__item" @click="deleteItem" v-if="tool.delete">
            <i class="icon--18 icon--delete"></i>
            <span>{{ $MResource.ContextMenu.Delete }}</span>
        </div>
        <div class="context-menu__item" @click="duplicateItem" v-if="tool.duplicate">
            <i class="icon--18 icon--duplicate"></i>
            <span>{{ $MResource.ContextMenu.Duplicate }}</span>
        </div>
    </div>
</template>

<style scoped>
@import url(./contextmenu.css);
</style>

<script>
export default {
    name: "MISAContextMenu",
    props: {
        // Tọa độ
        x: Number,
        y: Number,
        // context menu có hiển thị hay không
        show: {
            type: Boolean,
            default: false,
        },
        // các công cụ có trong context menu
        tool: {
            add: false,
            edit: false,
            delete: false,
            duplicate: false,
        },
    },
    mounted() {
        this.getCoordinates();
    },

    data() {
        return {
            style: {
                left: "",
                top: "",
            },
        };
    },

    watch: {
        x() {
            this.getCoordinates();
        },
        y() {
            this.getCoordinates();
        },
    },

    methods: {
        /**
         * Xử lý khi bấm ra ngoài Context Menu
         * @return: không
         * Author: nxhinh (27/09/2023)
         */
        clickOutSide() {
            this.$emit("update:show", false);
        },
        /**
         * Xử lý khi bấm ra thêm tài sản
         * @return: không
         * Author: nxhinh (27/09/2023)
         */
        addItem() {
            this.$emit("add");
            this.$emit("update:show", false);
        },
        /**
         * Xử lý khi bấm ra sửa tài sản
         * @return: không
         * Author: nxhinh (27/09/2023)
         */
        editItem() {
            this.$emit("edit");
            this.$emit("update:show", false);
        },
        /**
         * Xử lý khi bấm ra xóa tài sản
         * @return: không
         * Author: nxhinh (27/09/2023)
         */
        deleteItem() {
            this.$emit("delete");
            this.$emit("update:show", false);
        },
        /**
         * Xử lý khi bấm ra nhân bản tài sản
         * @return: không
         * Author: nxhinh (27/09/2023)
         */
        duplicateItem() {
            this.$emit("duplicate");
            this.$emit("update:show", false);
        },
        /**
         * Đặt toạ độ cho context menu
         * @return: không
         * Author: nxhinh (27/09/2023)
         */
        getCoordinates() {
            let x = this.x;
            if (this.x + 150 > window.innerWidth) x = x - 150;
            this.style.left = x + "px";

            let y = this.y;
            if (this.y + 158 > window.innerHeight) y = y - 158;
            this.style.top = y + "px";
        },
    },
    
};
</script>
