<template>
  <div class="p-5 w-screen h-screen flex flex-col gap-8">
    <div class="w-full grid grid-cols-[0.1fr_1fr_0.1fr]">
      <div></div>
      <div class="grid justify-center">
        <img :src="Logo" alt="Logo" class="w-24 h-24" />
      </div>
      <div class="grid">
        <Button class="m-auto h-min" severity="danger" icon="pi pi-trash" label="Clear All" @click="clearAll"></Button>
      </div>
    </div>

    <div class="p-6 flex-1 flex flex-col w-4/5 mx-auto gap-6 rounded shadow-md overflow-y-auto" id="chatContainer">
      <div class="flex w-full" :class="(index % 2 == 0) ? 'justify-end' : 'justify-start'"
        v-for="(item, index) in promtArray" :key="index">
        <Card class="w-1/5">
          <template #header>
            <div class="flex justify-end gap-3 p-2">
              <i class="pi cursor-pointer pi-copy" v-tooltip="'Copy'" @click="copyText(item)"></i>
              <i v-if="index % 2 != 0" class="pi cursor-pointer pi-sync" v-tooltip="'Improve promt'"></i>
            </div>
          </template>
          <template #content>
            <h1>{{ item }}</h1>
          </template>
        </Card>
      </div>
      <div class="flex justify-start" v-if="isLoading">
        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="transparent" class="loading-spinner">
        </ProgressSpinner>
      </div>
    </div>

    <div class="grid grid-cols-[1fr_auto] gap-2 w-1/2 mx-auto">
      <Input v-model="text" @keydown.enter="send" />
      <Button label="Send" @click="send"></Button>
    </div>
  </div>

  <ConfirmPopup />
  <Toast />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Logo from '@/assets/logo.svg'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Input from 'primevue/inputtext'
import ConfirmPopup from 'primevue/confirmpopup';
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast'
import ProgressSpinner from 'primevue/progressspinner';

const text = ref('')
const promtArray = ref<string[]>([])
const isLoading = ref(false)

const confirm = useConfirm()
const toast = useToast()

async function send() {
  const tempText = text.value
  if (tempText != '') {
    promtArray.value.push(text.value)

    if (+text.value < 100) {
      isLoading.value = true
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${text.value}`)

      const val = await response.json()

      promtArray.value.push(val.body)
      isLoading.value = false
    } else {
      promtArray.value.push(text.value)
    }

    const container = document.getElementById('chatContainer')

    if (container) {
      container.lastElementChild?.scrollIntoView({ behavior: "smooth", block: "end" })
    }
  }
  text.value = ''
}

async function clearAll() {
  if (promtArray.value.length != 0) {
    const result = await confirmDelete()
    if (result) {
      promtArray.value = []
    }
  }
}

function confirmDelete(message = 'U want to delete this ... ?') {
  return new Promise((resolve) => {
    confirm.require({
      message,
      header: 'Confirm me daddy',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      accept: () => resolve(true),
      reject: () => resolve(false),
    })
  })
}

function copyText(message = '') {
  const textArea = document.createElement('textarea');
  textArea.value = message;

  document.body.appendChild(textArea);

  textArea.select();
  textArea.setSelectionRange(0, 99999);

  document.execCommand('copy');

  document.body.removeChild(textArea);

  toast.add({ summary: 'Info Message', detail: 'Text copied!', life: 3000, severity: 'info' })
}
</script>
