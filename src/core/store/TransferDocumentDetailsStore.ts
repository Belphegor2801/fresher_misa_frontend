import { defineStore } from "pinia";
import { TransferDocumentRepository } from "@/core";
import { TransferDocumentDetailsRepository } from "@/core";
import { TransferDocumentDetails } from "@/core/entities/TransferDocumentDetails";

import { MHelper } from "@/resources/helper";
// import { MResource } from "@/resources/resources";

import Pagination from "./common/pagination";

// const Resource = MResource["VN"];

const transferDocumentRepository = new TransferDocumentRepository()
const itemRepository = new TransferDocumentDetailsRepository()


// class DepartmentInfo {
//     currentDepartment: string;
//     newDepartment: string;

//     constructor (
//         currentDepartment: string,
//         newDepartment: string
//     ) {
//         this.currentDepartment = currentDepartment;
//         this.newDepartment = newDepartment;
//     }
// }


const TransferDocumentDetailsStore = defineStore({
    id: "TransferDocumentDetailsStore", 
    state: () => ({
        kind: null,
        error: null,
        loading: false,
        selected: [],

        tempSelected: [],

        document_id: "",
        items: new Array<TransferDocumentDetails>,

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
    }),
    getters: {
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
                ]
            }
        }
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
                var pagingObject = this.getPagingObject;
                this.items = await transferDocumentRepository.getDetails(this.document_id, pagingObject);
            }
            catch (err: any){
                this.error = err.data
            }
            finally {
                this.loading = false
            }
        },

        /**
         * Lấy toàn bộ danh sách
         * @return không
         * createdBy: NXHinh (20/09/2023)
         */
        async getAll() {
            this.loading = true;
    
            try {
                var pagingObject = this.getPagingObject;
                pagingObject.Limit = 1000000
                this.items = await transferDocumentRepository.getDetailsAll(this.document_id);
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
                this.pagination.totalRecords = await itemRepository.getTotalRecords(this.document_id, pagingObject);
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
        async add(item: TransferDocumentDetails) {
            this.loading = true;
            try {
                await itemRepository.add(item);
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
        async update(itemId: string, item: TransferDocumentDetails) {
            this.loading = true;
            try {
                await itemRepository.update(itemId, item);
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

export default TransferDocumentDetailsStore;