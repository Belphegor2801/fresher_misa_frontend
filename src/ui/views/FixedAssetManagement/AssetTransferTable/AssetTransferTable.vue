<template>
    <div class="container">
        <div class="tool-bar">
            <div class="tool-bar__text">
                Điều chuyển <i class="icon--20 icon--recycle"></i>
            </div>
            <div class="tool-bar__button-bar">
                <m-input 
                    ref="searchBar"
                    width="300px"
                    :tabindex="1"
                    iconBefore="icon--search" 
                    placeholder="Tìm kiếm mã chứng từ"
                    :required="false"
                    :hasClearIcon="true"
                    :showError="false"
                    v-model:valueInput="this.store.searchText"
                ></m-input>

                <m-pri-button text="Thêm chứng từ" 
                    :tabindex="4"
                    icon="icon--add fill-white" @click="onShowAssetTransferForm()">
                </m-pri-button>
                <div>
                    <m-tooltip text="Hỗ trợ">
                        <template #content>
                            <m-icon-button icon="icon--chat" 
                                :tabindex="5"
                                @click="this.$toastStore.onShowDevelopingToast()">
                            </m-icon-button>
                        </template>
                    </m-tooltip>
                </div>
                <div>
                    <m-tooltip text="Thông tin">
                        <template #content>
                            <m-icon-button icon="icon--support-2" 
                                :tabindex="6"
                                @click="this.$toastStore.onShowDevelopingToast()"/>
                        </template>
                    </m-tooltip>
                </div>
            </div>
        </div>

        <m-table :store="this.store" :items="this.store.items">
            <template #table--header>
                <tr class="ignore-focus">
                    <td class="ta-left">
                        <m-checkbox v-model:valueInput="selectAll"
                            :disabled="this.store.items.length == 0"
                        ></m-checkbox>
                        <!-- <input type="checkbox" v-model="selectAll" > -->
                    </td>
                    <td class="ta-center table__columns--index" tooltip="Số thứ tự">
                        {{ this.$MResource.TableColumns.Index }}
                    </td>
                    <td class="ta-left">
                        {{ this.$MResource.TableColumns.DocumentCode }}
                    </td>
                    <td class="ta-center">
                        {{ this.$MResource.TableColumns.TransferDate }}
                    </td>
                    <td class="ta-center">
                        {{ this.$MResource.TableColumns.DocumentDate }}
                    </td>
                    <td class="ta-right">
                        {{ this.$MResource.TableColumns.Cost }}
                    </td>
                    <td class="ta-right">
                        {{ this.$MResource.TableColumns.RemainingValue }}
                    </td>
                    <td class="ta-left table__columns--note" :style="{'width': '30%'}">
                        {{ this.$MResource.TableColumns.Note }}
                    </td>
                    <td class="ta-center">
                        {{ this.$MResource.TableColumns.Tool }}
                    </td>
                </tr>
            </template>

            <template #table--body>
                <tr v-for="(item, index) in this.store.items" :key="item.document_id" 
                    @contextmenu="onShowContextMenu(item, $event)"
                    class="cursor--pointer"
                    :class="this.documentSelected == item.document_id? 'active': ''"
                    @click="() => onSelectDocument(item.document_id)" >
                    <td class="ta-center">
                        <!-- <input type="checkbox" v-model="store.selected" :value="item.fixed_asset_id" /> -->
                        <m-checkbox v-model:valueInput="store.selected" :value="item.document_id" ></m-checkbox>
                    </td>

                    <td class="ta-center">{{ index + 1 + (this.store.pagination.page - 1) * (this.store.pagination.recordPerPage)  }}</td>

                    <td class="ta-left">
                        {{ item.document_code }}
                    </td>
                    <td class="ta-center">
                        {{ this.$MHelper.formatDate(item.transfer_date) }}
                    </td>
                    <td class="ta-center">
                        {{ this.$MHelper.formatDate(item.document_date) }}
                    </td>
                    <td class="ta-right">
                        {{ this.$MHelper.formatNumber(item.cost) }}
                    </td>
                    <td class="ta-right">
                        {{ this.$MHelper.formatNumber(item.remaining_value) }}
                    </td>
                    <td class="ta-left table__columns--note" :style="{'width': '100px'}">
                        {{ item.note }}
                    </td>
                    <td class="ta-center">
                        <div class="hide">
                            <m-tooltip text="Chỉnh sửa chứng từ">
                                <template #content>
                                    <div class="icon-container--circle"
                                        @click = "onShowAssetTransferForm(this.$MEnum.FormMode.Edit, item.document_id)"
                                    >
                                        <div class="icon--20 icon--button icon--edit" ></div>
                                    </div>
                                </template>
                            </m-tooltip>

                            <m-tooltip text="Xóa chứng từ">
                                <template #content>
                                    <div class="icon-container--circle"
                                        @click="onShowDeleteConfirmDialog(item)">
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
                    <td colspan="5">
                        <div class="table__pagination">
                            <div class="table__pagination--text">Tổng số: <b>{{ this.$MHelper.formatNumber(this.store.pagination.totalRecords) }}</b> bản ghi</div>
                            <div class="table__pagination--input">
                                <m-combo-box
                                    type="select"
                                    :markSelect="false"
                                    :dataAbove="true" 
                                    :tabindex="10"
                                    :placeholder=this.store.getRecordPerPageList[0].label.toString()
                                    :options=this.store.pagination.recordPerPageList
                                    v-model:valueInput="this.store.pagination.recordPerPage"
                                />   
                            </div>
                            <ul class="table__pagination--page">
                                <li class="table__pagination--page-button">
                                    <div class="icon--20 icon--button icon--angle-left" @click="this.store.pagination.prevPage"
                                        :class="{'disabled': this.store.pagination.page == 1}"></div>
                                </li>
                                <li class="table__pagination--page-button"><p>{{ this.store.pagination.page }} </p></li>

                                <li class="table__pagination--page-button">
                                    <div class="icon--20 icon--button icon--angle-right" @click="this.store.pagination.nextPage"
                                        :class="{'disabled': this.store.pagination.page >= this.store.getMaxPage}"></div>
                                </li>
                            </ul>
                        </div>
                    </td>
                    <td class="ta-right">{{ this.$MHelper.formatNumber(this.store.totalCost) }}</td>
                    <td class="ta-right">{{ this.$MHelper.formatNumber(this.store.totalRemainingValue) }}</td>
                    <td class="ta-center" colspan="2"></td>
                </tr>
            </template>
        </m-table>

        <div class="tool-bar">
            <div class="tool-bar__button-bar">
                <m-pri-button text="Thông tin chi tiết" 
                    class="details-button"
                    :tabindex="4"
                    @click="onShowDetails">
                </m-pri-button>
            </div>
            <div>
                <m-icon-button 
                    :icon= "showDetail? 'icon--angle-down-2' : 'icon--angle-up-2'" 
                    class="details-button--arrow"
                    :tabindex="5"
                    @click="onToggleShowDetail()">
                </m-icon-button>
            </div>
        </div>

        <m-table class="fixed-asset-transfer__table--details" 
            :items="this.detailsStore.items"
            :store="this.detailsStore" v-show="this.showDetail">
            <template #table--header>
                <tr class="ignore-focus">
                    <td  class="ta-center" tooltip="Số thứ tự">
                        {{ this.$MResource.TableColumns.Index }}
                    </td>
                    <td class="ta-left">
                        {{ this.$MResource.TableColumns.FixedAssetCode }}
                    </td>
                    <td class="ta-left">
                        {{ this.$MResource.TableColumns.FixedAssetName }}
                    </td>
                    <td class="ta-right">
                        {{ this.$MResource.TableColumns.Cost }}
                    </td>
                    <td class="ta-right">
                        {{ this.$MResource.TableColumns.RemainingValue }}
                    </td>
                    <td class="ta-left">
                        {{ this.$MResource.TableColumns.DepartmentName }}
                    </td>
                    <td class="ta-left">
                        {{ this.$MResource.TableColumns.DepartmentTransferName }}
                    </td>
                    <td class="ta-left" :style="{'width': '20%'}">
                        {{ this.$MResource.TableColumns.Reason }}
                    </td>
                </tr>
            </template>

            <template #table--body>
                <tr v-for="(item, index) in this.detailsStore.items" :key="item.document_details_id" 
                    @contextmenu="onShowContextMenu(item, $event)"
                    >
                    <td class="ta-center table__columns--index">
                        {{ index + 1 + (this.detailsStore.pagination.page - 1) * (this.detailsStore.pagination.recordPerPage)  }}
                    </td>

                    <td class="ta-left" :style="{'width': '50px'}">
                        {{ item.fixed_asset_code }}
                    </td>
                    <td class="ta-left" :style="{'width': '50px'}">
                        {{ item.fixed_asset_name }}
                    </td>
                    <td class="ta-right table__columns--number" :style="{'width': '10%'}">
                        {{ this.$MHelper.formatNumber(item.cost) }}
                    </td>
                    <td class="ta-right" :style="{'width': '10%'}">
                        {{ this.$MHelper.formatNumber(item.remaining_value) }}
                    </td>
                    <td class="ta-left" :style="{'width': '16%'}">
                        {{ item.department_before_name }}
                    </td>
                    <td class="ta-left" :style="{'width': '16%'}">
                        {{ item.department_after_name }}
                    </td>
                    <td class="ta-left" :style="{'width': '30%'}">
                        {{ item.reason }}
                    </td>
                </tr>
            </template>

            <template #table--footer>
                <tr class="ignore-focus">
                    <td colspan="3">
                        <div class="table__pagination">
                            <div class="table__pagination--text">Tổng số: <b>{{ this.$MHelper.formatNumber(this.detailsStore.pagination.totalRecords) }}</b> bản ghi</div>
                            <div class="table__pagination--input">
                                <m-combo-box
                                    type="select"
                                    :markSelect="false"
                                    :dataAbove="true" 
                                    :tabindex="10"
                                    :placeholder=this.detailsStore.getRecordPerPageList[0].label.toString()
                                    :options=this.detailsStore.pagination.recordPerPageList
                                    v-model:valueInput="this.detailsStore.pagination.recordPerPage"
                                />   
                            </div>
                            <ul class="table__pagination--page">
                                <li class="table__pagination--page-button">
                                    <div class="icon--20 icon--button icon--angle-left" @click="this.detailsStore.pagination.prevPage"
                                        :class="{'disabled': this.detailsStore.pagination.page == 1}"></div>
                                </li>
                                <li class="table__pagination--page-button"><p>{{ this.detailsStore.pagination.page }} </p></li>

                                <li class="table__pagination--page-button">
                                    <div class="icon--20 icon--button icon--angle-right" @click="this.detailsStore.pagination.nextPage"
                                        :class="{'disabled': this.detailsStore.pagination.page >= this.detailsStore.getMaxPage}"></div>
                                </li>
                            </ul>
                        </div>
                    </td>
                    <td class="ta-right">{{ this.$MHelper.formatNumber(this.detailsStore.totalCost) }}</td>
                    <td class="ta-right">{{ this.$MHelper.formatNumber(this.detailsStore.totalRemainingValue) }}</td>
                    <td class="ta-center" colspan="3"></td>
                </tr>
            </template>
        </m-table>
    </div>

    <Teleport to="#app">
        <m-dialog v-if="showDeleteConfirmDialog"
            :message="deleteConfirmMessage"
            :buttonText="this.$MResource.Dialog.Delete.BtnConfirm"
            :buttonFunction="onDeleteDocument">
            <template #outline-button>
                <m-pri-button
                    buttonClass="outline-button"
                    :text="this.$MResource.Dialog.Delete.BtnCancel"
                    @click="onCloseDeleteConfirmDialog"
                ></m-pri-button>
            </template> 
        </m-dialog>

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
    export default {
        name: "AssetTransferTable",

        setup () {
            const store = TransferDocumentStore();
            const detailsStore = TransferDocumentDetailsStore();
            store.get();
            store.getTotalRecords();
            store.calculateTotal();

            // detailsStore.calculateTotal();
            return {store, detailsStore}
        },

        mounted () {
            this.debounceFilter = this.$MHelper.debounce(this.applyFilter, 500);
        },

        watch: {
            'store.items': function(val){
                this.store.calculateTotal();
                if (val.length > 0) {
                    if (!this.documentSelected) {
                        this.documentSelected = val[0].document_id
                        this.getDocumentDetails()
                    }
                }
                else {
                    this.documentSelected = null
                    this.detailsStore.items = []
                }
            },
            'store.pagination.page': function(){
                this.store.get();
            },
            'store.pagination.recordPerPage': function(newVal, oldVal){
                this.store.pagination.page = Math.ceil(oldVal * this.store.pagination.page / newVal);

                var totalPage = this.store.getMaxPage;
                if (this.store.pagination.page > totalPage) this.store.pagination.page = totalPage;
                if (this.store.pagination.page == 0) this.store.pagination.page = 1;

                this.store.get();
            },

            'store.searchText': function(){
                this.debounceFilter()
            },

            'detailsStore.items': function(){
                this.detailsStore.getTotalRecords();
                this.detailsStore.calculateTotal();
            },

            'detailsStore.pagination.page': function(){
                this.detailsStore.get();
            },
            
            'detailsStore.pagination.recordPerPage': function(newVal, oldVal){
                this.detailsStore.pagination.page = Math.ceil(oldVal * this.detailsStore.pagination.page / newVal);

                var totalPage = this.detailsStore.getMaxPage;
                if (this.detailsStore.pagination.page > totalPage) this.detailsStore.pagination.page = totalPage;
                if (this.detailsStore.pagination.page == 0) this.detailsStore.pagination.page = 1;

                this.detailsStore.get();
            },
        },

        data() {
            return {
                showDetail: false,
                showForm: false,
                documentSelected: "",
                showDeleteConfirmDialog: false,
                deleteConfirmMessage: "",
                selected: [],
            }
        },

        methods: {
            /**
             * Lấy danh sách dữ liệu sau filter
             * @return không
             * createdBy: NXHinh (28/09/2023)
             */
             async applyFilter() {
                this.store.page = 1;
                await this.store.getTotalRecords()
                await this.store.get();
            },

            /**
             * Thay đổi hiển thị bảng chi tiết
             * @return không
             * createdBy: NXHinh (18/10/2023)
             */
            onToggleShowDetail() {
                this.showDetail = !this.showDetail
            },

            /**
             * Hiển thị form thêm 
             * @return không
             * createdBy: NXHinh (18/10/2023)
             */
            async onShowAssetTransferForm(formMode = this.$MEnum.FormMode.Add, document_id = "") {
                if (formMode == this.$MEnum.FormMode.Edit) {
                    await this.store.getById(document_id)
                    this.detailsStore.document_id = document_id
                    await this.detailsStore.get()
                    this.$router.push("transfer/form")
                }
                else {
                    await this.store.newItem()
                    await this.store.getNewCode()
                    this.detailsStore.items = []
                    this.$router.push("transfer/form")
                }
            },

            /**
             * Lựa chọn chứng từ
             * @return không
             * createdBy: NXHinh (25/10/2023)
             */ 
            onSelectDocument(document_id) {
                this.documentSelected = document_id
                if (this.showDetail) this.onShowDetails()
            },

            /**
             * Hiển thị chi tiết chứng từ
             * @return không
             * createdBy: NXHinh (25/10/2023)
             */
            onShowDetails() {
                this.detailsStore.pagination.page = 1
                this.getDocumentDetails()
                this.showDetail = true
            },

            /**
             * Lấy thông tin chứng từ chi tiết
             * @return không
             * createdBy: NXHinh (25/10/2023)
             */
            getDocumentDetails() {
                this.detailsStore.document_id = this.documentSelected
                if (this.detailsStore.document_id) {
                    this.detailsStore.get()
                }
                else {
                    this.detailsStore.items = []
                }
            },

            /**
             * Hiển thị Dialog xác nhận xóa
             * @return không
             * createdBy: NXHinh (25/10/2023)
             */
            onShowDeleteConfirmDialog(document) {
                this.store.selected.push(document.document_id)
                this.showDeleteConfirmDialog = true
                this.deleteConfirmMessage = `Bạn có muốn xóa chứng từ ${document.document_code} không?`
            },

            /**
             * Ẩn Dialog xác nhận xóa
             * @return không
             * createdBy: NXHinh (25/10/2023)
             */
            onCloseDeleteConfirmDialog() {
                this.showDeleteConfirmDialog = false
            },

            /**
             * Xóa chứng từ
             * @return không
             * createdBy: NXHinh (25/10/2023)
             */
            async onDeleteDocument() {
                var ids = this.store.selected
                await this.store.deleteMany(ids)

                if (!this.store.error) {
                    let successMsg = this.$MResource.SuccessMsg.DeletedSuccess
                    this.$emitter.emit("onShowToast",this.$ToastTypeEnum.Success, successMsg)
                }
                else {
                    console.log(this.store.error)
                }

                this.store.selected = []
                this.onCloseDeleteConfirmDialog()

                // Lấy dữ liệu sau khi xóa
                await this.store.getTotalRecords()
                await this.store.get()
                // Kiểm tra lại giá trị trang
                var totalPage = this.store.getMaxPage;
                if (this.store.page > totalPage) this.store.page = totalPage
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
                    return this.store.items ? this.store.selected.length == this.store.items.length && this.store.selected.length > 0 : false;
                },
                set: function (value) {
                    var selected = [];

                    if (value) {
                        this.store.items.forEach(function (asset) {
                            selected.push(asset.document_id);
                        });
                    }
                    this.store.selected = selected;
                }
            }
        }
    }
</script>


<style scoped>
    @import url(./asset_transfer_table.css);
</style>