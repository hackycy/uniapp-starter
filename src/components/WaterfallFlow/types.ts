/**
 * 参考 https://github.com/umicro/uView/blob/master/uview-ui/components/u-waterfall/u-waterfall.vue
 * 参考 https://github.com/climblee/uv-ui/blob/master/uni_modules/uv-waterfall/components/uv-waterfall/uv-waterfall.vue
 */
export const basicProps = {
  dataSource: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  itemKey: {
    type: [String, Number] as PropType<string | number>,
    default: 'id',
  },
  /**
   * 每个子项的添加延迟时间，单位 ms
   */
  delay: {
    type: Number,
    default: 50,
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
  /**
   * 注意不要覆盖display, position等可能影响布局的样式
   */
  customColumnClass: {
    type: String,
    default: '',
  },
  /**
   * 注意不要覆盖display, position等可能影响布局的样式
   */
  customColumnStyle: {
    type: String,
    default: '',
  },
}
