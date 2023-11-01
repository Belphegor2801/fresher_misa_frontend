<template>
    <div>
        <div class="dialog-container" v-on:keydown.escape="onShowDialog()">
            <div class="dialog-background"></div>
            <form novalidate id="asset-form" class="asset-form-container"
                :class="{ 'submitted': submitted }"
                v-on:submit.prevent>
                <div class="asset-form__header">
                    <i class="icon--36 icon--button icon--close asset-form__header--icon" 
                        @click="onCloseAssetForm">
                    </i>
                    <p class="asset-form__header--title">{{formName}}</p>
                </div>
                <table class="table--asset-form asset-form__table">
                    <tbody>
                        <tr>
                            <td class="">
                                <m-input
                                    :label=this.$MResource.Form.FormInputLabel.AssetId
                                    name="fixed_asset_id" 
                                    ref="fixed_asset_id"
                                    type="text"  
                                    id="fixed_asset_id"
                                    :customValidity=this.$MResource.Form.InvalidInput.Required
                                    :tabindex="11"
                                    v-on:keyup.enter="nextFocus('fixed_asset_name')"
                                    v-model:valueInput=store.item.fixed_asset_code
                                    :required="true"
                                    :focus="true"> 
                                </m-input>
                            </td>
                            <td colspan="2">
                                <m-input
                                    :label=this.$MResource.Form.FormInputLabel.AssetName
                                    name="fixed_asset_name" 
                                    ref="fixed_asset_name"
                                    type="text"
                                    v-on:keyup.enter="nextFocus('department_code')"
                                    :tabindex="12"
                                    :placeholder=this.$MResource.Form.FormInputLabel.AssetName
                                    v-model:valueInput=store.item.fixed_asset_name
                                    :required="true">
                                </m-input>
                            </td>
                        </tr>
                        <tr>
                            <td class="">
                                <m-combo-box
                                    type="input"
                                    ref="department_code"
                                    v-on:keyup.enter="nextFocus('fixed_asset_category_code')"
                                    :label=this.$MResource.Form.FormInputLabel.AssetDepartmentId
                                    :tabindex="13"
                                    :placeholder=this.$MResource.Form.FormInputLabel.AssetDepartmentId
                                    :required="true"
                                    v-model:valueInput=store.item.department_code
                                    :options=this.departmentStore.codeList >
                                </m-combo-box>
                            </td>
                            <td colspan="2">
                                <m-input
                                    :label=this.$MResource.Form.FormInputLabel.AssetDepartmentName
                                    name="department_name"
                                    type="text"
                                    v-model:valueInput=store.item.department_name
                                    :disabled="true">
                                </m-input>
                            </td>
                        </tr>
                        <tr>
                            <td class="">
                                <m-combo-box
                                    type="input"
                                    ref="fixed_asset_category_code"
                                    v-on:keyup.enter="nextFocus('quantity')"
                                    :label=this.$MResource.Form.FormInputLabel.AssetTypeId
                                    :tabindex="14"
                                    :placeholder=this.$MResource.Form.FormInputLabel.AssetTypeId
                                    :required="true"
                                    v-model:valueInput=store.item.fixed_asset_category_code
                                    :options=this.fixedAssetCategoryStore.codeList > 
                                </m-combo-box>
                            </td>
                            <td colspan="2">
                                <m-input
                                    :label=this.$MResource.Form.FormInputLabel.AssetTypeName
                                    name="assetTypeName" 
                                    type="text"
                                    v-model:valueInput=store.item.fixed_asset_category_name
                                    :disabled="true">
                                </m-input>
                                
                            </td>
                        </tr>
                        <tr>
                            <td class="">
                                <m-input
                                    :label=this.$MResource.Form.FormInputLabel.AssetQuantity
                                    name="quantity"
                                    ref="quantity" 
                                    v-on:keyup.enter="nextFocus('cost')"
                                    type="number"
                                    formatType="int"
                                    :tabindex="15"
                                    :hasArrow="true"
                                    v-model:valueInput=store.item.quantity
                                    :required="true" > 
                                </m-input>
                            </td>
                            <td>
                                <m-input
                                    :label=this.$MResource.Form.FormInputLabel.AssetHistoricalCost
                                    name="cost" 
                                    ref="cost"
                                    v-on:keyup.enter="nextFocus('life_time')"
                                    type="number"
                                    :tabindex="16"
                                    formatType="int"
                                    v-model:valueInput=store.item.cost
                                    :required="true" > 
                                </m-input>
                            </td>
                            <td>
                                <m-input
                                    :label=this.$MResource.Form.FormInputLabel.AssetYearOfUse
                                    name="life_time" 
                                    formatType="int"
                                    type="number"
                                    ref="life_time"
                                    v-on:keyup.enter="nextFocus('depreciation_rate')"
                                    :tabindex="17"
                                    v-model:valueInput=store.item.life_time
                                    :required="true" >
                                </m-input>
                            </td>
                        </tr>
                        <tr>
                            <td class="">
                                <m-input
                                    :label=this.$MResource.Form.FormInputLabel.AssetDepreciationRate
                                    name="depreciation_rate" 
                                    type="number"
                                    ref="depreciation_rate"
                                    v-on:keyup.enter="nextFocus('purchase_date')"
                                    step="0.0001"
                                    formatType="float"
                                    :tabindex="18"
                                    :hasArrow="true"
                                    v-model:valueInput=store.item.depreciation_rate
                                    :required="true"
                                >
                                </m-input>
                            </td>
                            <td>
                                <m-input
                                    :label=this.$MResource.Form.FormInputLabel.AssetDepreciationValueYear
                                    name="depreciation_value_year" 
                                    type="number"
                                    ref="depreciation_value_year" 
                                    step="0.01"
                                    formatType="int"
                                    :tabindex="19"
                                    v-model:valueInput=store.item.depreciation_value_year
                                    :required="true"
                                > 
                                </m-input>
                            </td>
                            <td>
                                <m-input
                                    :label=this.$MResource.Form.FormInputLabel.AssetTrackYear
                                    name="tracked_year" 
                                    ref="tracked_year"
                                    type="number"
                                    :required="true"
                                    v-model:valueInput=store.item.tracked_year
                                    :disabled="true" > 
                                </m-input>
                            </td>
                        </tr>
                        <tr>
                            <td class="">
                                <m-datepicker
                                    :label=this.$MResource.Form.FormInputLabel.AssetPurchasedDate
                                    name="purchase_date" 
                                    ref="purchase_date"
                                    v-on:keyup.enter="nextFocus('start_using_date')"
                                    type="date"
                                    :tabindex="20"
                                    v-model:valueInput=store.item.purchase_date
                                    :required="true" > 
                                </m-datepicker>
                            </td>
                            <td>
                                <m-datepicker
                                    :label=this.$MResource.Form.FormInputLabel.AssetStartUsingDate
                                    name="start_using_date" 
                                    ref="start_using_date"
                                    v-on:keyup.enter="nextFocus('save_button')"
                                    type="date"
                                    :tabindex="21"
                                    v-model:valueInput=store.item.start_using_date
                                    :required="true" > 
                                </m-datepicker>
                            </td>
                        </tr>
                    </tbody>
                    
                </table>
                <div class="asset-form__footer">
                    <a></a>
                    <div class="asset-form__footer--buttons">
                        <m-pri-button 
                            type="button"
                            buttonClass="outline-button"
                            :tabindex="23"
                            text="Hủy" 
                            @click="onShowDialog"
                        ></m-pri-button>
                        <m-pri-button 
                            type="button"
                            buttonClass="main-button"
                            ref="save_button"
                            :tabindex="22"
                            text="Lưu"
                            @click="onSave"
                        ></m-pri-button>
                    </div>
                </div>
            </form>
        </div>

        <m-dialog v-if="showDialog && store.formMode==this.$MEnum.FormMode.Add" 
                :message="this.$MResource.Dialog.Add.Message"
                :buttonText="this.$MResource.Dialog.Add.BtnConfirm"
                :buttonFunction="onCloseAssetFormAndDialog">
                <template #outline-button>
                    <m-pri-button
                        buttonClass="outline-button"
                        :text="this.$MResource.Dialog.Add.BtnCancel"
                        @click="onHideDialog"
                    ></m-pri-button>
                </template> 
            </m-dialog>
            
            <m-dialog v-if="showDialog && (store.formMode==this.$MEnum.FormMode.Edit || store.formMode==this.$MEnum.FormMode.Duplicate)" 
                :message="this.$MResource.Dialog.Edit.Message"
                :buttonText="this.$MResource.Dialog.Edit.BtnSave"
                :buttonFunction="onSave">
                <template #outline-button>
                    <m-pri-button
                        buttonClass="outline-button"
                        :text="this.$MResource.Dialog.Add.BtnCancel"
                        @click="onHideDialog"
                    ></m-pri-button>
                </template> 
                <template #sub-button>
                    <m-pri-button
                        buttonClass="sub-button"
                        :text="this.$MResource.Dialog.Edit.BtnUnSave"
                        @click="onCloseAssetFormAndDialog"
                    ></m-pri-button>
                </template> 
            </m-dialog>
    </div>
</template>
    
<script>
    export default {
        name: "AssetForm",
        props: {
            store: {
                type: Object,
            },
            departmentStore: {
                type: Object,
            },
            fixedAssetCategoryStore: {
                type: Object,
            }
        },
    
        data() {
            return {
                submitted: false,
                showDialog: false,
                formName: this.store.formMode == this.$MEnum.FormMode.Add?
                    this.$MResource.Form.FormTitle.Add
                    : (this.store.formMode == this.$MEnum.FormMode.Edit?
                    this.$MResource.Form.FormTitle.Edit : this.$MResource.Form.FormTitle.Duplicate),
            }
        },

        mounted () {
            /**
             * Tự động focus
             * @return không
             * author: NXHinh (21/08/2023)
             */
            this.$refs.fixed_asset_id.focusOnInput();
        },

        watch: {
            /**
             * Lựa chọn mã loại tài sản
             * @param {val}: giá trị được lựa chọn
             * @return không
             * author: NXHinh (21/08/2023)
             */
            "store.item.fixed_asset_category_code": function(val) {
                try{
                    var item = this.store.item
                    for(var j = 0; j < this.fixedAssetCategoryStore.items.length; j++){
                        if (this.$refs.fixed_asset_category_code.valueOutput == this.fixedAssetCategoryStore.items[j].fixed_asset_category_code){
                            item.fixed_asset_category_name = this.fixedAssetCategoryStore.items[j].fixed_asset_category_name
                            item.fixed_asset_category_id = this.fixedAssetCategoryStore.items[j].fixed_asset_category_id
                            this.$refs.depreciation_rate.valueOutput = this.fixedAssetCategoryStore.items[j].depreciation_rate ?? 0
                            this.$refs.life_time.valueOutput = this.fixedAssetCategoryStore.items[j].life_time ?? 0
                            break
                        }  
                    }
                }
                catch (error){
                    console.log(error);
                }
            },

            /**
             * Lựa chọn bộ phận sử dụng
             * @param {val}: giá trị được lựa chọn
             * @return không
             * author: NXHinh (21/08/2023)
             */
            "store.item.department_code": function(val) {
                try {
                    var item = this.store.item
                    for(var j = 0; j < this.departmentStore.items.length; j++){
                        if (item.department_code == this.departmentStore.items[j].department_code)
                        {
                            item.department_id = this.departmentStore.items[j].department_id
                            item.department_name = this.departmentStore.items[j].department_name
                            break
                        }   
                    }
                }
                catch (error){
                    console.log(error);
                }
            },

            /**
             * Tự động tính toán các giá trị khi thay đổi nguyên giá
             * @param {val}: giá trị được lựa chọn
             * @return không
             * author: NXHinh (30/09/2023)
             */
            "store.item.cost": function(val) {
                var item = this.store.item
                if (item.depreciation_rate > 0) {
                    this.$refs.depreciation_value_year.valueOutput = item.cost * item.depreciation_rate / 100
                    this.$refs.depreciation_value_year.validateInput()
                }
            },

             /**
             * Tự động tính toán giá trị hao mòn khi thay đổi số năm sử dụng
             * @param {val}: giá trị thay đổi
             * @return không
             * author: NXHinh (30/09/2023)
             */
             "store.item.life_time": function(val) {
                var item = this.store.item
                this.$refs.depreciation_rate.valueOutput = (1 / item.life_time * 100).toFixed(4)
                this.$refs.depreciation_rate.validateInput()
                if (item.cost > 0) {
                    this.$refs.depreciation_value_year.valueOutput = item.cost * this.$refs.depreciation_rate.valueOutput / 100
                    this.$refs.depreciation_value_year.validateInput()
                }
            },

            /**
             * Tự động tính toán thời gian sử dụng
             * @param {val}: giá trị thay đổi
             * @return không
             * author: NXHinh (30/09/2023)
             */
             "store.item.start_using_date": function(val) {
                var item = this.store.item;
                item.product_year = this.$MHelper.getYear(val);
            },
        },
    
        methods: {
            /**
             * Đóng form
             * @return không
             * author: NXHinh (18/08/2023)
             */
            nextFocus(refname) {
                try {
                    this.$refs[refname].focusOnInput()
                }
                catch {
                    this.$refs[refname].focusOnButton()
                }
            },
            /**
             * Đóng form
             * @return không
             * author: NXHinh (18/08/2023)
             */
            onCloseAssetForm() {
                this.store.formOpen = false
            },
    
            /**
             * Hiển thị Dialog
             * @return không
             * author: NXHinh (18/08/2023)
             */
            onShowDialog() {
                this.showDialog = true
            },
            /**
             * Ẩn Dialog
             * @return không
             * author: NXHinh (18/08/2023)
             */
            onHideDialog() {
                this.showDialog = false
            },
    
            /**
             * Ẩn dialog và đóng form
             * @return không
             * author: NXHinh (18/08/2023)
             */
            onCloseAssetFormAndDialog() {
                this.onCloseAssetForm()
                this.showDialog = false
            },

            /**
             * validate input
             * @return không
             * author: NXHinh (18/09/2023)
             */
            validateForm() {
                Object.values(this.$refs).forEach((value) => {
                    try {
                        value.validateInput()
                    }
                    catch {}
                });
            },

            /**
             * Lưu dữ liệu
             * @return không
             * author: NXHinh (18/08/2023)
             */
            async onSave(){
                this.validateForm()
                
                var isValidForm = true;
                Object.values(this.$refs).forEach((value) => {
                    if (value.isError) isValidForm = false
                });

                // Nếu form hợp lệ thì lưu
                if (isValidForm) {
                    this.showDialog = false;
                    var successMsg = ""

                    if (this.store.formMode == this.$MEnum.FormMode.Edit) {
                        this.store.searchText = ""
                        this.store.categoryFilter = ""
                        this.store.departmentFilter = ""
                        await this.store.update()
                        await this.store.getTotalRecords()
                        await this.store.get()
                        successMsg = this.$MResource.SuccessMsg.UpdatedSuccess
                    }
                    else if (this.store.formMode == this.$MEnum.FormMode.Add){
                        this.store.searchText = ""
                        this.store.categoryFilter = ""
                        this.store.departmentFilter = ""
                        await this.store.add()
                        await this.store.getTotalRecords()
                        await this.store.get()
                        successMsg = this.$MResource.SuccessMsg.AddedSuccess
                    }
                    else if (this.store.formMode == this.$MEnum.FormMode.Duplicate){
                        await this.store.add()
                        await this.store.getTotalRecords()
                        await this.store.get()
                        successMsg = this.$MResource.SuccessMsg.DuplicatedSuccess
                    }
                    if (!this.$infoDialogStore.message) {
                        this.onCloseAssetForm();
                        // Về trang đầu
                        this.store.page = 1
                        // show Toast
                        this.$emitter.emit("onShowToast",this.$ToastTypeEnum.Success, successMsg)
                    }
                }

                else {
                    this.store.error = this.$MResource.ErrorMsg.InputValidate
                }
            }
        },
        
    }
    </script>
    
    <style scoped>
    @import url(./assetform.css);
    </style>