<template>
    <div class="grid grid-cols-[1fr_auto] gap-2 w-1/2 mx-auto ">
        <Input v-model="text" @keydown.enter="send" :placeholder="$t('inputPlaceholder')" />
        <Button class="sendButton" :label="$t('send')" @click="send" />
    </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Input from 'primevue/inputtext';
import { ref } from 'vue';

const props = defineProps<{
    promtArray: string[]
    isLoading: boolean
}>()

const emit = defineEmits(['update:isLoading', 'update:promtArray'])

const text = ref('')

async function send() {
    const value = text.value.trim()
    if (!value) return

    let updatedArray = [...props.promtArray, value]
    emit('update:promtArray', updatedArray)

    if (!isNaN(+value) && +value < 100) {
        emit('update:isLoading', true)

        // translate?
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${value}`)
            const data = await response.json()

            updatedArray = [...updatedArray, data.body || 'No response body found.']
            emit('update:promtArray', updatedArray)
        } catch (error) {
            updatedArray = [...updatedArray, 'Error fetching response.', `${error}`]
            emit('update:promtArray', updatedArray)
        } finally {
            emit('update:isLoading', false)
        }
    } else {
        emit('update:promtArray', [...updatedArray, value])
    }

    text.value = ''

    setTimeout(() => {
        const container = document.getElementById('chatContainer')
        container?.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }, 150)
}
</script>