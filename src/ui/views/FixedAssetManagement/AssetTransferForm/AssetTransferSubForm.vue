<template>
    <div class="dialog-container" ref="asset_transfer_sub_form" v-on:keydown.escape="onCloseAssetTransferSubForm($event)">
        <div class="dialog-background"></div>
        <div class="at-sub-form-container">
            <div class="at-sub-form__header">
                <p class="at-form__header--title"> Chọn tài sản điều chuyển </p>
                <i class="icon--36 icon--button icon--close"
                    @click="onCloseAssetTransferSubForm"
                ></i>
            </div>
            <div class="at-sub-form__body">
                <m-table :store="this.store" :items="this.store.items">
                    <template #table--header>
                        <tr class="ignore-focus">
                            <td class="ta-left">
                                <m-checkbox v-model:valueInput="selectAll"></m-checkbox>
                                <!-- <input type="checkbox" v-model="selectAll" > -->
                            </td>
                            <td  class="ta-center table__columns--index" tooltip="Số thứ tự">
                                {{ this.$MResource.TableColumns.Index }}
                            </td>
                            <td class="ta-left">
                                {{ this.$MResource.TableColumns.FixedAssetCode }}
                            </td>
                            <td class="ta-center">
                                {{ this.$MResource.TableColumns.FixedAssetName }}
                            </td>
                            <td class="ta-left">
                                {{ this.$MResource.TableColumns.DepartmentName }}
                            </td>
                            <td class="ta-right">
                                {{ this.$MResource.TableColumns.Cost }}
                            </td>
                            <td class="ta-right">
                                {{ this.$MResource.TableColumns.RemainingValue }}
                            </td>
                            
                            <td class="ta-center">
                                {{ this.$MResource.TableColumns.TrackedYear }}
                            </td>
                        </tr>
                    </template>

                    <template #table--body>
                        <tr v-for="(item, index) in this.store.items" :key="item.fixed_asset_id"
                            class="cursor--pointer"
                            :class="isAdded(item)? 'disabled': ''">
                            <td class="ta-center">
                                <!-- <input type="checkbox" v-model="selected" :value="item.fixed_asset_id" /> -->
                                <m-checkbox v-model:valueInput="selected" objectKey="fixed_asset_id"
                                    :value="item" :disabled="isAdded(item)"
                                ></m-checkbox>
                            </td>
                            <td class="ta-center" @click="selectItem(item)">
                                {{ index + 1 + (this.store.pagination.page - 1) * (this.store.pagination.recordPerPage)  }}
                            </td>
                            <td class="ta-left" @click="selectItem(item)">{{ item.fixed_asset_code }}</td>
                            <td class="ta-left" @click="selectItem(item)">{{ item.fixed_asset_name }}</td>
                            <td class="ta-left" @click="selectItem(item)">
                                <m-tooltip :text= "item.department_name">
                                    <template #content>
                                    <a> {{ item.department_name }} </a>
                                    </template>
                                </m-tooltip>
                            </td>
                            <td class="ta-right" @click="selectItem(item)">
                                {{ this.$MHelper.formatNumber(item.cost)}}
                            </td>
                            <td class="ta-right" @click="selectItem(item)">
                                {{ this.$MHelper.formatNumber(item.remaining_value) }}
                            </td>
                            <td class="ta-center" @click="selectItem(item)">
                                {{ item.tracked_year }}
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
                                        ></m-combo-box>   
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
                            <td class="ta-center" colspan="1"></td>
                        </tr>
                    </template>
                </m-table>

                <div class="at-sub-form__body--input">
                    <m-combo-box
                        label="Bộ phận sử dụng mới"
                        ref="document_code"
                        width="250px"
                        :tabindex="1"
                        placeholder="Bộ phận sử dụng mới"
                        :required="true"
                        :showError="true"
                        :hasClearIcon="true"
                        :dataAbove="true"
                        :options="this.$departmentStore.nameList"
                        v-model:valueInput="this.newDepartment"
                    ></m-combo-box>

                    <m-input :style=" {'width': '100%'}"
                        label="Ghi chú"
                        ref=""
                        :tabindex="1"
                        placeholder="Nhập ghi chú"
                        :hasClearIcon="true"
                        :required="false"
                        v-model:valueInput="this.reason"
                    ></m-input>
                </div>
            </div>
            <div class="at-sub-form__footer">
                <a></a>
                <div class="at-sub-form__footer--buttons">
                    <m-pri-button 
                        type="button"
                        buttonClass="outline-button"
                        :tabindex="23"
                        text="Hủy" 
                        @click="onCloseAssetTransferSubForm"
                    ></m-pri-button>
                    <m-pri-button 
                        type="button"
                        buttonClass="main-button"
                        ref="save_button"
                        :tabindex="22"
                        text="Đồng ý"
                        @click="onSelectFixedAssets"
                    ></m-pri-button>
                </div>
            </div>
        </div>
    </div>

    <m-dialog v-if="this.error"
        :message="this.error"
        :buttonText="this.$MResource.Dialog.Delete.BtnClose"
        :buttonFunction="onCloseErrorDialog">
    </m-dialog>
</template>

<script>
    import TransferDocumentStore from "@/core/store/TransferDocumentStore.ts";
    import TransferDocumentDetailsStore from "@/core/store/TransferDocumentDetailsStore.ts";
    import FixedAssetStore from "@/core/store/FixedAssetStore.ts";
    export default {
        name: "AssetTransferSubForm",

        setup () {
            const store = FixedAssetStore();
            const detailsStore = TransferDocumentDetailsStore();
            return {store, detailsStore}
        },

        mounted () {
            this.$refs.asset_transfer_sub_form.focus();

            this.store.itemsNotInclude = ""
            this.detailsStore.tempSelected.forEach(item => {
                this.store.itemsNotInclude += `'${item.fixed_asset_id}',`
            });
            this.store.itemsNotInclude = this.store.itemsNotInclude.slice(0, -1)

            this.store.get();
            this.store.getTotalRecords();
        },

        data() {
            return {
                newDepartment: "",
                reason: "",
                error: "",
                selected: [],
            }
        },

        watch: {
            'store.items': function(){
                this.store.calculateTotal();
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
        },
        

        methods: {
            /**
             * Chọn tài sản
             * @return không
             * createdBy: NXHinh (15/11/2023)
             */
            selectItem(item) {
                if (!this.selected.includes(item))
                    this.selected.push(item)
            },

            /**
             * Kiểm tra xem tài sản đã được add chưa
             * @return không
             * createdBy: NXHinh (25/10/2023)
             */
            isAdded(item) {
                return this.detailsStore.tempSelected.find(x => x.fixed_asset_id == item.fixed_asset_id)
            },
            /**
             * Ẩn form điều chuyển tài sản
             * @return không
             * createdBy: NXHinh (18/10/2023)
             */
            onCloseAssetTransferSubForm(event) {
                // this.$router.push('/assets/transfer/form')
                event.preventDefault();
                event.stopPropagation();
                this.$emit("close")
            },

            /**
             * Đóng Dialog thông báo lỗi
             * @return không
             * createdBy: NXHinh (18/09/2023)
             */
            onCloseErrorDialog() {
                this.error = ""
            },

            /**
             * validate input
             * @return không
             * author: NXHinh (30/10/2023)
             */
            validateForm() {
                Object.values(this.$refs).forEach((value) => {
                    try {
                        value.validateInput()
                    }
                    catch {}
                });
                if (this.selected.length == 0){
                    this.error = "Bạn chưa chọn tài sản điều chuyển"
                }
                else {
                    this.selected.forEach(item => {
                        if (item.department_name == this.newDepartment) {
                            this.error = "Vui lòng chọn bộ phận sử dụng mới khác với bộ phận sử dụng tài sản."
                        }
                    });
                }

                if (!this.newDepartment) {
                    this.error = "Vui lòng chọn bộ phận sử dụng mới!"
                }
            },

            /**
             * Chọn thêm tài sản
             * @return không
             * createdBy: NXHinh (25/10/2023)
             */
            onSelectFixedAssets(){
                this.validateForm()
                var isValidForm = true;
                Object.values(this.$refs).forEach((value) => {
                    if (value.isError) {
                        isValidForm = false
                    }
                });

                // Nếu form hợp lệ thì lưu
                if (isValidForm && !this.error) {
                    this.$emit("close")
                    this.selected.forEach(item => {
                        if (!this.isAdded(item)) {
                            item.department_before_id = item.department_id
                            item.department_before_name = item.department_name
                            item.department_after_id = this.$departmentStore.items.find(x => x.department_name == this.newDepartment).department_id
                            item.department_after_name = this.newDepartment
                            item.reason = this.reason
                            this.detailsStore.tempSelected.push(item)

                        }
                    }); 
                }
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
                    // Đọc danh sách đang được chọn ở trang hiện tại
                    const selectedInThisPage = 
                        this.selected.filter(x => this.store.items.map(i => i.fixed_asset_id).includes(x.fixed_asset_id));
                    return this.store.items ? selectedInThisPage.length == this.store.items.length && selectedInThisPage.length > 0 : false;
                },
                set: function (value) {
                    // Làm mới danh sách đang được chọn ở trang hiện tại
                    var selected = this.selected.filter(x => !this.store.items.map(x => x.fixed_asset_id).includes(x.fixed_asset_id));

                    // Thêm danh sách đang được chọn ở trang hiện tại
                    if (value) {
                        this.store.items.forEach(function (asset) {
                            if (!selected.includes(asset)) {
                                selected.push(asset);
                            }
                        });
                    }
                    this.selected = selected;
                }
            }
        }
    }
</script>

<style scoped>
    @import url(./asset_transfer_sub_form.css);
</style>