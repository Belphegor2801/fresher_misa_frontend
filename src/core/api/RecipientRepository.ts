import { Recipient } from "../entities/Recipient.ts";
import { BaseRepository } from "./BaseRepository.ts";
import baseApi from "./BaseApi.ts";

export class RecipientRepository extends BaseRepository<Recipient>{
    constructor() {
        super("recipient")
    }

    /**
     * Lấy danh sách thông tin giao nhận theo document_id
     * @param {document_id}: id của tài sản
     * @return danh sách thông tin giao nhận
     * createdBy: NXHinh (08/11/2023)
     */
    async getByDocumentId(document_id: String) {
        const url = `${this.resource}/getByDocumentId?document_id=${document_id}`
        return await baseApi.get(url).then(res => res.data);
    }

    /**
     * Lấy danh sách thông tin giao nhận cuối cùng
     * @return danh sách thông tin giao nhận
     * createdBy: NXHinh (15/11/2023)
     */
    async getLast() {
        const url = `${this.resource}/getLast`;
        return await baseApi.get(url).then(res => res.data);
    }
}