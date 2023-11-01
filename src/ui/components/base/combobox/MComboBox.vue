<template>
    <div>
        <label v-if="label" :class= "{'required': required}"> 
            <a @click="focusOnInput()">{{label}}</a>
        </label>
        <div class="combo-box" @keydown="selectWithKey($event)"
            :style="{'width': width}"
            :class="{extend: showOptions, 'combo-box--filter': type==='filter', 'combo-box--select': type==='select'}"
        >
            <m-input v-if="this.type != 'select'" :iconBefore="iconBefore" 
                ref="comboBoxBtn"
                :placeholder="placeholder" 
                @focusin="onShowOptions"
                @focusout="onHideOptions"
                :tabindex="tabindex" 
                :required="required"
                :showError="showError"
                v-model:valueInput="this.valueOutput"
                :hasClearIcon="hasClearIcon"
                :iconAfter="showOptions? 'icon--caret-up': 'icon--caret-down'"
                :iconAfterFunction="onToggleOptions"
            >
            </m-input>

            <div v-else class="combo-box__btn-container">
                <button class="combo-box__btn" 
                    ref="comboBoxBtn"
                    @focusin="onShowOptions"
                    @focusout="onHideOptions"
                    :tabindex=this.tabindex >
                    <p class="combo-box__btn--value" 
                    :class="isSelect? '':'placeholder'">
                        {{this.isSelect? this.valueOutput: this.placeholder}}
                    </p>
                    <input v-model=this.valueOutput class="combo-box--input" style="display: none" >
                    <i v-if="iconBefore" class="input__icon--before icon--button icon--24" :class=iconBefore></i>

                    <div v-if="dataAbove" class="icon--button" 
                        :class="[showOptions? 'icon--caret-down': 'icon--caret-up']"
                        @click="focusOnInput">
                    </div>
                    <div v-else class="icon--button" 
                        :class="[showOptions? 'icon--caret-up': 'icon--caret-down']"
                        @click="focusOnInput">
                    </div>
                </button>
            </div>
            
            <div v-show="showOptions"
                class="combo-box__content-container"
                :class="dataAbove? 'combo-box__content-container--above': ''"
                :style="optionsStyle">
                <div class="combo-box__content" ref="options">
                    <li v-for="(option, index) in filterOptions"
                        :key="index" 
                        ref="filterOptions"
                        class="combo-box__content--option"
                        :class="{'focus': index === this.indexFocus}"
                        @mouseover="this.indexFocus = index"
                        @mousedown="onSelectOption($event, option.label)">
                        <i v-if="markSelect && this.selected==index" class="icon--20 icon--dropdown-select" ></i>
                        <i v-if="markSelect && this.selected!=index" class="icon--20" ></i>
                        <p> {{option.label}} </p>
                    </li>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "MDropdown",
    props: {
        type: {
            type: String,
            default: 'filter'
        },
        // nếu thanh lựa chọn ở phía trên
        dataAbove: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        tabindex: {
            type: Number,
            default: -1
        },
        required: {
            type: Boolean,
            default: false
        },
        // nếu combo-box có icon
        hasClearIcon: {
            type: Boolean,
            default: false
        },
        iconBefore: {
            type: String,
            default: ''
        },
        iconAfter: {
            type: String,
            default: ''
        },

        width: {
            type: String,
            default: '',
        },
        showError: {
            type: Boolean,
            default: true,
        },
        // danh sách lựa chọn
        options: {
            type: Array,
            default: []
        },
        // có đánh dấu dữ liệu đã được chọn hay không
        markSelect: {
            type: Boolean,
            default: true,
        },
        // giá trị chọn
        valueInput: {
            value: [Number, String, Array, Date],
            default: null,
        },
    },

    created () {
        this.valueOutput = this.valueInput;
    },

    mounted() {
        const el = this.$refs.options;
        el.addEventListener('scroll', () => {
            this.currentScrollValue = el.scrollTop;
        });
        this.calculateOptionsBarPos();
    },

    data() {
        return {
            valueOutput: null,
            showOptions: false,
            isSelect: false,
            filterOptions: this.options,
            selected: null,
            isError: false,
            // Option đang focus vào
            indexFocus: -1,
            // Giá trị thanh scroll hiện tại
            currentScrollValue: 0,
            // Tọa độ option đang được focus
            currentFocusPos: 0,
            optionsStyle: {
                top: 0,
            },
        }
    },
    
    watch: {
        valueInput: function(val) {
            this.valueOutput = val
        },
        valueOutput: function(val, oldVal) {
            if (this.type != 'select' && this.val){
                this.showOptions = true
            }
            if (val == "") this.$emit("update:valueInput", this.valueOutput);

            if (this.type === "filter" || this.type === "input"){
                try {
                    this.filterOptions = this.options.filter(o => o.label.toLowerCase().includes(val.toLowerCase()))
                }
                catch {
                    this.filterOptions = this.options
                }
            }
            else {
                this.filterOptions = this.options
            } 

            this.selected = this.filterOptions.findIndex(x => x.label == this.valueInput)
        },

        filterOptions: function() {
            this.calculateOptionsBarPos()
        }
    },

    methods: {
        /**
         * Hiển thị/Ẩn thanh lựa chọn
         * @return không
         * author: NXHinh (17/08/2023)
         */
        onToggleOptions(event) {
            if (this.showOptions) {
                this.onHideOptions();
            }
            else this.onShowOptions(event);
        },

        /**
         * Focusin thanh button
         * @return không
         * author: NXHinh (21/09/2023)
         */
        focusOnInput() {
            this.showOptions = true
            if (this.type == "select"){
                this.$refs.comboBoxBtn.focus()
            }
            else {
                this.$refs.comboBoxBtn.focusOnInput()
            }
        },
        /**
         * Focusout thanh button
         * @return không
         * author: NXHinh (21/09/2023)
         */
        focusOutOnInput() {
            this.showOptions = false
            if (this.type == "select"){
                this.$refs.comboBoxBtn.blur()
            }
            else {
                this.$refs.comboBoxBtn.blurInput()
            }
        },

        /**
         * Hiện thanh lựa chọn
         * @return không
         * author: NXHinh (17/08/2023)
         */
        onShowOptions(event) {
            this.showOptions = true
            this.focusOnInput()

            // lấy giá trị đang được chọn
            this.filterOptions = this.options
            // this.calculateOptionsBarPos()
            this.selected = this.filterOptions.findIndex(x => x.label == this.valueInput)

            if (event.key) {
                this.indexFocus = 0
            }
            else {
                this.indexFocus = this.selected != -1 ? this.selected: -1;
            }
            
            setTimeout(() => this.calculateScrollValue(), 10);
            // this.indexFocus = 0
        },

        /**
         * Ẩn thanh lựa chọn
         * @return không
         * author: NXHinh (17/08/2023)
         */
        onHideOptions() {
            this.showOptions = false
            this.indexFocus = -1
        },

        /**
         * Chọn lựa option
         * @return không
         * author: NXHinh (17/08/2023)
         */

        onSelectOption(event, val) {
            event.preventDefault();
            this.isSelect = true
            
            // Cập nhật giá trị của Input để validate dữ liệu
            if (this.type != 'select') {
                // console.log("b:", this.$refs.comboBoxBtn.valueOutput)
                this.$refs.comboBoxBtn.valueOutput = val
                // console.log("a:", this.$refs.comboBoxBtn.valueOutput)
            }

            this.valueOutput = val,

            // Cập nhật giá trị comboBox
            this.updateMessage(),

            setTimeout(() => this.onHideOptions(), 10)
            // this.focusOutOnInput()

            if (event.button == 0) {
                this.focusOutOnInput()
            }
        },

        /**
         * Gửi giá trị được chọn đến component cha
         * @return không
         * author: NXHinh (17/08/2023)
         */
        updateMessage() {
            this.$emit("update:valueInput", this.valueOutput);
        },

        /**
         * Thao tác chọn với bàn phím
         * @return không
         * author: NXHinh (21/09/2023)
         */
        selectWithKey(event) {
            try {
                switch (event.key) {
                    case "ArrowDown":
                        event.stopPropagation();
                        if (!this.showOptions) this.onShowOptions(event)
                        else {
                            if (this.indexFocus < this.filterOptions.length - 1) {
                                this.indexFocus++;
                            }
                        }
                        break;
                    case "ArrowUp":
                        event.stopPropagation();
                        if (this.indexFocus >= 0) {
                            this.indexFocus--;
                        }
                        if (this.indexFocus == -1) this.onHideOptions()
                        break;
                    case "Enter":
                        console.log(this.indexFocus)
                        if (this.indexFocus != -1) {
                            let data = this.filterOptions[this.indexFocus].label;
                            this.onSelectOption(event, data)
                        }
                        else {
                            this.onToggleOptions()
                        }
                        
                        break;
                    case "Tab":
                        this.showOptions = false;
                        break;
                    default:
                        break;   
                }
                this.calculateScrollValue()
            } catch (error) {
                console.log("selectWithKey ~ error:", error);
            }
        },

        /**
         * tính toán vị trí của bảng lựa chọn
         * @return không
         * author: NXHinh (28/09/2023)
         */
        calculateOptionsBarPos(){
            // console.log("filterOption length: ", this.filterOptions.length)
            if (this.dataAbove) {
                if (this.filterOptions.length >= 6)
                    this.optionsStyle.top = 0 - 220 + "px";
                else this.optionsStyle.top = 0 - 35 * this.filterOptions.length - 10 + "px";
            } 
            else {
                this.optionsStyle.top = 0 + 37 + "px";
            }
        },

        /**
         * Tính toán giá trị scroll
         * @return không
         * author: NXHinh (28/09/2023)
         */
        calculateScrollValue() {
            this.currentFocusPos = this.indexFocus * 35 - this.currentScrollValue;
                while (this.currentFocusPos > 35 * 5) {
                    this.currentFocusPos = this.indexFocus * 35 - this.currentScrollValue;
                    this.currentFocusPos -= 35
                    this.currentScrollValue += 35
                }
                while (this.currentFocusPos < 0) {
                    this.currentFocusPos = this.indexFocus * 35 - this.currentScrollValue;
                    this.currentFocusPos += 35
                    this.currentScrollValue -= 35
                }
                
                this.$refs.options.scrollTop = this.currentScrollValue
        },

        /**
         * validate Input
         * @return boolean
         * author: NXHinh (24/08/2023)
         */
        validateInput() {
            this.$refs.comboBoxBtn.validateInput()
            this.isError = this.$refs.comboBoxBtn.isError
        },
    },
}
</script>

<style scoped>
@import url(./combobox.css);
</style>