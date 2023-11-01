<template>
    <div id="sidebar" class="sidebar" :class="[isCollapse ? 'collapse' : '']">
        <div class="sidebar__home"
            @click="handleClick('/', 0)">
            <i class="icon--36 icon--home"></i>
            <div class="sidebar--title">{{ this.$MResource.Sidebar.AppName }}</div>
        </div>
        <ul class="sidebar__menu--container">
            <li v-for="(route, index) in sidebarRouters"
                v-bind:key="route.index"
                @mouseover="mouseOver(route.index)"
                @mouseout="mouseOut">
                <router-link :to="route.path"
                    class="sidebar__menu--item"
                    >
                    <i class="icon--24 icon--button fill-gray" :class="route.icon"></i>
                    <div class="sidebar__menu--text">
                        {{ route.title }}
                        <i v-if="route.children && routeShowChildren[index]" class="icon--20 icon--angle-up fill-white"
                            @click="handleShowSubRoute($event, index)"
                        ></i>
                        <i v-if="route.children && !routeShowChildren[index]" class="icon--20 icon--angle-down fill-white"
                            @click="handleShowSubRoute($event, index)"
                        ></i>
                    </div>
                    <div class="sidebar__menu--tooltip">
                        <p>{{ route.title }}</p>
                    </div>
                </router-link>


                <div v-if="route.children && !isCollapse && routeShowChildren[index]" class="sidebar__menu--sub-item-container">
                    <li v-for="child in route.children" v-bind:key="child">
                        <router-link :to="child.path" active-class="exact-active"
                            class="sidebar__menu--sub-item">
                            <i v-if="this.$route.name == child.name" class="icon--20 icon--route-exact-active"></i>
                            <i v-else class="icon--20 icon--none"></i>
                            {{ child.title }}
                        </router-link>
                    </li>    
                </div>

            </li>
        </ul>

        <div class="sidebar__footer">
            <i v-if="!isCollapse" @click="collapseSidebar" class="icon--24 icon--button icon--arrow-from-right"></i>
            <i v-else @click="extendSidebar" class="icon--24 icon--button icon--arrow-from-left"></i>
        </div>
    </div>
</template>

<script>
export default {
    name: "TheSidebar",
    mounted: function() {
        this.root = document.documentElement;
        this.root.style.setProperty("--width-sidebar", "55px");
    },

    methods: {
        /**
         * Thu gọn sidebar
         * @return không
         * author: NXHinh (18/08/2023)
         */
        collapseSidebar() {
            this.root.style.setProperty("--width-sidebar", "55px");
            this.isCollapse = true;
        },
        /**
         * Mở rộng sidebar
         * @return không
         * author: NXHinh (18/08/2023)
         */
        extendSidebar() {
            this.root.style.setProperty("--width-sidebar", "210px");
            this.isCollapse = false;
        },
        /**
         * Trả lại trạng thái button trên sidebar khi bỏ hover
         * @return không
         * author: NXHinh (30/08/2023)
         */
        mouseOut() {
            this.activeClass = "active"
            this.pageActive = this.$route.meta.index
        },
        /** 
         * Chuyển active sang button hiện đang 
         * @param {index}: index của route tương ứng với nút
         * @return không
         * author: NXHinh (30/08/2023)
         */
        mouseOver(index) {
            this.activeClass =  ""
            this.pageActive = index
        },
        /** 
         * Xử lý hiện thị Sidebar con
         * @param {index}: index của route tương ứng với nút
         * @return không
         * author: NXHinh (18/09/2023)
         */
        handleShowSubRoute(event, index) {
            event.preventDefault();
            this.routeShowChildren[index] = !this.routeShowChildren[index]
        },
    },
    data() {
        return {
            pageActive: this.$route.meta.index,
            activeClass: "active",
            isCollapse: true,

            sidebarRouters: [
                {
                    path: "/overview",
                    icon: "icon--general",
                    index: this.$PageViewEnum.Overview,
                    title: this.$MResource.Sidebar.Overview
                },
                {
                    path: "/assets",
                    icon: "icon--asset",
                    index: this.$PageViewEnum.AssetList,
                    title: this.$MResource.Sidebar.AssetList,
                    children: [
                        {
                            path: "/assets/1", title: "Ghi tăng", name: "AssetTransfer1"
                        },
                        {
                            path: "/assets/2", title: "Thay đổi thông tin", name: "AssetTransfer2"
                        },
                        {
                            path: "/assets/3", title: "Đánh giá lại", name: "AssetTransfer3"
                        }
                        ,{
                            path: "/assets/transfer", title: "Điều chuyển tài sản", name: "AssetTransfer"
                        },
                        {
                            path: "/assets/4", title: "Đề nghị xử lý", name: "AssetTransfer4"
                        },
                        {
                            path: "/assets/5", title: "Ghi giảm", name: "AssetTransfer5"
                        },
                        {
                            path: "/assets/6", title: "Tính khấu hao", name: "AssetTransfer6"
                        },
                        {
                            path: "/assets/7", title: "Tính hao mòn", name: "AssetTransfer7"
                        },
                        {
                            path: "/assets/8", title: "Kiểm kê", name: "AssetTransfer8"
                        },
                        
                    ],
                },
                {
                    path: "/specialassets",
                    icon: "icon--asset-2",
                    index: this.$PageViewEnum.SpecialAssets,
                    title: this.$MResource.Sidebar.SpecialAssets,
                    children: [],
                },
                {
                    path: "/tools",
                    icon: "icon--tool",
                    index: this.$PageViewEnum.Tools,
                    title: this.$MResource.Sidebar.Tools,
                    children: [],
                },
                {
                    path: "/category",
                    icon: "icon--category",
                    index: this.$PageViewEnum.Category,
                    title: this.$MResource.Sidebar.Category
                },
                {
                    path: "/search",
                    icon: "icon--search",
                    index: this.$PageViewEnum.Search,
                    title: this.$MResource.Sidebar.Search,
                    children: [],
                },
                {
                    path: "/report",
                    icon: "icon--report",
                    index: this.$PageViewEnum.Report,
                    title: this.$MResource.Sidebar.Report,
                    children: [],
                },
            ],

            routeShowChildren: new Array(7).fill(false)
        }
    },
}
</script>

<style scoped>
    @import url(./sidebar.css);
</style>