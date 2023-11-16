import { Pagination } from './common/pagination';
import { defineStore } from "pinia";
import { FixedAssetRepository } from "@/core";
import { FixedAsset } from "@/core/entities/FixedAsset";

import { MHelper } from "@/resources/helper";
import { MResource } from "@/resources/resources";

import { excelOptionsObject } from "@/resources/fixedAssetExcelObject";

const Resource = MResource["VN"];
const itemRepository = new FixedAssetRepository()

const FixedAssetStore = defineStore({
    id: "FixedAssetStore", 
    state: () => ({
        kind: null,
        error: null,
        loading: false,
        items: new Array<FixedAsset>,
        selected: [],

        // 
        totalQuantity: 0,
        totalCost: 0,
        totalAccumulatedDepreciation: 0,
        totalRemainingValue: 0,

        // filter
        searchText: "",
        categoryFilter: "",
        departmentFilter: "",
        itemsNotInclude: "",

        year: MHelper.getCurrentYear(),

        // paging
        totalRecords: 0,
        recordPerPage: 20,
        page: 1,
        sortField: "modified_date",
        sortType: "DESC",
        recordPerPageList: [
            {label: 20,},
            {label: 50,},
            {label: 100,},
            {label: 200,},
            {label: 500,},
        ],

        // itemForm
        formMode: 0,
        formOpen: false,
        itemId: "",
        item: new FixedAsset(),

        pagination: new Pagination(),
    }),
    getters: {
        getFormMode: (state) => state.formMode,
        getFixedAsset: (state) => state.item,
        getFixedAssets: (state) => state.items,
        getMaxPage: (state) => Math.ceil(state.pagination.totalRecords / state.pagination.recordPerPage),
        getRecordPerPageList: (state) => state.pagination.recordPerPageList,
        /**
         * Tạo paging object
         * @return không
         * createdBy: NXHinh (20/09/2023)
         */
        getPagingObject: (state) => {
            return {
                Limit: state.pagination.recordPerPage,
                Offset: ((state.pagination.page - 1) * state.pagination.recordPerPage),
                SortField: state.sortField.toString(),
                SortType: state.sortType.toString(),
                Filter: [
                    {
                        Field: "department_name",
                        Value: state.departmentFilter.toString(),
                        OperatorType: "LIKE",
                    },
                    {
                        Field: "fixed_asset_category_name",
                        Value: state.categoryFilter.toString(),
                        OperatorType: "LIKE",
                    },
                    {
                        Field: "fixed_asset_id",
                        Value: state.itemsNotInclude.toString(),
                        OperatorType: "NOT",
                    },
                ],
                Search: [
                    {
                        Field: "fixed_asset_name",
                        Value: state.searchText.toString(),
                        OperatorType: "LIKE",
                    },
                    {
                        Field: "fixed_asset_code",
                        Value: state.searchText.toString(),
                        OperatorType: "LIKE",
                    },
                ]
            }
        }
    },
    actions: {
        /**
         * Làm mới trạng thái item
         * @return không
         * createdBy: NXHinh (20/09/2023)
         */
        async newItem() {
            this.item = new FixedAsset();
            this.item.tracked_year = this.year
        },

        /**
         * Làm mới trạng thái item
         * @return không
         * createdBy: NXHinh (20/09/2023)
         */
        async getNewCode() {
            try {
                this.item.fixed_asset_code = await itemRepository.getNewCode();
            }
            catch (err: any){
                this.error = err.data
            }
        },

        /**
         * Lấy danh sách bản ghi
         * @return không
         * createdBy: NXHinh (20/09/2023)
         */
        async get() {
            this.loading = true;
    
            try {
                var pagingObject = this.getPagingObject;
                this.items = await itemRepository.get(pagingObject );
            }
            catch (err: any){
                this.error = err.data
            }
            finally {
                this.loading = false
            }
        },

        /**
         * Lấy tổng số bản ghi
         * @return không
         * createdBy: NXHinh (20/09/2023)
         */
        async getTotalRecords() {
            this.loading = true;
    
            try {
                var pagingObject = this.getPagingObject;
                var totalRecords = await itemRepository.getTotalRecords(pagingObject);
                this.totalRecords = totalRecords;
                this.pagination.totalRecords = totalRecords;
            }
            catch (err: any){
                this.error = err.data
            }
            finally {
                this.loading = false
            }
        },

        /**
         * :ấy 1 bản ghi theo id
         * @return không
         * createdBy: NXHinh (20/09/2023)
         */
        async getById(id: string) {
            this.loading = true;
    
            try {
                this.item = await itemRepository.getById(id);
            }
            catch (err: any){
                this.error = err.data
            }
            finally {
                this.loading = false
            }
        },

        /**
         * Export to Excel
         * @return không
         * createdBy: NXHinh (20/09/2023)
         */
        async exportToExcel() {
            this.loading = true;
    
            try {
                var pagingObject = this.getPagingObject;
                var response = await itemRepository.exportToExcel(pagingObject, excelOptionsObject);

                const fileUrl = window.URL.createObjectURL(
                    new Blob([response], {
                        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    })
                );

                // tên file tải xuống
                let fileName = Resource.ExcelExport.FileName + MHelper.getFormatCurrentDate() + ".xlsx";

                // tạo link tải xuống file excel và click vào link
                const link = document.createElement("a");
                link.href = fileUrl;
                link.setAttribute("download", fileName);
                document.body.appendChild(link);
                link.click();
                window.URL.revokeObjectURL(fileUrl);
                document.body.removeChild(link);
                        }
            catch (err: any){
                this.error = err.data
            }
            finally {
                this.loading = false
            }
        },

        /**
         * Thêm mới 1 bản ghi
         * @return không
         * createdBy: NXHinh (20/09/2023)
         */
        async add() {
            this.loading = true;
            try {
                await itemRepository.add(this.item);
            }
            catch (err: any){
                this.error = err.data
            }
            finally {
                this.loading = false
            }
        },

        /**
         * Chỉnh sửa 1 bản ghi
         * @return không
         * createdBy: NXHinh (20/09/2023)
         */
        async update() {
            this.loading = true;
            try {
                await itemRepository.update(this.itemId, this.item);
            }
            catch (err: any){
                this.error = err.data
            }
            finally {
                this.loading = false
            }
        },
    
        /**
         * Xóa 1 bản ghi
         * @return không
         * createdBy: NXHinh (20/09/2023)
         */
        async delete(itemId: string) {
            this.loading = true;
            try {
                await itemRepository.delete(itemId);
            }
            catch (err: any){
                this.error = err.data
            }
            finally {
                this.loading = false
            }
        },
    
        /**
         * Xóa nhiều bản ghi
         * @return không
         * createdBy: NXHinh (20/09/2023)
         */
        async deleteMany(itemIds: string[]) {
            this.loading = true;
    
            try {
                await itemRepository.deleteMany(itemIds);
            }
            catch (err: any){
                this.error = err.data
            }
            finally {
                this.loading = false
            }
        },

        /**
         * Tính toán các thông số tổng
         * @return không
         * createdBy: NXHinh (20/09/2023)
         */
        calculateTotal() {
            this.totalQuantity = 0,
            this.totalCost = 0,
            this.totalAccumulatedDepreciation = 0,
            this.totalRemainingValue = 0,
            this.items.forEach(item => {
                this.totalQuantity += item.quantity;
                this.totalCost += item.cost;
                this.totalAccumulatedDepreciation += item.accumulated_depreciation;
                this.totalRemainingValue += item.remaining_value;
            });
        },
    }

});

export default FixedAssetStore;