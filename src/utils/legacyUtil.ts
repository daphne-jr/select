import * as React from 'react';
import toArray from 'rc-util/lib/Children/toArray';
import { OptionData, OptionGroupData, OptionsType } from '../interface';

function convertNodeToOption(node: React.ReactElement): OptionData {
  if (!React.isValidElement(node) || !node.type) {
    return null;
  }

  const {
    key,
    props: { children, value, ...restProps },
  } = node as React.ReactElement;

  return { key, value: value !== undefined ? value : key, children, ...restProps };
}

export function convertChildrenToData(
  nodes: React.ReactNode,
  optionOnly: boolean = false,
): OptionsType {
  return toArray(nodes)
    .map((node: React.ReactElement): OptionData | OptionGroupData | null => {
      if (!React.isValidElement(node) || !node.type) {
        return null;
      }

      const {
        type: { isOptionGroup },
        key,
        props: { children, ...restProps },
      } = node as React.ReactElement & {
        type: { isOptionGroup?: boolean };
      };

      if (optionOnly || !isOptionGroup) {
        return convertNodeToOption(node);
      }

      return {
        key,
        ...restProps,
        options: convertChildrenToData(children),
      };
    })
    .filter(data => data);
}
