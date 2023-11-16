<template>
    <div class="checkbox-container">
        <div class="checkbox">
            <input type="checkbox" ref="checkbox" v-model="valueOutput" :value="value" 
                :checked="this.checked" hidden
                :disabled="disabled? 'disabled': ''">
            <div v-if="this.checked" class="icon--14 icon--checkbox-checked"
                :class="disabled? 'icon--disabled': 'icon--button'"
                 @click="onUncheck"></div>
            <div v-else class="icon--14 icon--checkbox-unchecked" 
                :class="disabled? 'icon--disabled': 'icon--button'"
                @click="onCheck"></div>
        </div>
        <div v-if="title"> {{ title }} </div>
    </div>
    
</template>

<script>
    export default {
        name: "MCheckbox",
        props: {
            // Giá trị dùng v-model với nhiều checkbox
            title: {
                type: String,
                default: '',
            },
            // Giá trị dùng v-model với nhiều checkbox
            value: {
                default: null,
            },
            // Key để so sánh 2 object
            objectKey: {
                type: String,
            },
            // Giá trị nhập vào
            valueInput: {
                value: [Boolean],
                default: null,
            },
            //
            disabled: {
                value: [Boolean],
                default: false,
            }
        },
        created () {
            this.valueOutput = this.valueInput
        },
        watch: {
            "valueInput.length": function(val) {
                // Nếu nhiều checkbox dùng chung 1 v-model
                if (this.value) {
                    this.updateStatus()
                }
            },

            valueInput: function(val) {
                this.valueOutput = val
            },

            valueOutput: function(val) {
                // Nếu nhiều checkbox dùng chung 1 v-model
                if (this.value) {
                    this.updateStatus()
                }
                // Nếu là checkbox riêng
                else {
                    this.checked = val
                }
                this.$emit("update:valueInput", val);
            },
        },
        data() {
            return {
                checked: false,
                valueOutput: null,
            }
        },
        methods: {
            /**
             * Cập nhât status
             * @return không
             * createdBy: NXHinh (28/09/2023)
             */
            updateStatus(){
                this.checked = false;
                if (this.objectKey) {
                    if (this.valueOutput.map(x => x[this.objectKey]).includes(this.value[this.objectKey])) {
                        this.checked = true
                    }
                }   
                else {
                    if (this.valueOutput.includes(this.value)) {
                        this.checked = true
                    }
                }
            },
            /**
             * Xử lý khi uncheck 
             * @return không
             * createdBy: NXHinh (28/09/2023)
             */
            onUncheck() {
                if (!this.disabled){
                    this.checked = false
                    // Nếu nhiều checkbox dùng chung 1 v-model
                    if (this.value){
                        var val = this.value
                        if (this.objectKey) {
                            var key = this.objectKey
                            this.valueOutput = this.valueOutput.filter(function(item) {
                                return item[key] !== val[key]
                            })
                        }   
                        else {
                            this.valueOutput = this.valueOutput.filter(function(item) {
                                return item !== val
                            })
                        }
                    }
                    // Nếu là checkbox riêng
                    else {
                        this.valueOutput = !this.valueOutput
                    }  
                }
            },

            /**
             * Xử lý khi check
             * @return không
             * createdBy: NXHinh (28/09/2023)
             */
            onCheck() {
                if (!this.disabled){
                    this.checked = true
                    // Nếu nhiều checkbox dùng chung 1 v-model
                    if (this.value){
                        this.valueOutput.push(this.value)
                    }
                    // Nếu là checkbox riêng
                    else {
                        this.valueOutput = !this.valueOutput
                    }  
                }
            }
        },
    };
</script>

<style scoped>
    @import url(./checkbox.css);
</style>
