import baseApi from "./BaseApi";
import { IRepository } from './IRepository.ts';
import { MHelper } from '@/resources/helper.ts';

export abstract class BaseRepository<TEntity> implements IRepository<TEntity>{
    readonly resource;

    constructor(resource: string) {
        this.resource = resource;
    }

    /**
     * Gọi api lấy danh sách bản ghi
     * @param {paramObj}: string 
     * @return danh sách thực thể
     * createdBy: NXHinh (17/09/2023)
     */
    async get(paramObj?: Object) {
        var paramObjString = "";
        // if (paramObj != undefined){
        //     paramObjString += "?";
        //     Object.getOwnPropertyNames(paramObj).forEach(p => {
        //         if ((p != "filter") && (p != "search")){
        //             paramObjString += p + '=' + (paramObj as any)[p] + "&"
        //         }
        //     });
        //     paramObjString += JSON.stringify((paramObj as any)["search"]);
        //     paramObjString += "&" + JSON.stringify((paramObj as any)["filter"]);
        // }
        if (paramObj)
            paramObjString = "?filterJson=" + JSON.stringify(paramObj)
        
        return await baseApi.get(`${this.resource}${paramObjString}`).then(res => res.data);
    }

    /**
     * Gọi api lấy 1 bản ghi theo id
     * @param {itemId}: string 
     * @return thực thể lấy được
     * createdBy: NXHinh (17/09/2023)
     */
    async getById(itemId: string) {
        let item = await baseApi.get(`${this.resource}/${itemId}`).then(res => res.data);
        return item;
    }

    /**
     * Gọi api thêm 1 bản ghi
     * @param {item}: TEntity
     * @return response sau khi thêm
     * createdBy: NXHinh (17/09/2023)
     */
    async add(item: TEntity) {
        return await baseApi.post<any, boolean>(`${this.resource}`, item);
    }

    /**
     * Gọi api cập nhật 1 bản ghi
     * @param {itemId}: string
     * @param {item}: TEntity
     * @return response sau khi sửa
     * createdBy: NXHinh (17/09/2023)
     */
    async update(itemId: string, item: TEntity) {
        return await baseApi.put<any, boolean>(`${this.resource}/${itemId}`, item);
    }
    
    /**
     * Gọi api xóa 1 bản ghi
     * @param {itemId}: string
     * @return response sau khi xóa
     * createdBy: NXHinh (17/09/2023)
     */
    async delete(itemId: string) {
        return await baseApi.delete<any, boolean>(`${this.resource}/${itemId}`);
    }

    /**
     * Gọi api xóa nhiều bản ghi
     * @param {itemIds}: string[] - danh sách id
     * @return response sau khi xóa
     * createdBy: NXHinh (17/09/2023)
     */
    async deleteMany(itemIds: string[]) {
        return await baseApi.delete<any, boolean>(`${this.resource}`, {data: itemIds});
    }
}