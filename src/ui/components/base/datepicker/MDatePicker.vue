<template>
    <div class="datepicker">
        <label v-if="label" :class= "{'required': required}">
            <a @click="focusOnInput()">{{label}}</a>
        </label>

        <div class="datepicker__input">
            <ElConfigProvider :locale="locale" >
                <ElDatePicker
                    v-model="this.valueOutput"
                    type="date"
                    :placeholder="placeholder"
                    :tabindex="tabindex"
                    format="DD/MM/YYYY"
                    :clearable="false"
                    :default-value="new Date(this.valueOutput)"
                    :popper-options="{ boundariesElement: 'body' }"
                    :class="{'elDatePickerClass': 1, 'error': isError}"
                    :disabled="disabled"
                    ref="elDatePicker"
                    @keydown="keyDownEvent($event)"
                    @blur="validateInput()"
                    :style="{'width': this.width? this.width: '100%'}"
                >
                </ElDatePicker>
            </ElConfigProvider>

            <i class="icon--18 icon--button icon--calender" 
                :class="disabled? 'disabled':''"
                @click="focusOnInput()"
            ></i>
        </div>

        <p class="text--error" :class="{'error-hidden': !isError}"> {{ errorText }}</p>
    </div>
</template>

<style scoped>
    @import url("./datepicker.css");
</style>


<script>
import "element-plus/dist/index.css";
import "./ELDatePicker.css";
import { ElDatePicker, ElConfigProvider } from "element-plus";

import vi from "element-plus/dist/locale/vi.mjs";
import "dayjs/locale/vi";

vi.el.datepicker.year = "";

export default {
    name: "MDatePicker",
    components: {
        ElDatePicker,
        ElConfigProvider,
    },
    data() {
        return {
            showDatePicker: null, // hiển thị bảng chọn ngày tháng
            elDatePickerClass: "",
            valueOutput: null,
            isError: false,
            errorText: false,
        };
    },
    props: {
        label: {
            type: String,
            default: "",
        },
        placeholder: {
            type: String,
            default: "",
        },
        // bắt buộc nhập
        required: {
            type: Boolean,
            default: false,
        },
        value: {
            type: String,
            default: "",
        },
        // disable input
        disabled: {
            type: Boolean,
            default: false
        },
        width: {
            type: String,
            default: "",
        },
        // canh lề phải
        textRight: {
            type: Boolean,
            default: false,
        },
        tabindex: {
            type: Number,
            default: 0,
        },
        valueInput: {
            value: [Number, String, Array, Date],
            default: null,
        },
    },
    created() {
        this.valueOutput = this.valueInput
    },

    watch: {
        valueOutput: function(val) {
            const time = new Date()
            try {
                val.setHours(time.getHours(), time.getMinutes(), time.getSeconds())
            }
            catch {}
            this.$emit("update:valueInput", val );
        },
        valueInput: function(val) {
            this.valueOutput = val
        },
    },
    methods: {

        /**
         * focus vào input
         * @return: không
         * Author: nxhinh (02/10/2023)
         */
        focusOnInput() {
            try {
                this.$refs.elDatePicker.focus();
            } catch (error) {
                console.log("focus ~ error:", error);
            }
        },
        /**
         * Xử lý sự kiện keydown
         * @param {*} event event
         * @return: không
         * Author: nxhinh (02/10/2023)
         */
        keyDownEvent(event) {
            if (
                event.key === "ArrowUp" ||
                event.key === "ArrowRight" ||
                event.key === "ArrowLeft"
            ) {
                event.preventDefault();
                this.$refs.elDatePicker.handleOpen();
            }
        },

        /**
         * validate Input
         * @return khồn
         * Author: NXHinh (02/10/2023)
         */
        validateInput() {
            if(this.required && !this.valueOutput){
                this.isError = true;
                this.errorText = this.$MResource.ErrorMsg.FieldEmpty
            } 
            else{
                this.isError = false
            }
        },
    },
    // Đổi ngôn ngữ datepicker
    setup() {
        return {
            locale: vi,
        };
    },
};
</script>
