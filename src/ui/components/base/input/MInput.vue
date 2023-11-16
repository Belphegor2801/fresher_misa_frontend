<template>
    <div>
        <label v-if="label" :class= "{'required': required}">
            <a @click="focusOnInput()">{{label}}</a>
        </label>
        
        <div class="input-container">
            <div class="input--input" :style="{'width': iconAfter?'calc(100% - 40px)' : '100%'}">
                <input :class="{
                        'input-with-icon__has-before': iconBefore, 
                        'input-with-icon__has-clear': hasClearIcon, 
                        'input-with-icon__has-after': iconAfter || hasArrow, 
                        'ta-right': type=='number',
                        'error': showError && isError}"
                    v-model=formatted
                    ref="input"
                    title=""
                    :step=step
                    :type="inputType"
                    :tabindex=tabindex
                    :placeholder=placeholder
                    :required=required
                    :disabled=disabled
                    @focus="handleFocusIn($event)"
                    @focusout="validateInput()"
                    @keypress="handleKeyPress($event)"
                    @keydown="handleKeyDown($event)"
                    :style="{'width': this.width? this.width: '100%'}"
                >
                <i v-if="iconBefore" class="input__icon--before icon--24" :class=iconBefore></i>

                <i class="input__icon--clear icon--10 icon--button icon--clear" 
                    v-if="this.valueOutput && hasClearIcon"
                    @click="clearText">
                </i>

                <div class="input__icon--arrow" v-if="hasArrow">
                    <div class="icon--8 icon--button icon--caret-up" @click="increaseValue"></div>
                    <div class="icon--8 icon--button icon--caret-down" @click="decreaseValue"></div>
                </div>
            </div>

            <!-- <div class="input__arrow-icon--one">
                <div class="icon--button" :class="iconArrow"></div>
            </div> -->
            
            <div v-if="iconAfter" class="input__icon--after-container" 
                :class="disabled? 'cursor--not-allowed':''"
                @click="iconAfterFunction">
                <div v-if="iconAfter" class="input__icon--after icon--24" 
                :class="iconAfter">
            </div>
            </div>
        </div>
        
        <p v-if="showError" class="text--error" :class="{'error-hidden': !isError}"> {{ errorText }}</p>
    </div>
</template>

<script>
export default {
    name: "MISAInput",
    props: {
        label: {
            type: String
        },
        type: {
            type: String,
            default: "text",
            values: ["text", "number", "password"]
        },
        formatType: {
            type: String,
            default: "",
        },
        // step nếu type là number
        step: {
            type: String,
            default: "1",
        },
        tabindex: {
            type: Number,
            default: 0
        },
        placeholder: {
            type: String,
        },
        required: {
            type: Boolean,
            default: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
        width: {
            type: String,
            default: "",
        },
        hasClearIcon: {
            type: Boolean,
            default: false
        },
        hasArrow: {
            type: Boolean,
            default: false
        },
        iconBefore: {
            type: String,
            default: "",
        },
        iconAfter: {
            type: String,
            default: "",
        },

        iconAfterFunction: {
            type: Function,
            default: () => {},
        },

        showError: {
            type: Boolean,
            default: true,
        },

        focus: {
            type: Boolean,
            default: false,
        },
        valueInput: {
            value: [Number, String, Array, Date],
            default: null,
        },
    },
    created() {
        this.valueOutput = this.valueInput
        this.inputType = this.type
        if (this.formatType) this.inputType = "text" 
    },

    watch: {
        valueOutput: function(val) {
            this.$emit("update:valueInput", val);
        },
        valueInput: function(val) {
            this.valueOutput = val
        },
    },

    data() {
        return {
            inputType: "",
            onCustomValidity: "",
            valueOutput: null,
            isError: false,
            errorText: false,
        }
    },

    methods: {
        /**
         * Xử lý text nhập vào
         * @return không
         * author: NXHinh (30/09/2023)
         */
        handleKeyPress: function(evt) {
            if (this.type == "number") {
                evt = (evt) ? evt : window.event;
                var charCode = (evt.which) ? evt.which : evt.keyCode;
                if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 44) {
                    evt.preventDefault();;
                } else {
                    return true;
                }
            }
            else {
                return true;
            }
        },
        /**
         * Xử lý keydown
         * @return không
         * author: NXHinh (30/09/2023)
         */
        handleKeyDown: function(evt) {
            switch (evt.key) {
                case "ArrowDown":
                    evt.preventDefault()
                    if (this.type == "number") {
                        this.decreaseValue()
                    }
                    break;
                case "ArrowUp":
                    evt.preventDefault()    
                    if (this.type == "number") {
                        this.increaseValue()
                    }
                    break;
            }
        },
        /**
         * Focus ref
         * @return không
         * author: NXHinh (21/09/2023)
         */
        focusOnInput() {
            const inputRef = this.$refs.input;
            inputRef.focus();
        },
        /**
         * Xử lý focus
         * @return không
         * author: NXHinh (21/09/2023)
         */
        handleFocusIn(event) {
            event.target.select()
            this.isError = false
        },
        /**
         * Blur ref
         * @return không
         * author: NXHinh (21/09/2023)
         */
        blurInput() {
            const inputRef = this.$refs.input;
            inputRef.blur();
        },
        /**
         * Tăng 1 đơn vị với input dạng số
         * @return không
         * author: NXHinh (24/08/2023)
         */
        increaseValue() {
            try{
                if (!this.valueOutput) this.valueOutput = "0"
                this.valueOutput = parseFloat(this.valueOutput) + 1
                this.valueOutput = (Math.round(this.valueOutput * 100) / 100).toString()
            }
            catch (error){
                console.log(error)
            }
        },
        /**
         * Giảm 1 đơn vị với input dạng số
         * @return không
         * author: NXHinh (24/08/2023)
         */
        decreaseValue() {
            try{
                if (!this.valueOutput) this.valueOutput = "0"
                this.valueOutput = parseFloat(this.valueOutput) - 1
                this.valueOutput = (Math.round(this.valueOutput * 100) / 100).toString()
                if (parseFloat(this.valueOutput) < 0) this.valueOutput = "0"
            }
            catch (error){
                console.log(error)
            }
        },

        /**
         * clearText
         * @return không
         * author: NXHinh (04/10/2023)
         */
        clearText() {
            this.valueOutput = ""
        },

        /**
         * validate Input
         * @return boolean
         * author: NXHinh (01/10/2023)
         */
        validateInput() {
            if(this.required && (this.valueOutput === null || this.valueOutput === "")){
                this.isError = true;
                this.errorText = this.$MResource.ErrorMsg.FieldEmpty
            } 
            else if(this.valueOutput.length > 255){
                this.isError = true;
                this.errorText = this.$MResource.ErrorMsg.MaxLength
            } 
            else if (this.type == "number" && this.valueOutput <= 0){
                this.isError = true;
                this.errorText = this.$MResource.ErrorMsg.PositiveNumber
            }
            else{
                this.isError = false
            }
        },
    },

    computed: {
        // Format giá trị số nguyên, số thực
        formatted: {
            get: function () {
                if (this.formatType == "int" || this.formatType == "float") {
                    var value = this.valueOutput;
                    if (value)
                        var formatted = this.$MHelper.formatNumber(parseFloat(value));
                    else formatted = 0;
                    return formatted;
                }
                else {
                    return this.valueOutput;
                }
            },
            set: function (newValue) {
                if (this.formatType == "int") {
                    const regex = /,0*$/;
                    if (!regex.test(newValue)) {
                        var cleanValue = newValue.toString().replaceAll(".", "").replaceAll(",", ".");
                        var intValue = parseFloat(cleanValue);
                        this.valueOutput = 0;
                        if (intValue){
                            this.valueOutput = intValue;
                        }
                    }
                }
                else if (this.formatType == "float") {
                    // Kiểm tra để ghi định dạng float
                    const regex = /,0*$/;
                    if (!regex.test(newValue)) {
                        var cleanValue = newValue.toString().replaceAll(".", "").replaceAll(",", ".");
                        var floatValue = parseFloat(cleanValue);
                        this.valueOutput = 0;
                        if (floatValue){
                            this.valueOutput = floatValue;
                        }
                    }
                }
                else {
                    this.valueOutput = newValue
                }
            }
        }
    }
}
</script>

<style scoped>
@import url(./input.css);
</style>