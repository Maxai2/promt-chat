<template>
    <Drawer v-model:visible="drawerVisible" :showCloseIcon="false" position="left">
        <template #default>
            <div class="flex flex-col p-4 gap-8 h-full justify-center">
                <div class="flex gap-4 items-center">
                    <ToggleSwitch v-model="darkMode" />
                    <span class="toggleSwitchSpan cursor-pointer select-none" @click="darkMode = !darkMode">
                        {{ darkMode ? $t('darkMode') : $t('lightMode') }}
                    </span>
                </div>

                <Select v-model="selectedLang" :options="languages" optionLabel="value" optionValue="code" />
            </div>
        </template>
    </Drawer>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import ToggleSwitch from 'primevue/toggleswitch'
import Drawer from 'primevue/drawer'
import Select from 'primevue/select'
import { useI18n } from 'vue-i18n'

const emit = defineEmits(['update:showSideBar'])

const props = defineProps<{
    showSideBar: boolean
}>()

const drawerVisible = ref<boolean>(props.showSideBar ?? false)
watch(() => props.showSideBar, (val) => {
    if (typeof val === 'boolean') drawerVisible.value = val
})
watch(drawerVisible, (val) => {
    emit('update:showSideBar', val)
})

const darkMode = ref(sessionStorage.getItem('darkMode') === 'true')

if (darkMode.value) {
    document.documentElement.classList.add('dark')
}

watch(darkMode, (val) => {
    sessionStorage.setItem('darkMode', val.toString())
    document.documentElement.classList.toggle('dark', val)
})

const languages = [
    { value: 'English (英語)', code: 'en' },
    { value: 'Japanese (日本語)', code: 'ja' }
]
const selectedLang = ref(sessionStorage.getItem('lang') || 'en')

const { locale } = useI18n()

locale.value = selectedLang.value

watch(selectedLang, (lang) => {
    sessionStorage.setItem('lang', lang)
    locale.value = lang
})

</script>
