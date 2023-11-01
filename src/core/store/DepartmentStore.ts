import { defineStore } from "pinia";
import { DepartmentRepository } from "@/core";
import { Department } from "@/core/entities/Department";

// import { departments } from "@/core/fakeData";

const departmentRepository = new DepartmentRepository()

const DDepartmentStore = defineStore({
    id: "DepartmentStore", 
    state: () => ({
        kind: null,
        error: null,
        loading: false,
        items: new Array<Department>,
        codeList: new Array<Object>,
        nameList: new Array<Object>,
    }),
    getters: {
        getDepartments: (state) => state.items,
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
                this.items = await departmentRepository.get();
                // this.items = departments
            }
            catch (err: any){
                this.error = err.data
            }
            finally {
                this.loading = false
            }
        },

        /**
         * Lấy dropdownOptions
         * @return không
         * createdBy: NXHinh (20/09/2023)
         */
        getDropdownOptions() {
            this.codeList = this.items.map((item => {
                return {id: item.department_id, label: item.department_code}
            }));
            this.nameList = this.items.map((item => {
                return {id: item.department_id, label: item.department_name}
            }));
        },
    }
});

export default DDepartmentStore;