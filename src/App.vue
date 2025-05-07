<template>
  <div class="p-2 w-screen h-screen">
    <div class="w-full grid grid-cols-[auto_1fr_auto]">
      <div></div>
      <div class="grid justify-center">
        <img :src="Logo" alt="Logo" class="w-24 h-24" />
      </div>
      <div class="grid">
        <ButtonPrime
          class="m-auto h-min"
          severity="danger"
          icon="pi pi-trash"
          label="Clear All"
        ></ButtonPrime>
      </div>
    </div>

    <div class="rounded w- shadow-md grid grid-rows-[1fr_auto] gap-8">
      <div></div>
      <div class="grid grid-cols-[1fr_auto] gap-2">
        <InputText v-model="text" class="w-full" />
        <ButtonPrime label="Send" @click="send"></ButtonPrime>
      </div>
    </div>

    <!-- <div class="p-6 w-full h-full rounded shadow-md">
      <h1 class="text-2xl font-bold mb-4 text-center">Пример формы</h1>

      <div class="mb-4">
        <label class="block mb-2 text-gray-700">Введите имя:</label>
        <InputText v-model="name" class="w-full" />
      </div>

      <ButtonPrime
        label="Отправить"
        icon="pi pi-check"
        class="w-full"
        @click="submit"
      ></ButtonPrime>
    </div>

    <div v-if="submitted" class="mt-6 text-green-600 text-lg">Привет, {{ name }}!</div> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Logo from '@/assets/logo.svg'

const text = ref('')
// const submitted = ref(false)

function send() {
  console.log('text')
}

// function submit() {
//   submitted.value = true
// }
</script>
