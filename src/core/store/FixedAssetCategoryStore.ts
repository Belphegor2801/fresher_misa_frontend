import { defineStore } from "pinia";
import { FixedAssetCategoryRepository } from "@/core";
import { FixedAssetCategory } from "@/core/entities/FixedAssetCategory";

// import { fixedAssetCategories } from "@/core/fakeData";

const fixedAssetCategoryRepository = new FixedAssetCategoryRepository()

const FixedAssetCategoryStore = defineStore({
    id: "FixedAssetCategoryStore", 
    state: () => ({
        kind: null,
        error: null,
        loading: false,
        items: new Array<FixedAssetCategory>,
        codeList: new Array<Object>,
        nameList: new Array<Object>,
    }),
    getters: {
        getFixedAssetCategory: (state) => state.items,
    },
    actions: {
        /**
         * Lấy danh sách bản ghi
         * @return không
         * createdBy: NXHinh (20/09/2023)
         */
        async get() {
            this.loading = true;
    
            try {
                this.items = await fixedAssetCategoryRepository.get();
                // this.items = fixedAssetCategories
            }
            catch (err: any){
                this.error = err.data
            }
            finally {
                this.loading = false
            }
        },

        /**
         * Lấy dropdownOptions
         * @return không
         * createdBy: NXHinh (20/09/2023)
         */
        getDropdownOptions() {
            this.codeList = this.items.map((item => {
                return {id: item.fixed_asset_category_id, label: item.fixed_asset_category_code}
            }));
            this.nameList = this.items.map((item => {
                return {id: item.fixed_asset_category_id, label: item.fixed_asset_category_name}
            }));
        },
    }
});

export default FixedAssetCategoryStore;