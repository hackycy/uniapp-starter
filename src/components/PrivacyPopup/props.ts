export interface Protocol {
  name: string
  url?: string
}

export const basicProps = {
  title: {
    type: String,
    default: '用户隐私保护提示',
  },
  content: {
    type: String,
    default: '感谢您选择使用本应用，我们非常重视您的个人信息安全和隐私保护。使用我们的产品前，请您仔细阅读 $0 如您同意此隐私保护指引，请点击同意并继续按钮，开始使用此应用，我们将尽全力保护您的个人信息及合法权益，感谢您的信任！',
  },
  protocols: {
    type: Array as PropType<Protocol[]>,
    default: () => [{ name: '《用户隐私保护指引》' }],
  },
  agreeText: {
    type: String,
    default: '同意并继续',
  },
  disagreeText: {
    type: String,
    default: '不同意',
  },
}
