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
    async getDetailsAll(){
        const url = `${this.resource}/details`
        return await baseApi.get(url).then(res => res.data);
    }

    /**
     * Lấy danh sách chứng từ theo fixed_asset_id
     * @param {fixed_asset_id}: id của tài sản
     * @return danh sách chứng từ
     * createdBy: NXHinh (08/11/2023)
     */
    async getByFixedAssetId(fixed_asset_id: String) {
        const url = `${this.resource}/getByFixedAssetIdAfterDate?fixed_asset_id=${fixed_asset_id}`
        return await baseApi.get(url).then(res => res.data);
    }

    /**
     * Lấy danh sách chứng từ theo fixed_asset_id sau 1 ngày chỉ định
     * @param {fixed_asset_id}: id của tài sản
     * @param {date}: ngày được chọn
     * @return danh sách chứng từ
     * createdBy: NXHinh (08/11/2023)
     */
    async getByFixedAssetIdAfterDate(fixed_asset_id: String, date: Date) {
        const url = `${this.resource}/getByFixedAssetIdAfterDate?fixed_asset_id=${fixed_asset_id}&date=${date}`;
        return await baseApi.get(url).then(res => res.data);
    }

    /**
     * Gọi api thêm 1 bản ghi
     * @param {json}: data json
     * @return response sau khi thêm
     * createdBy: NXHinh (17/10/2023)
     */
    async addDocument(json: String) {
        return await baseApi.post<any, boolean>(`${this.resource}`, json);
    }

    /**
     * Gọi api cập nhật 1 bản ghi
     * @param {json}: data json
     * @return response sau khi thêm
     * createdBy: NXHinh (17/10/2023)
     */
    async updateDocument(json: String) {
        return await baseApi.put<any, boolean>(`${this.resource}`, json);
    }
}