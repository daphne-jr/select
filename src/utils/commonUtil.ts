import {
  RawValueType,
  GetLabeledValue,
  LabelValueType,
  DefaultValueType,
  FlattenOptionsType,
} from '../interface/generator';

export function toArray<T>(value: T | T[]): T[] {
  if (Array.isArray(value)) {
    return value;
  }
  return value !== undefined ? [value] : [];
}

/**
 * Convert outer props value into internal value
 */
export function toInnerValue(
  value: DefaultValueType,
  { labelInValue, combobox }: { labelInValue: boolean; combobox: boolean },
): RawValueType[] {
  if (value === undefined || value === null || (value === '' && combobox)) {
    return [];
  }

  const values = Array.isArray(value) ? value : [value];

  if (labelInValue) {
    return values.map(({ key, value }: LabelValueType) => (value !== undefined ? value : key));
  }

  return values as RawValueType[];
}

/**
 * Convert internal value into out event value
 */
export function toOuterValues<FOT extends FlattenOptionsType<any>>(
  valueList: RawValueType[],
  {
    optionLabelProp,
    labelInValue,
    prevValue,
    options,
    getLabeledValue,
  }: {
    optionLabelProp: string;
    labelInValue: boolean;
    getLabeledValue: GetLabeledValue<FOT>;
    options: FOT;
    prevValue: DefaultValueType;
  },
): RawValueType[] | LabelValueType[] {
  let values: DefaultValueType = valueList;

  if (labelInValue) {
    values = values.map(val =>
      getLabeledValue(val, { options, prevValue, labelInValue, optionLabelProp }),
    );
  }

  return values;
}

export function removeLastEnabledValue<T extends { disabled?: boolean }, P extends any>(
  measureValues: T[],
  values: P[],
): P[] {
  const newValues = [...values];

  let removeIndex: number;
  for (removeIndex = measureValues.length - 1; removeIndex >= 0; removeIndex -= 1) {
    if (!measureValues[removeIndex].disabled) {
      break;
    }
  }

  if (removeIndex !== -1) {
    newValues.splice(removeIndex, 1);
  }

  return newValues;
}
