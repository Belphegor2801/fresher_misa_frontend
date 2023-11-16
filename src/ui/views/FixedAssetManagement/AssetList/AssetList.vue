<template>
    <div class="tool-bar">
        <div class="tool-bar__search-bar">
            <m-input 
                ref="searchBar"
                width="190px"
                :tabindex="1"
                iconBefore="icon--search" 
                placeholder="Tìm kiếm tài sản"
                :required="false"
                :hasClearIcon="true"
                :showError="false"
                v-model:valueInput="this.store.searchText"
            ></m-input>

            <m-combo-box
                ref="assetCategoryFilterBar"
                type="filter"
                :tabindex="2"
                placeholder="Loại tài sản"
                iconBefore="icon--filter"
                :hasClearIcon="true"
                :options=this.fixedAssetCategoryStore.nameList
                v-model:valueInput="this.store.categoryFilter"
            ></m-combo-box>

            <m-combo-box
                ref="this.store.departmentFilterBar"
                type="filter"
                :tabindex="3"
                placeholder="Bộ phận sử dụng"
                iconBefore="icon--filter"
                :hasClearIcon="true"
                :options=this.departmentStore.nameList
                v-model:valueInput="this.store.departmentFilter"
            />   
    
        </div>
        <div class="tool-bar__button-bar">
            <m-pri-button text="Thêm tài sản" 
                :tabindex="4"
                icon="icon--plus" @click="onShowAssetForm()">
            </m-pri-button>
            <div>
                <m-tooltip text="Xuất file Excel">
                    <template #content>
                        <m-icon-button icon="icon--excel" 
                            :tabindex="5"
                            @click="this.store.exportToExcel()">
                        </m-icon-button>
                    </template>
                </m-tooltip>
            </div>
            <div>
                <m-tooltip text="Xóa">
                    <template #content>
                        <m-icon-button icon="icon--delete-red" 
                            :tabindex="6"
                            @click="onShowDeleteConfirmDialog"/>
                    </template>
                </m-tooltip>
            </div>
        </div>
    </div>

    <div class="table-container" ref="assetsTable">
        <Teleport to="#app">
            <h-loading v-if="this.store.loading"></h-loading>
        </Teleport>
        <table class="table--asset-list">
            <thead>
                <tr class="ignore-focus">
                    <td class="ta-left">
                        <m-checkbox v-model:valueInput="selectAll"></m-checkbox>
                        <!-- <input type="checkbox" v-model="selectAll" > -->
                    </td>
                    <td  class="ta-center" tooltip="Số thứ tự">
                        {{ this.$MResource.AssetTable.Index }}
                    </td>
                    <td class="ta-left">
                        {{ this.$MResource.AssetTable.AssetId }}
                    </td>
                    <td class="ta-left">
                        {{ this.$MResource.AssetTable.AssetName }}
                    </td>
                    <td class="ta-left">
                        {{ this.$MResource.AssetTable.AssetTypeName }}
                    </td>
                    <td class="ta-left">
                        {{ this.$MResource.AssetTable.AssetDepartmentName }}
                    </td>
                    <td class="ta-right">
                        {{ this.$MResource.AssetTable.AssetQuantity }}
                    </td>
                    <td class="ta-right">
                        {{ this.$MResource.AssetTable.AssetHistoricalCost }}
                    </td>
                    <td class="ta-right">
                        <m-tooltip class="float-right" :text=this.$MResource.AssetTable.AccumulatedDepreciationTooltip>
                            <template #content>
                                {{ this.$MResource.AssetTable.AccumulatedDepreciation }}
                            </template>
                        </m-tooltip>
                        
                    </td>
                    <td class="ta-right">
                        {{ this.$MResource.AssetTable.AssetRemainingValue }}
                    </td>
                    <td class="ta-center">
                        {{ this.$MResource.AssetTable.Tool }}
                    </td>
                </tr>
            </thead>
            <div class="table__empty" v-if="this.store.items.length == 0">
                    <div class="table__empty--text" > {{ this.$MResource.AssetTable.AssetTableEmpty }}</div>
                </div>
            <tbody v-else>
                <tr v-for="(item, index) in this.store.items" :key="item.fixed_asset_id" 
                    @contextmenu="onShowContextMenu(item, $event)" >
                    <td class="ta-center">
                        <!-- <input type="checkbox" v-model="store.selected" :value="item.fixed_asset_id" /> -->
                        <m-checkbox v-model:valueInput="store.selected" :value="item.fixed_asset_id" ></m-checkbox>
                    </td>
                    <td class="ta-center">{{ index + 1 + (this.store.pagination.page - 1) * (this.store.pagination.recordPerPage)  }}</td>
                    <td class="ta-left">{{ item.fixed_asset_code }}</td>
                    <td class="ta-left">{{ item.fixed_asset_name }}</td>
                    <td class="ta-left">{{ item.fixed_asset_category_name }}</td>
                    <td class="ta-left">
                        <m-tooltip :text= "item.department_name">
                            <template #content>
                               <a> {{ item.department_name }} </a>
                            </template>
                        </m-tooltip>
                    </td>
                    <td class="ta-right">
                        {{ this.$MHelper.formatNumber(item.quantity) }}
                    </td>
                    <td class="ta-right">
                        {{ this.$MHelper.formatNumber(item.cost)}}
                    </td>
                    <td class="ta-right">
                        {{ this.$MHelper.formatNumber(item.accumulated_depreciation) }}
                    </td>
                    <td class="ta-right">
                        {{ this.$MHelper.formatNumber(item.remaining_value) }}
                    </td>
                    <td class="ta-center">
                        <div class="hide">
                            <m-tooltip text="Chỉnh sửa tài sản">
                                <template #content>
                                    <div class="icon--20 icon--button icon--edit" @click="onShowAssetForm(item.fixed_asset_id)"></div>
                                </template>
                            </m-tooltip>

                            <m-tooltip text="Nhân bản tài sản">
                                <template #content>
                                    <div class="icon--20 icon--button icon--detail" @click="onShowAssetForm(item.fixed_asset_id, this.$MEnum.FormMode.Duplicate)"></div>
                                </template>
                            </m-tooltip>
                        </div>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr class="ignore-focus">
                    <td colspan="6">
                        <div class="table__pagination">
                            <div class="table__pagination--text">Tổng số: <b>{{ this.$MHelper.formatNumber(this.store.totalRecords) }}</b> bản ghi</div>
                            <div class="table__pagination--input">
                                <m-combo-box
                                    type="select"
                                    :markSelect="false"
                                    :dataAbove="true" 
                                    :tabindex="10"
                                    :placeholder=this.store.getRecordPerPageList[0].label.toString()
                                    :options=this.store.getRecordPerPageList
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
                    <td class="ta-right">{{ this.$MHelper.formatNumber(this.store.totalQuantity) }}</td>
                    <td class="ta-right">{{ this.$MHelper.formatNumber(this.store.totalCost) }}</td>
                    <td class="ta-right">{{ this.$MHelper.formatNumber(this.store.totalAccumulatedDepreciation) }}</td>
                    <td class="ta-right">{{ this.$MHelper.formatNumber(this.store.totalRemainingValue) }}</td>
                    <td class="ta-center">
                    </td>
                </tr>
            </tfoot>
        </table> 
        
    </div>
    
    <Teleport to="#app">
        <m-context-menu
            v-if="showContextMenu"
            :x="contextMenuPosition.x"
            :y="contextMenuPosition.y"
            v-model:show="showContextMenu"
            @add="onShowAssetForm()"
            @edit="onShowAssetForm(this.contextMenuTarget)"
            @delete="onShowContextMenuDeleteConfirmDialog()"
            @duplicate="onShowAssetForm(this.contextMenuTarget, this.$MEnum.FormMode.Duplicate)"
            :tool="{
                add: true,
                edit: true,
                delete: true,
                duplicate: true,
            }"
        ></m-context-menu>


        <m-dialog v-if="showDeleteConfirmDialog && this.store.selected.length == 0"
            :message="this.$MResource.Dialog.Delete.NoSelectedMessage"
            :buttonText="this.$MResource.Dialog.Delete.BtnClose"
            :buttonFunction="onCloseDeleteConfirmDialog">
        </m-dialog>

        <m-dialog v-if="showDeleteConfirmDialog && this.store.selected.length > 0"
            :message="deleteConfirmMessage"
            :buttonText="this.$MResource.Dialog.Delete.BtnConfirm"
            :buttonFunction="onDelete">
            <template #outline-button>
                <m-pri-button
                    buttonClass="outline-button"
                    :text="this.$MResource.Dialog.Delete.BtnCancel"
                    @click="onCloseDeleteConfirmDialog"
                ></m-pri-button>
            </template> 
        </m-dialog>

        <m-dialog v-if="showContextMenuDeleteConfirmDialog"
            :message="deleteConfirmMessage"
            :buttonText="this.$MResource.Dialog.Delete.BtnConfirm"
            :buttonFunction="() => onDeleteByContextMenu()">
            <template #outline-button>
                <m-pri-button
                    buttonClass="outline-button"
                    :text="this.$MResource.Dialog.Delete.BtnCancel"
                    @click="() => this.showContextMenuDeleteConfirmDialog = false"
                ></m-pri-button>
            </template> 
        </m-dialog>

        <m-dialog v-if="this.store.error"
            :message="this.store.error"
            :buttonText="this.$MResource.Dialog.Delete.BtnClose"
            :buttonFunction="onCloseErrorDialog">
        </m-dialog>
    </Teleport>
</template>

<script>
    import { defineComponent } from "vue";
    export default defineComponent({
        name: "AssetList",
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
        
        mounted () {
            this.focusOnSearchBar();
            this.debounceFilter = this.$MHelper.debounce(this.applyFilter, 500)

            const el = this.$refs.assetsTable;
            el.addEventListener('scroll', () => {
                this.currentScrollValue = el.scrollTop;
            });
        },

        watch: {
            'store.items': function(){
                this.store.calculateTotal();
            },
            'store.pagination.page': function(){
                this.store.get();
            },
            'store.pagination.recordPerPage': function(newVal, oldVal){
                var maxScrollValue = this.$refs.assetsTable.scrollHeight - 847;
                var ratio = (this.currentScrollValue ?? 0) / maxScrollValue;

                var itemCountCurrentPage = Math.min(this.store.items.length, oldVal)
                this.store.pagination.page = Math.ceil((ratio * itemCountCurrentPage + oldVal * (this.store.pagination.page - 1))/ newVal);

                var totalPage = this.store.getMaxPage;
                if (this.store.pagination.page > totalPage) this.store.pagination.page = totalPage;
                if (this.store.pagination.page == 0) this.store.pagination.page = 1;

                this.store.get();
                this.$refs.assetsTable.scrollTop = 0
            },
            'store.searchText': function(){
                this.debounceFilter()
            },
            'store.categoryFilter': async function(){
                await this.applyFilter()
            },
            'store.departmentFilter': async function(){
                await this.applyFilter()
            },
            'store.formOpen': function(val){
                if (!val) this.focusOnSearchBar();
            },
        },

        data() {
            return {
                currentScrollValue: 0,
                showDeleteConfirmDialog: false,
                showContextMenuDeleteConfirmDialog: false,
                deleteConfirmMessage: "",
                showContextMenu: false,
                // đối tượng đc target
                contextMenuPosition: {
                    x: 0, y: 0
                }
            }
        },
        methods: {
            /**
             * Focus vào SearchBar
             * @return không
             * createdBy: NXHinh (21/09/2023)
             */
            focusOnSearchBar() {
                this.$refs.searchBar.focusOnInput()
            },
            /**
             * Lấy danh sách dữ liệu sau filter
             * @return không
             * createdBy: NXHinh (28/09/2023)
             */
            async applyFilter() {
                this.store.pagination.page = 1;
                await this.store.getTotalRecords()
                await this.store.get();
            },

            /**
             * Về trang trước
             * @return không
             * createdBy: NXHinh (18/09/2023)
             */
             prevPage(){
                console.log("prevPage")
                this.store.pagination.page -= 1;
                if (this.store.pagination.page < 1) this.store.pagination.page = 1
            },

            /**
             * Sang trang trước
             * @return không
             * createdBy: NXHinh (18/09/2023)
             */
            nextPage(){
                console.log("nextPage")
                var totalPage = this.store.getMaxPage;
                this.store.pagination.page += 1;
                if (this.store.pagination.page > totalPage) this.store.pagination.page = totalPage
            },

            /**
             * Mở Dialog xác nhận xóa tài sản
             * @return không
             * createdBy: NXHinh (18/09/2023)
             */
            async onShowDeleteConfirmDialog() {
                if (this.store.selected.length == 1) {
                    var fixed_asset_id = this.store.selected[0];
                    await this.store.getById(fixed_asset_id);
                    var fixed_asset_code = this.store.item.fixed_asset_code;
                    var fixed_asset_name = this.store.item.fixed_asset_name;
                    this.deleteConfirmMessage = this.$MResource.Dialog.Delete.OneSelectedMessage
                                                .replace("{asset_code}", fixed_asset_code)
                                                .replace("{asset_name}", fixed_asset_name)
                }
                else {
                    this.deleteConfirmMessage = this.$MResource.Dialog.Delete.ManySelectedMessage
                                                .replace("{quantity}", this.store.selected.length.toString())
                }
                
                this.showDeleteConfirmDialog = true;
            },
            /**
             * Đóng Dialog xác nhận xóa tài sản
             * @return không
             * createdBy: NXHinh (18/09/2023)
             */
            onCloseDeleteConfirmDialog() {
                this.showDeleteConfirmDialog = false;
            },

            /**
             * Xóa tài sản
             * @return không
             * createdBy: NXHinh (18/09/2023)
             */
            async onDelete() {
                var ids = this.store.selected
                await this.store.deleteMany(ids)
                if (!this.store.error) {
                    let successMsg = this.$MResource.SuccessMsg.DeletedSuccess
                    this.$emitter.emit("onShowToast",this.$ToastTypeEnum.Success, successMsg)
                }

                this.store.selected = []
                this.onCloseDeleteConfirmDialog()

                // Lấy dữ liệu sau khi xóa
                await this.store.getTotalRecords()
                await this.store.get()
                // Kiểm tra lại giá trị trang
                var totalPage = this.store.getMaxPage;
                if (this.store.pagination.page > totalPage) this.store.pagination.page = totalPage
            },

            /**
             * Xóa 1 tài sản bởi context Menu
             * @return không
             * createdBy: NXHinh (18/09/2023)
             */
            async onDeleteByContextMenu() {
                await this.store.delete(this.contextMenuTarget)
                if (!this.store.error) {
                    let successMsg = this.$MResource.SuccessMsg.DeletedSuccess
                    this.$emitter.emit("onShowToast",this.$ToastTypeEnum.Success, successMsg)
                }
                this.showContextMenuDeleteConfirmDialog = false

                // Lấy dữ liệu sau khi xóa
                await this.store.getTotalRecords()
                await this.store.get()
                // Kiểm tra lại giá trị trang
                var totalPage = this.store.getMaxPage;
                if (this.store.pagination.page > totalPage) this.store.pagination.page = totalPage
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
             * hiện context menu
             * @param {*}  của item
             * createdBy: NXHinh (30/09/2023)
             */
            onShowContextMenu(item, event) {
                try {
                    event.preventDefault();
                    // chặn event click outside
                    event.stopPropagation();
                    // ẩn excel box

                    // đối tượng đc target
                    this.contextMenuTarget = item.fixed_asset_id;
                    this.contextMenuTargetCode = item.fixed_asset_code;
                    this.contextMenuTargetName = item.fixed_asset_name;
                    // gán vị trí của context menu
                    this.contextMenuPosition.x = event.x;

                    this.contextMenuPosition.y = event.y;

                    this.showContextMenu = true;
                } catch (error) {
                    console.log("showContextMenu ~ error:", error);
                }
            },


            /**
             * ẩn context menu
             * createdBy: NXHinh (30/09/2023)
             */
            onCloseContextMenu() {
                this.showContextMenu = false;
            },

            /**
             * hiện thị dialog xác nhận xóa khi chọn ở context menu
             * createdBy: NXHinh (30/09/2023)
             */
            onShowContextMenuDeleteConfirmDialog() {
                this.showContextMenuDeleteConfirmDialog = true,
                this.deleteConfirmMessage = this.$MResource.Dialog.Delete.ContextMenuSelectedMessage
                                                .replace("{asset_code}", this.contextMenuTargetCode)
                                                .replace("{asset_name}", this.contextMenuTargetName)
            },

            /**
             * kiểm tra text quá dài và overflow ellipse
             * createdBy: NXHinh (30/09/2023)
             */
            isEllipsisActive(e) {
                return (e.offsetWidth < e.scrollWidth);
            },

            /**
             * Mở form tài sản
             * @param {assetId}: Id của tài sản cần sửa
             * @param {formMode}: Dạng form
             * @return không
             * createdBy: NXHinh (18/08/2023)
             */
            async onShowAssetForm(assetId, formMode = this.$MEnum.FormMode.Edit) {
                // Nếu có id thì là form sửa/form nhân bản
                if (assetId){
                    this.store.formMode = formMode
                    await this.store.getById(assetId)

                    if (formMode == this.$MEnum.FormMode.Duplicate) {
                        await this.store.getNewCode();
                    }
                }
                else {
                    this.store.formMode = this.$MEnum.FormMode.Add
                    await this.store.newItem();
                    await this.store.getNewCode();
                }
                this.store.formOpen = true
            },
        },

        computed: {
            /**
             * Chọn/Bỏ chọn toàn bộ Checkbox
             * @return không
             * createdBy: NXHinh (21/08/2023)
             */
            selectAll: {
                get: function () {
                    var selectedInThisPage = 
                    this.store.selected.filter(x => this.store.items.map(i => i.fixed_asset_id).includes(x));
                    return this.store.items ? selectedInThisPage.length == this.store.items.length && selectedInThisPage.length > 0 : false;
                },
                set: function (value) {
                    var selected = this.store.selected.filter(x => !this.store.items.map(i => i.fixed_asset_id).includes(x));;

                    if (value) {
                        this.store.items.forEach(function (asset) {
                            selected.push(asset.fixed_asset_id);
                        });
                    }
                    this.store.selected = selected;
                }
            }
        }
    })
</script>

<style scoped>
    @import url(./toolbar.css);
    @import url(./assetlist.css);
</style>