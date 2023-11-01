import { createRouter, createWebHistory } from "vue-router";
import { h } from 'vue'
import { RouterView } from 'vue-router'

import HomeIndex from "@/ui/views/Home.vue";
import OverviewIndex from "@/ui/views/Overview/index.vue";
import AssetManagementIndex from "@/ui/views/FixedAssetManagement/index.vue";
import AssetTransferTable from "@/ui/views/FixedAssetManagement/AssetTransferTable/AssetTransferTable.vue";
import AssetTransferForm from "@/ui/views/FixedAssetManagement/AssetTransferForm/AssetTransferForm.vue";
import AssetTransferSubForm from "@/ui/views/FixedAssetManagement/AssetTransferForm/AssetTransferSubForm.vue";

import { MEnum } from "@/resources/enum";

// Định nghĩa các router
const PageViewEnum = MEnum.PageView;

const routers = [
    {
        path:"/", name:"HomeRouter", component:HomeIndex, 
        meta: {
            index: PageViewEnum.HomePage,
        }
    },
    {
        path:"/overview", name:"GeneralRouter", component: OverviewIndex,
        meta: {
            index: PageViewEnum.OverView,
        }
    },
    {
        path:"/assets", name:"AssetListRouter", component: { render: () => h(RouterView) },
        meta: {
            index: PageViewEnum.AssetList,
        },
        children: [
            {path: '', name: 'AssetListIndex', component: AssetManagementIndex,},
            {
                path: 'transfer', name: 'AssetTransfer', component: AssetTransferTable,
                
            },
            {path: 'increase', name: 'AssetIncrease', component: AssetTransferTable,},
            {path: 'decrease', name: 'AssetDecrease', component: AssetTransferTable,},
            {path: '1', name: 'AssetTransfer1', component: AssetTransferTable,},
            {path: '2', name: 'AssetTransfer2', component: AssetTransferTable,},
            {path: '3', name: 'AssetTransfer3', component: AssetTransferTable,},
            {path: '4', name: 'AssetTransfer4', component: AssetTransferTable,},
            {path: '5', name: 'AssetTransfer5', component: AssetTransferTable,},
            {path: '6', name: 'AssetTransfer6', component: AssetTransferTable,},
            {path: '7', name: 'AssetTransfer7', component: AssetTransferTable,},
            {path: '8', name: 'AssetTransfer8', component: AssetTransferTable,},
        ]
    },
    {
        path:"/assets/transfer/form", name:"AssetTransferIndex", component: { render: () => h(RouterView) },
        children: [
            {path:"", name:"AssetTransferForm", component: AssetTransferForm,},
            {path:"add_assets", name:"AssetTransferFormAdd", component: AssetTransferSubForm,}
        ]
    },
    {
        path:"/category", name:"CategoryRouter", component: OverviewIndex,
        meta: {
            index: PageViewEnum.Category,
        }
    },
    {
        path:"/search", name:"SearchRouter", component: OverviewIndex,
        meta: {
            index: PageViewEnum.Search,
        }
    },
    {
        path:"/specialassets", name:"SpecialAssetRouter", component: OverviewIndex,
        meta: {
            index: PageViewEnum.SpecialAssets,
        }
    },
    {
        path:"/tools", name:"ToolsRouter", component: OverviewIndex,
        meta: {
            index: PageViewEnum.Tools,
        }
    },
    {
        path:"/report", name:"ReportRouter", component: OverviewIndex,
        meta: {
            index: PageViewEnum.Report,
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routers
});

export default router;