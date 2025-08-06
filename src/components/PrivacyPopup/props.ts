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
    default: '当您点击同意并开始时用产品服务时，即表示你已理解并同息$0该条款内容，该条款将对您产生法律约束力。如您拒绝，将无法继续使用。',
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
