import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    clearAll: 'Cleat All',
    send: 'Send',
    inputPlaceholder: 'Type a prompt...',
    darkMode: 'Dark mode',
    lightMode: 'Light mode',
    copy: 'Copy',
    improvePrompt: 'Improve prompt',
    copied: 'Copied',
    copiedDetail: 'Text copied to clipboard',
    confirmMessage: 'Do you want to delete all prompts?',
    confirmHeader: 'Confirmation',
    confirmYes: 'Yes',
    confirmNo: 'No',
  },
  ja: {
    clearAll: 'すべてクリア',
    send: '送信',
    inputPlaceholder: 'プロンプトを入力してください...',
    darkMode: 'ダークモード',
    lightMode: 'ライトモード',
    copy: 'コピー',
    improvePrompt: 'プロンプトを改善',
    copied: 'コピーしました',
    copiedDetail: 'テキストがクリップボードにコピーされました',
    confirmMessage: 'すべてのプロンプトを削除してもよろしいですか？',
    confirmHeader: '確認',
    confirmYes: 'はい',
    confirmNo: 'いいえ'
  },
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})

export default i18n