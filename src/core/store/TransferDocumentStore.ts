import { defineStore} from "pinia";
import useStore from "element-plus/es/components/table/src/store/index.mjs";
import { TransferDocumentRepository } from "@/core";
import { TransferDocument } from "@/core/entities/TransferDocument";
import { TransferDocumentDetails } from "@/core/entities/TransferDocumentDetails";

import { MHelper } from "@/resources/helper";
import { MResource } from "@/resources/resources";

import Pagination from "./common/pagination";

const Resource = MResource["VN"];
const itemRepository = new TransferDocumentRepository()


const TransferDocumentStore = defineStore({
    id: "TransferDocumentStore", 
    state: () => ({
        kind: null,
        error: null,
        loading: false,
        items: new Array<TransferDocument>,
        selected: [],

        // 
        totalCost: 0,
        totalRemainingValue: 0,

        // filter
        searchText: "",
        year: MHelper.getCurrentYear(),

        // paging
        sortField: "modified_date",
        sortType: "DESC",

        pagination: new Pagination(),

        // itemForm
        formMode: 0,
        formOpen: false,
        itemId: "",
        item: new TransferDocument(),
        itemDetails: new Array<TransferDocumentDetails>(),
    }),
    getters: {
        getFormMode: (state) => state.formMode,
        getTransferDocument: (state) => state.item,
        getTransferDocuments: (state) => state.items,
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
                ],
                Search: [
                    {
                        Field: "document_code",
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
            this.item = new TransferDocument();
            this.item.tracked_year = this.year
        },

        /**
         * Làm mới trạng thái item
         * @return không
         * createdBy: NXHinh (20/09/2023)
         */
        async getNewCode() {
            try {
                this.item.document_code = await itemRepository.getNewCode();
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
                this.pagination.totalRecords = await itemRepository.getTotalRecords(pagingObject);
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
         * Thêm mới 1 bản ghi
         * @return không
         * createdBy: NXHinh (20/09/2023)
         */
        async add(details: Array<any>) {
            this.loading = true;
            try {
                // Tạo danh sách tài sản thêm
                console.log(details)
                var asset_list: { fixed_asset_id: any; department_before_id: any; department_before_name: any; department_after_id: any; department_after_name: any; reason: any; }[] = [];
                
                details.forEach(item => {
                    asset_list.push({
                        fixed_asset_id: item.fixed_asset_id,
                        department_before_id: item.department_id,
                        department_before_name: item.department_name,
                        department_after_id: item.department_after_id,
                        department_after_name: item.department_after_name,
                        reason: item.reason,
                    });
                    this.item.cost += item.cost;
                    this.item.remaining_value += item.remaining_value;
                });

                let body = {
                    document_code: this.item.document_code,
                    transfer_date: this.item.transfer_date,
                    document_date: this.item.document_date,
                    cost: this.item.cost,
                    remaining_value: this.item.remaining_value,
                    tracked_year: this.item.tracked_year,
                    note: this.item.note,
                    fixed_asset_list: asset_list,
                };

                var bodyJson = JSON.stringify(body)

                console.log(bodyJson);

                await itemRepository.addDocument(bodyJson);
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
            this.totalCost = 0,
            this.totalRemainingValue = 0,
            this.items.forEach(item => {
                this.totalCost += item.cost;
                this.totalRemainingValue += item.remaining_value;
            });
        },
    }

});

export default TransferDocumentStore;