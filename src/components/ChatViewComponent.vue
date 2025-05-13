<template>
    <div class="p-6 flex-1 flex flex-col w-4/5 mx-auto gap-6 overflow-y-auto overflow-x-hidden">
        <transition-group name="slide" tag="div" id="chatContainer">
            <div v-for="(item, index) in promtArray" :key="index" class="flex w-full"
                :class="index % 2 === 0 ? 'justify-end' : 'justify-start'">
                <div class="w-2/5 transition-all duration-500"
                    :class="index % 2 === 0 ? 'animate-slide-in-right' : 'animate-slide-in-left'">
                    <Card class="rounded cardShadow">
                        <template #title>
                            <div class="flex justify-end gap-3 p-2">
                                <i class="pi pi-copy cursor-pointer" v-tooltip="$t('copy')" @click="copyText(item)" />
                                <i v-if="index % 2 !== 0" class="pi pi-sync cursor-pointer"
                                    v-tooltip="$t('improvePrompt')" />
                            </div>
                        </template>
                        <template #content>
                            <h1 class="whitespace-pre-wrap break-words">{{ item }}</h1>
                        </template>
                    </Card>
                </div>
            </div>
        </transition-group>

        <div class="flex justify-start" v-if="isLoading">
            <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="transparent"
                class="loading-spinner" />
        </div>
    </div>
</template>

<script setup lang="ts">
import Card from 'primevue/card'
import ProgressSpinner from 'primevue/progressspinner'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

defineProps<{
    promtArray: string[]
    isLoading: boolean
}>()

const toast = useToast()

function copyText(message: string) {
    navigator.clipboard.writeText(message).then(() => {
        toast.add({
            summary: t('copied'),
            detail: t('copiedDetail'),
            life: 3000,
            severity: 'info',
        })
    })
}
</script>
