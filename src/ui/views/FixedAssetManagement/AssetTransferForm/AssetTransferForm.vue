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
                            v-model:valueInput="checkReceivePerson"
                        ></m-checkbox> 
                    </div>

                    <div class="options__deputy" v-if="checkReceivePerson">
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
                                <tr v-for="(deputy, index) in deputyList" v-bind:key="index">
                                    <td class="options__table--checkbox"><p> {{ index + 1 }}</p></td>
                                    <td class="options__table--input">
                                        <m-input 
                                            ref=""
                                            :placeholder="deputy.STT"
                                            :hasClearIcon="true"
                                            :showError="false"
                                        ></m-input>
                                    </td>
                                    <td class="options__table--input">
                                        <m-input 
                                            ref=""
                                            placeholder="Nhập đại diện"
                                            :hasClearIcon="true"
                                            :showError="false"
                                        ></m-input>
                                    </td>
                                    <td class="options__table--input">
                                        <m-input 
                                            ref=""
                                            placeholder="Nhập chức vụ"
                                            :hasClearIcon="true"
                                            :showError="false"
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
                        >
                    </m-input>
                </div>

                <m-pri-button text="Chọn tài sản"
                    buttonClass = "outline-button"
                    :tabindex="6"
                    icon="icon--add"
                    @click="onShowAssetTransferSubForm"
                    >
                </m-pri-button>
                
            </div>

            <m-table :items="this.detailsStore.tempSelected">
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
                    <tr v-for="(item, index) in this.detailsStore.tempSelected" :key="item.fixed_asset_id">
                        <td class="ta-left">
                            <m-checkbox v-model:valueInput="this.detailsStore.selected" :value="item.fixed_asset_id"></m-checkbox>
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
                            <div class="hide">
                                <m-tooltip text="Xóa tài sản">
                                    <template #content>
                                        <div class="icon-container--circle"
                                            @click="deleteTempFixedAsset(item.fixed_asset_id)">
                                            <div class="icon--20 icon--button icon--delete-red" ></div>
                                        </div>
                                    </template>
                                </m-tooltip>
                            </div>
                        </td>
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
            this.detailsStore.tempSelected = this.detailsStore.items
            this.detailsStore.tempSelected.forEach(item => {
                this.detailsStore.tempDepartmentInfo.push(
                    {
                        "ID": item.fixed_asset_id,
                        "newDepartment": item.department_after_name,
                        "reason": ""
                    }
                )
            });    
        },

        data() {
            return {
                showDialog: false,
                showSubForm: false,
                checkReceivePerson: false,
                asset_items_selected: [],

                deputyList: [{
                    "STT": 1,
                    "Name": "",
                    "Department": "",
                    "Position": "",
                }],
            }
        },

        watch: {
            showSubForm: function(newValue) {
                if (!newValue)
                    this.$refs.document_code.focusOnInput();
            },
        },

        methods: {
            /**
             * Ẩn form điều chuyển tài sản
             * @return không
             * createdBy: NXHinh (18/10/2023)
             */
            onCloseAssetTransferForm() {
                this.$router.push('/assets/transfer')
                this.detailsStore.tempSelected = []
                this.detailsStore.tempDepartmentInfo = []
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
            deleteTempFixedAsset(fixed_asset_id) {
                this.detailsStore.tempSelected = this.detailsStore.tempSelected.filter(item => {
                    return item.fixed_asset_id !== fixed_asset_id;
                })
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
                if (this.detailsStore.selected.length == 0){
                    this.store.error = "Vui lòng chọn tài sản điều chuyển"
                }
                else {
                    // Lấy danh sách tài sản được chọn
                    this.asset_items_selected = this.detailsStore.tempSelected.filter(x => this.detailsStore.selected.includes(x.fixed_asset_id))

                    this.asset_items_selected.forEach(item => {
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
                        this.store.categoryFilter = ""
                        this.store.departmentFilter = ""

                        await this.store.add(this.asset_items_selected)
                        await this.store.getTotalRecords()
                        await this.store.get()
                        successMsg = this.$MResource.SuccessMsg.UpdatedSuccess

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
                var maxSTT = this.deputyList.reduce((max, obj) => {
                    return obj.STT > max ? obj.STT : max;
                }, -Infinity);

                this.deputyList.push({
                    "STT": maxSTT + 1,
                    "Name": "",
                    "Department": "",
                    "Position": "",
                })
            },

            deleteDeputy(index) {
                this.deputyList.splice(index, 1);
            },

            upDeputy(index) {
                if (index > 0)
                    [this.deputyList[index], this.deputyList[index - 1]] 
                    = [this.deputyList[index - 1], this.deputyList[index]]
            },

            downDeputy(index) {
                if (index < this.deputyList.length - 1)
                    [this.deputyList[index], this.deputyList[index + 1]] 
                    = [this.deputyList[index + 1], this.deputyList[index]]
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
                    return this.detailsStore.tempSelected ? this.detailsStore.selected.length == this.detailsStore.tempSelected.length && this.detailsStore.selected.length > 0 : false;
                },
                set: function (value) {
                    var selected = [];

                    if (value) {
                        this.detailsStore.tempSelected.forEach(function (asset) {
                            selected.push(asset.fixed_asset_id);
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