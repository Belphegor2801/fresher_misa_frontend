import { defineStore } from "pinia";
import { MHelper } from "@/resources/helper";

import { MResource } from "@/resources/resources";
import { MEnum } from "@/resources/enum";

const Resource = MResource["VN"];


const ToastStore = defineStore({
    id: "ToastStore",
    state: () => ({
        toastList: new Array<Toast>,
    }),
    actions: {
        /**
         * Thêm toast mới
         * @return không
         * createdBy: NXHinh (30/09/2023)
         */
        newToast(type: number, message: string) {
            var id = MHelper.newGuid();
            // console.log("add: ", id);
            this.toastList.push(new Toast(id, type, message))
        },

        /**
         * Xóa toast
         * @return không
         * createdBy: NXHinh (30/09/2023)
         */
        closeToast(id: string) {
            this.toastList.splice(this.toastList.findIndex(function(toast: Toast){
                return toast.id === id;
            }), 1);
        },

        /**
         * Hiện thị Toast thông báo tính năng đang phát triển
         * @return không
         * author: NXHinh (18/08/2023)
         */
        onShowDevelopingToast() {
            this.newToast(MEnum.ToastType.Warning, Resource.ToastMessage.Developing);
        },
    } 
})


class Toast {
    id: string;
    type: number;
    message: string;

    constructor (
        id: string,
        type: number,
        message: string,
    ) {
        this.id = id;
        this.type = type;
        this.message = message;
    }
}

export default ToastStore;