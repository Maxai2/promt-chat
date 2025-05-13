<template>
  <div class="appWrapper w-screen h-screen pb-2 flex flex-col gap-8 overflow-hidden">
    <HeaderComponent v-model:promtArray="promtArray" @clear-prompts="promtArray = []" />

    <ChatViewComponent v-model:promtArray="promtArray" v-model:isLoading="isLoading" />

    <PromptLineComponent v-model:promtArray="promtArray" v-model:isLoading="isLoading"></PromptLineComponent>
  </div>

  <Toast></Toast>
  <ConfirmPopup />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HeaderComponent from './components/HeaderComponent.vue'
import PromptLineComponent from './components/PromptLineComponent.vue'
import ChatViewComponent from './components/ChatViewComponent.vue'
import Toast from 'primevue/toast'
import ConfirmPopup from 'primevue/confirmpopup'

const promtArray = ref<string[]>([])
const isLoading = ref(false)

</script>
