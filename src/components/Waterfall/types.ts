export type WaterfallItem = Recordable

/**
 * 参考 https://github.com/umicro/uView/blob/master/uview-ui/components/u-waterfall/u-waterfall.vue
 */
export const basicProps = {
  modelValue: {
    type: Array as PropType<WaterfallItem[]>,
    default: () => [],
  },
  rowKey: {
    type: [String, Number] as PropType<string | number>,
    default: 'id',
  },
  /**
   * 每个子项的添加延迟时间，单位 ms
   */
  itemDelay: {
    type: Number,
    default: 50,
  },
  /**
   * 列数
   */
  column: {
    type: Number,
    default: 2,
  },
  /**
   * 注意不要覆盖display, position等可能影响布局的样式
   */
  customClass: {
    type: String,
    default: '',
  },
  /**
   * 注意不要覆盖display, position等可能影响布局的样式
   */
  customStyle: {
    type: String,
    default: '',
  },
  customColumnClass: {
    type: String,
    default: '',
  },
  customColumnStyle: {
    type: String,
    default: '',
  },
}
