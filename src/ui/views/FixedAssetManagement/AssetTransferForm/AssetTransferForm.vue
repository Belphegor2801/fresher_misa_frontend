<template>
    <div class="at-form-container" @keydown.escape="onCloseAssetTransferForm()">
        <div class="at-form__header">
            <p class="at-form__header--title"> Thêm chứng từ điều chuyển </p>
            <i class="icon--36 icon--button icon--close"
                @click="onCloseAssetTransferForm"
            ></i>
        </div>

        <div class="at-form__body">
            <div class="at-form__body--title"> 
                Thông tin chung
            </div>

            <div class="at-form__body--general">
                <div class="at-form__body--input">
                    <m-input 
                        label="Mã chứng từ"
                        ref="document_code"
                        width="250px"
                        :tabindex="1"
                        placeholder="Mã chứng từ"
                        v-model:valueInput=store.item.document_code
                        :hasClearIcon="true"
                    ></m-input>

                    <m-datepicker
                        label="Ngày chứng từ"
                        width="222px"
                        type="date"
                        :tabindex="2"
                        v-model:valueInput=store.item.document_date
                        :required="true" > 
                    </m-datepicker>

                    <m-datepicker
                        label="Ngày điều chuyển"
                        width="222px"
                        type="date"
                        :tabindex="3"
                        v-model:valueInput=store.item.transfer_date
                        :required="true" > 
                    </m-datepicker>

                    <m-input :style=" {'width': '100%'}"
                        label="Ghi chú"
                        ref=""
                        :tabindex="4"
                        placeholder="Nhập ghi chú"
                        v-model:valueInput=store.item.note
                        :hasClearIcon="true"
                        :required="false"
                    ></m-input>
                </div>

                <div class="at-form__body--options">
                    <div class="options__checkbox">
                        <m-checkbox title="Chọn ban giao nhận"
                            v-model:valueInput="checkRecipient"
                        ></m-checkbox> 

                        <m-checkbox title="Chọn ban giao nhận từ lần nhập trước"
                            v-model:valueInput="checkGetLastRecipient"
                        ></m-checkbox> 
                    </div>

                    <div class="options__deputy" v-if="checkRecipient">
                        <table class="options__table">
                            <thead >
                                <tr>
                                    <td>STT</td>
                                    <td>Họ và tên</td>
                                    <td>Đại diện</td>
                                    <td>Chức vụ</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(deputy, index) in this.detailsStore.tempRecipientSelected" v-bind:key="index">
                                    <td class="options__table--checkbox"><p> {{ index + 1 }}</p></td>
                                    <td class="options__table--input">
                                        <m-input 
                                            ref=""
                                            placeholder="Họ và tên"
                                            :hasClearIcon="true"
                                            :showError="false"
                                            v-model:valueInput="deputy.recipient_name"
                                        ></m-input>
                                    </td>
                                    <td class="options__table--input">
                                        <m-input 
                                            ref=""
                                            placeholder="Nhập đại diện"
                                            :hasClearIcon="true"
                                            :showError="false"
                                            v-model:valueInput="deputy.department"
                                        ></m-input>
                                    </td>
                                    <td class="options__table--input">
                                        <m-input 
                                            ref=""
                                            placeholder="Nhập chức vụ"
                                            :hasClearIcon="true"
                                            :showError="false"
                                            v-model:valueInput="deputy.department_position"
                                        ></m-input>
                                    </td>
                                    <td>
                                        <div class="options__table--function-col">
                                            <div @click="upDeputy(index)" class="icon--20 icon--button icon--arrow-fill-up"></div>
                                            <div @click="downDeputy(index)" class="icon--20 icon--button icon--arrow-fill-down"></div>
                                            <div @click="addDeputy" class="icon--20 icon--button icon--add"></div>
                                            <div v-if="index > 0" @click="deleteDeputy(index)" class="icon--20 icon--button icon--delete-red"></div>
                                        </div>
                                        
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="at-form__body--title"> 
                <div class="at-form__body--text">
                    Thông tin tài sản điều chuyển
                    <m-input 
                        ref="searchBar"
                        width="250px"
                        :tabindex="5"
                        iconBefore="icon--search" 
                        placeholder="Tìm kiếm tài sản"
                        :required="false"
                        :hasClearIcon="true"
                        :showError="false"
                        v-model:valueInput="searchText"
                        >
                    </m-input>
                </div>

                <div class="at-form__body--toolbar">
                    <div v-if="this.detailsStore.selected.length > 0" class="tool-bar__text font--16">
                        <a class="font--16"> Đã chọn:<b class="font--16"> {{ this.detailsStore.selected.length }} </b></a>
                        <a class="font--16 bold color--blue cursor--pointer" @click="clearSelected"> Bỏ chọn </a> 
                        <button class="tool-bar__button--delete" @click="deleteSelected($event)"> Xóa </button>
                    </div>

                    <m-pri-button text="Chọn tài sản"
                        buttonClass = "outline-button"
                        :tabindex="6"
                        icon="icon--add"
                        @click="onShowAssetTransferSubForm"
                        >
                    </m-pri-button>
                </div>  
            </div>

            <m-table :items="this.fixedAssetList">
                <template #table--header>
                    <tr class="ignore-focus">
                        <td class="ta-left">
                            <m-checkbox v-model:valueInput="selectAll"
                                :disabled="this.detailsStore.tempSelected.length == 0"
                            ></m-checkbox>
                        </td>
                        <td class="ta-center table__columns--index" tooltip="Số thứ tự">
                            {{ this.$MResource.TableColumns.Index }}
                        </td>
                        <td class="ta-left">
                            {{ this.$MResource.TableColumns.FixedAssetCode }}
                        </td>
                        <td class="ta-center">
                            {{ this.$MResource.TableColumns.FixedAssetName }}
                        </td>
                        <td class="ta-right table__columns--number">
                            {{ this.$MResource.TableColumns.Cost }}
                        </td>
                        <td class="ta-right table__columns--number">
                            {{ this.$MResource.TableColumns.RemainingValue }}
                        </td>
                        <td class="ta-left" :style="{'width': '180px'}">
                            {{ this.$MResource.TableColumns.DepartmentName }}
                        </td>
                        <td class="ta-left" :style="{'width': '235px'}">
                            {{ this.$MResource.TableColumns.DepartmentTransferName }}
                        </td>
                        <td class="ta-left table__columns--reason" :style="{'width': '235px'}">
                            {{ this.$MResource.TableColumns.Reason }}
                        </td>
                        <td class="ta-center" :style="{'width': '83px'}">
                            {{ this.$MResource.TableColumns.Tool }}
                        </td>
                    </tr>
                </template>

                <template #table--body>
                    <tr v-for="(item, index) in this.fixedAssetList" :key="item.fixed_asset_id">
                        <td class="ta-left">
                            <m-checkbox v-model:valueInput="this.detailsStore.selected" :value="item"></m-checkbox>
                            <!-- <input type="checkbox" v-model="selectAll" > -->
                        </td>
                        <td class="ta-center">
                            {{ index + 1}}
                        </td>
                        <td class="ta-left">{{ item.fixed_asset_code }}</td>
                        <td class="ta-left">{{ item.fixed_asset_name }}</td>
                        <td class="ta-right">
                            {{ this.$MHelper.formatNumber(item.cost)}}
                        </td>
                        <td class="ta-right">
                            {{ this.$MHelper.formatNumber(item.remaining_value) }}
                        </td>
                        <td class="ta-left">
                            {{ item.department_before_name }}
                        </td>
                            
                        <td class="ta-left table__td--combo-box">
                            <m-combo-box
                                @click="checkPermissionToChangeOrDelete($event, item, this.store.item.transfer_date, this.$MEnum.ActionType.Edit)"
                                width="230px"
                                :markSelect="false"
                                :showError="false"
                                :placeholder="item.department_after_name"
                                :options=this.$departmentStore.nameList
                                v-model:valueInput="item.department_after_name"
                            ></m-combo-box> 
                        </td>

                        <td class="ta-center table__td--input">
                            <m-input :style=" {'width': '100%'}"
                                placeholder="Nhập lý do"
                                :showError="false"
                                :hasClearIcon="true"
                                :required="false"
                                v-model:valueInput="item.reason"
                            ></m-input>
                        </td>
                        <td class="ta-center">
                            <div class="table__columns--tool">
                                <m-tooltip text="Xóa tài sản">
                                    <template #content>
                                        <div class="icon-container--circle"
                                            @click="deleteTempFixedAsset($event, item)">
                                            <div class="icon--20 icon--button icon--delete-red" ></div>
                                        </div>
                                    </template>
                                </m-tooltip>
                            </div>
                        </td>
                    </tr>
                </template>

                <template #table--footer>
                        <tr class="ignore-focus">
                            <td colspan="4">
                                <div class="table__pagination">
                                    <div class="table__pagination--text">Tổng số: <b>{{ this.$MHelper.formatNumber(this.detailsStore.tempSelected.length) }}</b> bản ghi</div>
                                    <div class="table__pagination--input">
                                        <m-combo-box
                                            type="select"
                                            :markSelect="false"
                                            :dataAbove="true" 
                                            :tabindex="10"
                                            :placeholder=this.store.getRecordPerPageList[0].label.toString()
                                            :options=this.store.pagination.recordPerPageList
                                            v-model:valueInput="this.recordPerPage"
                                        ></m-combo-box>   
                                    </div>
                                    <ul class="table__pagination--page">
                                        <li class="table__pagination--page-button">
                                            <div class="icon--20 icon--button icon--angle-left" @click="this.prevPage"
                                                :class="{'disabled': this.page == 1}"></div>
                                        </li>
                                        <li class="table__pagination--page-button"><p>{{ this.page }} </p></li>

                                        <li class="table__pagination--page-button">
                                            <div class="icon--20 icon--button icon--angle-right" @click="this.nextPage"
                                                :class="{'disabled': this.page >= this.maxPage}"></div>
                                        </li>
                                    </ul>
                                </div>
                            </td>
                            <td class="ta-right">{{ this.$MHelper.formatNumber(this.totalCost) }}</td>
                            <td class="ta-right">{{ this.$MHelper.formatNumber(this.totalRemainingValue) }}</td>
                            <td class="ta-center" colspan="4"></td>
                        </tr>
                    </template>
            </m-table>

        </div>

        <div class="at-form__footer">
            <a></a>
            <div class="at-form__footer--buttons">
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
                    @click="onSave"
                    text="Lưu"
                ></m-pri-button>
            </div>
        </div>
    </div>

    <AssetTransferSubForm v-if="showSubForm"
        @close="onCloseAssetTransferSubForm"
    > </AssetTransferSubForm> 


    <m-dialog v-if="showDialog" 
        :message="this.$MResource.Dialog.Add.Message"
        :buttonText="this.$MResource.Dialog.Add.BtnConfirm"
        :buttonFunction="onCloseAssetTransferForm">
        <template #outline-button>
            <m-pri-button
                buttonClass="outline-button"
                :text="this.$MResource.Dialog.Add.BtnCancel"
                @click="onHideDialog"
            ></m-pri-button>
        </template> 
    </m-dialog>

    <Teleport to="#app">
        <m-dialog v-if="this.store.error"
            :message="this.store.error"
            :buttonText="this.$MResource.Dialog.Delete.BtnClose"
            :buttonFunction="() => {this.store.error = ''}">
        </m-dialog>

        <h-loading v-if="this.store.loading"></h-loading>
    </Teleport>
</template>

<script>
    import TransferDocumentStore from "@/core/store/TransferDocumentStore.ts";
    import TransferDocumentDetailsStore from "@/core/store/TransferDocumentDetailsStore.ts";
    import AssetTransferSubForm from './AssetTransferSubForm.vue';
    import { Recipient } from "@/core/entities/Recipient.ts";

    export default {
        name: "AssetTransferForm",

        components: {AssetTransferSubForm},

        setup () {
            const detailsStore = TransferDocumentDetailsStore();
            const store = TransferDocumentStore();
            return {store, detailsStore}
        },

        async mounted () {
            /**
             * Tự động focus
             * @return không
             * author: NXHinh (18/10/2023)
             */
            this.$refs.document_code.focusOnInput();

            this.debounceFilter = this.$MHelper.debounce(this.applyFilter, 100);

            // Lấy dữ liệu
            const document_id = this.$route.params.id
            if (document_id) {
                this.store.formMode = this.$MEnum.FormMode.Edit
                await this.store.getById(document_id)
                this.detailsStore.document_id = document_id
                await this.detailsStore.get()
            }
            else {
                this.store.formMode = this.$MEnum.FormMode.Add
                await this.store.newItem()
                await this.store.getNewCode()
                this.detailsStore.items = []
                this.detailsStore.recipients = []
            }

            this.detailsStore.tempSelected = [...this.detailsStore.items]

            this.maxPage = Math.ceil(this.detailsStore.tempSelected.length / this.recordPerPage)
            this.fixedAssetList = this.detailsStore.tempSelected.slice(0, 20);

            this.detailsStore.tempRecipientSelected = [...this.detailsStore.recipients]
            if (this.detailsStore.tempRecipientSelected.length == 0) {
                this.detailsStore.tempRecipientSelected.push(new Recipient())
            }
        },

        data() {
            return {
                showDialog: false,
                showSubForm: false,
                checkRecipient: false,
                checkGetLastRecipient: false,
                searchText: "",
                fixedAssetList: [],

                page: 1,
                recordPerPage: 20,
                maxPage: Math.ceil(this.detailsStore.tempSelected.length / this.recordPerPage),

                totalCost: 0,
                totalRemainingValue: 0,
            }
        },

        watch: {
            checkGetLastRecipient: async function(val) {
                if (val) {
                    this.checkRecipient = true;
                    await this.detailsStore.getLastRecipient();
                }
            },

            showSubForm: function(newValue) {
                if (!newValue){
                    this.$refs.document_code.focusOnInput();
                    this.maxPage = Math.ceil(this.detailsStore.tempSelected.length / this.recordPerPage);
                    this.page = this.maxPage;
                    this.fixedAssetList = this.detailsStore.tempSelected.slice((this.page - 1) * this.recordPerPage, this.page * this.recordPerPage);
                    if (this.searchText) {
                        this.debounceFilter()
                    }
                };
            },

            "detailsStore.tempSelected": function(val) {
                this.fixedAssetList = this.detailsStore.tempSelected.slice((this.page - 1) * this.recordPerPage, this.page * this.recordPerPage);
                this.maxPage = Math.ceil(this.detailsStore.tempSelected.length / this.recordPerPage);
                if (this.page > this.maxPage) this.page = this.maxPage;
            },

            // 'detailsStore.items': function(val) {
            //     console.log(val.length)
            // },

            recordPerPage: function(val) {
                this.maxPage = Math.ceil(this.detailsStore.tempSelected.length / val);
                this.page = 1;
                this.fixedAssetList = this.detailsStore.tempSelected.slice((this.page - 1) * this.recordPerPage, this.page * this.recordPerPage);
            },

            page: function(val) {
                this.fixedAssetList = this.detailsStore.tempSelected.slice((val - 1) * this.recordPerPage, val * this.recordPerPage);
            },

            fixedAssetList: function(val) {
                this.totalCost = 0,
                this.totalRemainingValue = 0,
                val.forEach(item => {
                    this.totalCost += item.cost;
                    this.totalRemainingValue += item.remaining_value;
                });
            },

            searchText: function(val) {
                this.debounceFilter()
            }
        },

        methods: {
            /**
             * Lấy danh sách dữ liệu sau filter
             * @return không
             * createdBy: NXHinh (25/10/2023)
             */
            async applyFilter() {
                this.page = 1;
                var filterList = this.detailsStore.tempSelected.filter(
                    x => x.fixed_asset_code.includes(this.searchText) || x.fixed_asset_name.includes(this.searchText) )
                this.fixedAssetList = filterList.slice((this.page - 1) * this.recordPerPage, this.page * this.recordPerPage);
            },

            /**
             * Bỏ chọn tất cả
             * @return không
             * createdBy: NXHinh (14/11/2023)
             */
            clearSelected() {
                this.detailsStore.selected = [];
            },

            /**
             * Xóa item được chọn
             * @return không
             * createdBy: NXHinh (14/11/2023)
             */
            deleteSelected(event) {
                this.detailsStore.selected.forEach(async (item) => {
                    await this.deleteTempFixedAsset(event, item)
                });
                this.detailsStore.selected = this.detailsStore.selected.filter(x => this.detailsStore.tempSelected.includes(x))
            },

            /**
             * Trang trước
             * @return không
             * createdBy: NXHinh (25/10/2023)
             */
            prevPage() {
                if (this.page > 1) this.page -= 1
            },

            /**
             * Trang sau
             * @return không
             * createdBy: NXHinh (25/10/2023)
             */
            nextPage() {
                if (this.page < this.maxPage) this.page += 1
            },


            /**
             * Ẩn form điều chuyển tài sản
             * @return không
             * createdBy: NXHinh (18/10/2023)
             */
            onCloseAssetTransferForm() {
                this.$router.push('/assets/transfer')
                this.detailsStore.tempRecipientSelected = []
                this.detailsStore.tempSelected = []
                this.fixedAssetList = []
                this.page = 1
                this.recordPerPage = 20
            },

            /**
             * Mở subform thêm tài sản
             * @return không
             * createdBy: NXHinh (18/10/2023)
             */
            onShowAssetTransferSubForm() {
                this.showSubForm = true
            },

            /**
             * Ẩn subform thêm tài sản
             * @return không
             * createdBy: NXHinh (18/10/2023)
             */
            onCloseAssetTransferSubForm() {
                this.showSubForm = false
            },

            /**
             * Xóa tài sản đang được chọn
             * @return không
             * createdBy: NXHinh (25/10/2023)
             */
            async deleteTempFixedAsset(event, fixed_asset) {
                if (this.store.formMode == this.$MEnum.FormMode.Add) {
                    this.detailsStore.tempSelected = this.detailsStore.tempSelected.filter(item => {
                        return item.fixed_asset_id !== fixed_asset.fixed_asset_id;
                    })
                }
                else if (this.store.formMode == this.$MEnum.FormMode.Edit){
                    var isAllowDelete = true;
                    if (!this.detailsStore.items.includes(fixed_asset)) {
                        isAllowDelete = true 
                    }
                    else {
                        isAllowDelete = await this.checkPermissionToChangeOrDelete(event, fixed_asset, this.store.item.transfer_date);
                    }
                    if (isAllowDelete) {
                        this.detailsStore.tempSelected = this.detailsStore.tempSelected.filter(item => {
                            return item.fixed_asset_id !== fixed_asset.fixed_asset_id;
                        })
                    }
                }
            },

            /**
             * Kiểm tra có được phép thay đổi thông tin/xóa tài sản trong chứng từ không
             * @return không
             * createdBy: NXHinh (08/11/2023)
             */
            async checkPermissionToChangeOrDelete(e, fixed_asset, date, actionType = this.$MEnum.ActionType.Delete){
                if (this.store.formMode == this.$MEnum.FormMode.Edit) {
                    e.stopPropagation();
                    let documents = await this.store.getByFixedAssetIdAfterDate(fixed_asset.fixed_asset_id, date)
                    
                    if (!document) return true
                    
                    if (documents.length == 0) return true
                    else {
                        let error = `\n - Chứng từ điều chuyển ${documents[0].document_code} (${this.$MHelper.formatDate(documents[0].transfer_date)})`;

                        let action = ''
                        if (actionType == this.$MEnum.ActionType.Delete) action = this.$MResource.ActionType.Delete
                        else if (actionType == this.$MEnum.ActionType.Edit) action = action = this.$MResource.ActionType.Edit

                        this.store.error = `Tài sản ${fixed_asset.fixed_asset_code} đã có chứng từ phát sinh. Bạn không thể ${action} chứng từ này`
                        this.store.error += error;

                        return false;
                    }
                }
            },

            /**
             * Hiện Dialog
             * @return không
             * createdBy: NXHinh (25/10/2023)
             */
            onShowDialog() {
                this.showDialog = true;
            },
            /**
             * Ẩn Dialog
             * @return không
             * createdBy: NXHinh (25/10/2023)
             */
            onHideDialog() {
                this.showDialog = false;
            },

            /**
             * Đóng Dialog thông báo lỗi
             * @return không
             * createdBy: NXHinh (18/09/2023)
             */
            onCloseErrorDialog() {
                this.store.error = ""
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
                if (this.detailsStore.tempSelected.length == 0){
                    this.store.error = "Vui lòng chọn tài sản điều chuyển"
                }

                else {
                    // Cập nhật department_id
                    this.detailsStore.tempSelected.forEach(item => {
                        item.department_after_id = this.$departmentStore.items.find(x => x.department_name == item.department_after_name).department_id
                    });
                    // Kiểm tra phòng ban
                    this.detailsStore.tempSelected.forEach(item => {
                        if (item.department_after_id == item.department_before_id) {
                            this.store.error = "Vui lòng chọn phòng ban điều chuyển khác với phòng ban hiện tại"
                        }
                    });
                }
            },

            /**
             * Lưu chứng từ
             * @return không
             * createdBy: NXHinh (25/10/2023)
             */
            async onSave() {
                this.validateForm()
                let isValidForm = true;
                Object.values(this.$refs).forEach((value) => {
                    if (value.isError) {
                        isValidForm = false
                        this.store.error = "Trường dữ liệu không được phép để trống!"
                    }
                });


                // Nếu form hợp lệ thì lưu
                if (isValidForm && !this.store.error) {
                    this.showDialog = false;
                    var successMsg = ""
                    this.store.searchText = ""

                    if (this.store.formMode == this.$MEnum.FormMode.Add) {
                        if (this.checkRecipient) {
                            await this.store.add(this.detailsStore.tempSelected, this.detailsStore.tempRecipientSelected)
                        }
                        else {
                            await this.store.add(this.detailsStore.tempSelected)
                        }
                        this.store.pagination.page = 1
                        await this.store.getTotalRecords()
                        await this.store.get()
                        successMsg = this.$MResource.SuccessMsg.AddedSuccess
                    }
                    else {
                        if (this.checkRecipient) {
                            await this.store.update(this.detailsStore.tempSelected, this.detailsStore.tempRecipientSelected)
                        }
                        else {
                            await this.store.update(this.detailsStore.tempSelected)
                        }
                        await this.store.getTotalRecords()
                        await this.store.get()
                        successMsg = this.$MResource.SuccessMsg.UpdatedSuccess
                    }

                    if (!this.store.error) {
                        this.onCloseAssetTransferForm()
                        // Về trang đầu
                        this.store.page = 1
                        // show Toast
                        this.$emitter.emit("onShowToast",this.$ToastTypeEnum.Success, successMsg)
                    }
                    }
            },

            addDeputy() {
                this.detailsStore.tempRecipientSelected.push(new Recipient())
            },

            deleteDeputy(index) {
                this.detailsStore.tempRecipientSelected.splice(index, 1);
            },

            upDeputy(index) {
                if (index > 0)
                    [this.detailsStore.tempRecipientSelected[index], this.detailsStore.tempRecipientSelected[index - 1]] 
                    = [this.detailsStore.tempRecipientSelected[index - 1], this.detailsStore.tempRecipientSelected[index]]
            },

            downDeputy(index) {
                if (index < this.detailsStore.tempRecipientSelected.length - 1)
                    [this.detailsStore.tempRecipientSelected[index], this.detailsStore.tempRecipientSelected[index + 1]] 
                    = [this.detailsStore.tempRecipientSelected[index + 1], this.detailsStore.tempRecipientSelected[index]]
            }
        },

        computed: {
        /**
             * Chọn/Bỏ chọn toàn bộ Checkbox
             * @return không
             * createdBy: NXHinh (21/08/2023)
             */
             selectAll: {
                get: function () {
                    // Đọc danh sách đang được chọn ở trang hiện tại
                    const selectedInThisPage = 
                        this.detailsStore.selected.filter(x => this.fixedAssetList.includes(x));
                    return this.fixedAssetList ? selectedInThisPage.length == this.fixedAssetList.length && this.fixedAssetList.length > 0 : false;
                },
                set: function (value) {
                    // Làm mới danh sách đang được chọn ở trang hiện tại
                    var selected =  this.detailsStore.selected.filter(x => !this.fixedAssetList.includes(x));

                    // Thêm danh sách đang được chọn ở trang hiện tại
                    if (value) {
                        this.fixedAssetList.forEach(function (asset) {
                            selected.push(asset);
                        });
                    }
                    this.detailsStore.selected = selected;
                }
            }
        }
    }
</script>

<style scoped>
    @import url(./asset_transfer_form.css);
</style>