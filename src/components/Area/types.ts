export interface AreaProps {
  /**
   * 当前选中项对应的地区码
   */
  modelValue: string

  /**
   * 是否为只读状态
   */
  readonly?: boolean

  /**
   * 显示列数，3-省市区，2-省市，1-省
   */
  columnsNum?: number

  /**
   * picker item的高度
   */
  itemHeight?: number
}

/** 根据地区码获取完整的省市区信息 */
export interface AreaInfo {
  /** 省份代码 */
  provinceCode: string
  /** 省份名称 */
  provinceName: string
  /** 城市代码 */
  cityCode: string
  /** 城市名称 */
  cityName: string
  /** 区县代码 */
  countyCode: string
  /** 区县名称 */
  countyName: string
}
