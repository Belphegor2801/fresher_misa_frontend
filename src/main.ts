import { TransferDocument } from '@/core/entities/TransferDocument';
import { createApp } from 'vue'
import { createPinia } from "pinia";
import './ui/css/main.css'
import App from './App.vue'
import router from './router/router'
import emitter from 'tiny-emitter/instance.js';
import vClickOutside from "click-outside-vue3";

import { MEnum } from './resources/enum'
import { MHelper } from './resources/helper';
import { MResource } from './resources/resources'


// Base component
import MPriButton from "@/ui/components/base/button/MPriButton.vue";
import MIconButton from "@/ui/components/base/button/MIconButton.vue";
import MCheckBox from "@/ui/components/base/checkbox/MCheckbox.vue";
import MInput from "@/ui/components/base/input/MInput.vue";
import MComboBox from "@/ui/components/base/combobox/MComboBox.vue";
import MTable from "@/ui/components/base/table/MTable.vue";
import MToast from "@/ui/components/base/toast/MToast.vue";
import MDialog from "@/ui/components/base/dialog/MDialog.vue";
import MLoading from "@/ui/components/base/loading/MLoading.vue";
import MTooltip from "@/ui/components/base/tooltip/MTtip.vue";
import MContextMenu from "@/ui/components/base/contextmenu/MContextMenu.vue";
import MDatePicker from "@/ui/components/base/datepicker/MDatePicker.vue";

// Store
import DDepartmentStore from './core/store/DepartmentStore';
import FixedAssetCategoryStore from './core/store/FixedAssetCategoryStore';

import ToastStore from './core/store/ToastStore';
import InfoDialogStore from './core/store/InfoDialogStore';


const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(vClickOutside);

// Component
app.component("m-pri-button", MPriButton)
app.component("m-icon-button", MIconButton)
app.component("m-checkbox", MCheckBox)
app.component("m-input", MInput)
app.component("m-combo-box", MComboBox)
app.component("m-table", MTable)
app.component("m-toast", MToast)
app.component("m-dialog", MDialog)
app.component("h-loading", MLoading)
app.component("m-tooltip", MTooltip)
app.component("m-context-menu", MContextMenu)
app.component("m-datepicker", MDatePicker)


app.config.globalProperties.$MEnum = MEnum;
app.config.globalProperties.$MHelper= MHelper;
app.config.globalProperties.$MLangCode = "VN"
app.config.globalProperties.$MResource = MResource["VN"]

app.config.globalProperties.$PageViewEnum = MEnum.PageView;
app.config.globalProperties.$ToastTypeEnum = MEnum.ToastType;
app.config.globalProperties.$ButtonTypeEnum = MEnum.ButtonType;

app.config.globalProperties.$emitter = emitter


app.config.globalProperties.$departmentStore = DDepartmentStore();
app.config.globalProperties.$toastStore = ToastStore();
app.config.globalProperties.$infoDialogStore = InfoDialogStore();


app.mount('#app')
