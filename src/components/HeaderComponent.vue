<template>
    <div class="w-full flex items-center justify-between px-4 py-2 headerWrapper">
        <div>
            <i class="pi pi-bars cursor-pointer text-2xl" @click="internalVisible = true"></i>
        </div>

        <div class="flex-1 flex justify-center">
            <img :src="Logo" alt="Logo" class="w-24 h-24" />
        </div>

        <div>
            <Button class="!bg-transparent !border-none whitespace-nowrap !p-0" icon="pi pi-trash"
                :label="$t('clearAll')" @click="clearAll" />
        </div>
    </div>

    <DrawerComponent v-model:showSideBar="internalVisible" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Logo from '@/assets/logo.svg'
import { useConfirm } from 'primevue/useconfirm'
import Button from 'primevue/button'
import DrawerComponent from './DrawerComponent.vue'
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const showSideBar = ref(false)

const props = defineProps<{
    promtArray: string[]
}>()

const emit = defineEmits(['clear-prompts', 'update:showSideBar'])

const internalVisible = ref(showSideBar)

const confirm = useConfirm()

async function clearAll() {
    if (props.promtArray.length !== 0) {
        const result = await confirmDelete()
        if (result) emit('clear-prompts')
    }
}

function confirmDelete(message = t('confirmMessage')) {
    return new Promise((resolve) => {
        confirm.require({
            message,
            header: t('confirmHeader'),
            acceptLabel: t('confirmYes'),
            rejectLabel: t('confirmNo'),
            accept: () => resolve(true),
            reject: () => resolve(false),
        })
    })
}
</script>
