// import { excelOptionsObject } from '@/resources/fixedAssetExcelObject';
import { FixedAsset } from "../entities/FixedAsset.ts";
import { BaseRepository } from "./BaseRepository.ts";
import baseApi from "./BaseApi.ts";

export class FixedAssetRepository extends BaseRepository<FixedAsset>{
    constructor() {
        super("fixed-assets")
    }

    /**
     * Lấy tổng số bản ghi
     * @param {paramObj}: object
     * @return tổng số bản ghi
     * createdBy: NXHinh (29/09/2023)
     */
    async getTotalRecords(paramObj?: Object) {
        var paramObjString = "";
        paramObjString = "?filterJson=" + JSON.stringify(paramObj);
        return await baseApi.get(`${this.resource}/totalRecords${paramObjString}`).then(res => res.data);
    }

    /**
     * Lấy code mới
     * @return new code
     * createdBy: NXHinh (29/09/2023)
     */
    async getNewCode(){
        return await baseApi.get(`${this.resource}/codes/new`).then(res => res.data);
    }

    /**
     * Xuất file excel
     * @param {paramObj}: Object Filter
     * @param {excelOptionsObject}: Object Excel options
     * @return file excel
     * createdBy: NXHinh (29/09/2023)
     */
    async exportToExcel(paramObj?: Object, excelOptionsObj?: Object){
        var paramObjString = "";
        paramObjString = "?filterJson=" + JSON.stringify(paramObj) + "&excelOptionsJson=" + JSON.stringify(excelOptionsObj);
        return await baseApi.get(
            `${this.resource}/excel${paramObjString}`,
            { responseType: "blob" }
        ).then(res => res.data);
    }
}