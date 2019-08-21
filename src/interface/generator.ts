// =================================== Shared Type ===================================
export type Key = string | number;

export type RawValueType = string | number;

export interface LabelValueType {
  key?: Key;
  value?: RawValueType;
  label?: React.ReactNode;
}
export type ValueType = RawValueType | RawValueType[] | LabelValueType | LabelValueType[];

// ==================================== Generator ====================================
export type GetLabeledValue<OptionsType> = (
  value: RawValueType,
  options: OptionsType,
  prevValue: ValueType,
  labelInValue: boolean,
) => LabelValueType;

export type FilterOptions<OptionsType> = (
  searchValue: string,
  options: OptionsType,
  /** Component props, since Select & TreeSelect use different prop name, use any here */
  props: any,
) => OptionsType;

export type FilterFunc = (inputValue: string, option?: any) => boolean;