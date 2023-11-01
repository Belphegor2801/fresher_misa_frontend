// import { excelOptionsObject } from '@/resources/fixedAssetExcelObject';
import { TransferDocument } from "../entities/TransferDocument.ts";
import { BaseRepository } from "./BaseRepository.ts";
import baseApi from "./BaseApi.ts";

export class TransferDocumentRepository extends BaseRepository<TransferDocument>{
    constructor() {
        super("transfer-document")
    }

    /**
     * Lấy tổng số bản ghi
     * @param {paramObj}: object
     * @return tổng số bản ghi
     * createdBy: NXHinh (25/10/2023)
     */
    async getTotalRecords(paramObj?: Object) {
        var paramObjString = "";
        paramObjString = "?filterJson=" + JSON.stringify(paramObj);
        return await baseApi.get(`${this.resource}/totalRecords${paramObjString}`).then(res => res.data);
    }

    /**
     * Lấy code mới
     * @return new code
     * createdBy: NXHinh (25/10/2023)
     */
    async getNewCode(){
        return await baseApi.get(`${this.resource}/codes/new`).then(res => res.data);
    }

    /**
     * Lấy chi tiết tài sản điều chuyển
     * @return danh sách tài sản
     * createdBy: NXHinh (25/10/2023)
     */
    async getDetails(document_id: String, paramObj?: Object){
        var paramObjString = "";
        if (paramObj)
            paramObjString = "filterJson=" + JSON.stringify(paramObj)
        const url = `${this.resource}/details?document_id=${document_id}&${paramObjString}`
        return await baseApi.get(url).then(res => res.data);
    }

    /**
     * Lấy chi tiết tài sản điều chuyển
     * @return danh sách tài sản
     * createdBy: NXHinh (25/10/2023)
     */
    async getDetailsAll(document_id: String){
        const url = `${this.resource}/details`
        return await baseApi.get(url).then(res => res.data);
    }

    /**
     * Gọi api thêm 1 bản ghi
     * @param {item}: TEntity
     * @return response sau khi thêm
     * createdBy: NXHinh (17/09/2023)
     */
    async addDocument(json: String) {
        return await baseApi.post<any, boolean>(`${this.resource}`, json);
    }
}