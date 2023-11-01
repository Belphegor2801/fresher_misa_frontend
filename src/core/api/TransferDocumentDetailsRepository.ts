// import { excelOptionsObject } from '@/resources/fixedAssetExcelObject';
import { TransferDocumentDetails } from "../entities/TransferDocumentDetails.ts";
import { BaseRepository } from "./BaseRepository.ts";
import baseApi from "./BaseApi.ts";

export class TransferDocumentDetailsRepository extends BaseRepository<TransferDocumentDetails>{
    constructor() {
        super("transfer-document-details")
    }

    /**
     * Lấy tổng số bản ghi
     * @param {paramObj}: object
     * @return tổng số bản ghi
     * createdBy: NXHinh (25/10/2023)
     */
    async getTotalRecords(document_id: string, paramObj?: Object) {
        var paramObjString = "";
        paramObjString = "filterJson=" + JSON.stringify(paramObj);
        return await baseApi.get(`${this.resource}/totalRecordsByDocumentId?document_id=${document_id}&${paramObjString}`).then(res => res.data);
    }
}