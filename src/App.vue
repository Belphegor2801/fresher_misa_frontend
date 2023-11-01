<template>
  <div class="main">
    <TheSidebar></TheSidebar>
    <TheHeader></TheHeader>
    <TheMainContent></TheMainContent>

    <ul class="toast_container"> 
      <m-toast class="toast" v-for="(toast) in this.$toastStore.toastList" v-bind:key="toast.id"
          :id="toast.id"
          :type="toast.type"
          :message="toast.message">
      </m-toast>
    </ul>

    <m-dialog v-if="this.$infoDialogStore.show"
        :message="this.$infoDialogStore.show"
        :buttonText="this.$infoDialogStore.buttonText"
        :buttonFunction="onCloseInfoDialog">
    </m-dialog>
  </div>
</template>

<script>
  import TheHeader from './ui/components/layout/header/TheHeader.vue';
  import TheSidebar from './ui/components/layout/sidebar/TheSidebar.vue';
  import TheMainContent from './ui/components/layout/maincontent/TheMainContent.vue';

  import MToast from './ui/components/base/toast/MToast.vue';

  export default {
    name: 'App',
    components: {
      TheSidebar, TheHeader, TheMainContent,
        MToast
    },
    async created() {
      this.$emitter.on("onShowToast", this.onShowToast);
      this.$emitter.on("onShowDevelopingToast", this.onShowDevelopingToast);

      await this.$departmentStore.get()
      this.$departmentStore.getDropdownOptions();
    },
    beforeUnmount() {
      this.$emitter.off("onShowToast", this.onShowToast);
      this.$emitter.off("onShowDevelopingToast", this.onShowDevelopingToast);
    },

    data() {
      return {
        showToast: false,
      }
    },
    methods: {
      /**
       * Hiện thị Toast thông báo
       * @param {type}: Loại Toast
       * @param {message}: Thông báo
       * @return không
       * author: NXHinh (18/08/2023)
       */
      onShowToast(type, message) {
        this.$toastStore.newToast(type, message);
      },
    }
  }
</script>

<style scoped>
</style>
