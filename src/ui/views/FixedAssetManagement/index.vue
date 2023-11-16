<template>
    <AssetList 
        :store="fixedAssetStore"
        :departmentStore="departmentStore"
        :fixedAssetCategoryStore="fixedAssetCategoryStore"
        ref="assetList"
    >
    </AssetList>
    <AssetForm v-if="fixedAssetStore.formOpen"
        :store="fixedAssetStore"
        :departmentStore="departmentStore"
        :fixedAssetCategoryStore="fixedAssetCategoryStore"
        :transferDocumentStore = "transferDocumentStore"
    ></AssetForm>
</template>

<script>
    import AssetList from "./AssetList/AssetList.vue";
    import AssetForm from "./AssetForm/AssetForm.vue";
    import FixedAssetStore from "@/core/store/FixedAssetStore.ts";
    import DepartmentStore from "@/core/store/DepartmentStore.ts";
    import FixedAssetCategoryStore from "@/core/store/FixedAssetCategoryStore.ts";
    import TransferDocumentStore from "@/core/store/TransferDocumentStore.ts";

    export default {
        name: "AssetManagerIndex",
        components: {AssetList, AssetForm},

        setup () {
            const departmentStore = DepartmentStore();
            const fixedAssetCategoryStore = FixedAssetCategoryStore();
            const fixedAssetStore = FixedAssetStore();

            const transferDocumentStore = TransferDocumentStore();
            
            return {fixedAssetStore, departmentStore, fixedAssetCategoryStore, transferDocumentStore}
        },

        async beforeCreate() {
            await this.departmentStore.get()
            this.departmentStore.getDropdownOptions()

            await this.fixedAssetCategoryStore.get()
            this.fixedAssetCategoryStore.getDropdownOptions()
            
            await this.fixedAssetStore.get()
            this.fixedAssetStore.getTotalRecords()
        },
    }
</script>