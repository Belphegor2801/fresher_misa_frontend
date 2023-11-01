import { defineStore } from "pinia";

const InfoDialogStore = defineStore({
    id: "InfoDialogStore",
    state: () => ({
        message: "",
        buttonText: "",
        show: false,
    }),
    actions: {
    }
})

export default InfoDialogStore;