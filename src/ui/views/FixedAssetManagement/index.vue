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
    ></AssetForm>
</template>

<script>
    import AssetList from "./AssetList/AssetList.vue";
    import AssetForm from "./AssetForm/AssetForm.vue";
    import FixedAssetStore from "@/core/store/FixedAssetStore.ts";
    import DepartmentStore from "@/core/store/DepartmentStore.ts";
    import FixedAssetCategoryStore from "@/core/store/FixedAssetCategoryStore.ts";

    export default {
        name: "AssetManagerIndex",
        components: {AssetList, AssetForm},

        setup () {
            const departmentStore = DepartmentStore();
            const fixedAssetCategoryStore = FixedAssetCategoryStore();
            const fixedAssetStore = FixedAssetStore();
            
            return {fixedAssetStore, departmentStore, fixedAssetCategoryStore}
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