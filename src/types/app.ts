import { ButtonProps } from 'antd-mobile/es/components/button';
import { CascadePickerOption } from 'antd-mobile/es/components/cascade-picker';
import { Precision } from 'antd-mobile/es/components/date-picker/date-picker-utils';
import { PickerColumn, PickerColumnItem } from 'antd-mobile/es/components/picker-view';
import { SelectorOption } from 'antd-mobile/es/components/selector';
import { ReactNode } from 'react';

export declare type SelectorValue = string | number;

export enum CardFieldType {
  Text = 'text',
  Link = 'Link',
  Progress = 'Progess',
  ReactNode = 'ReactNode',
}

export interface TextField {
  type: CardFieldType.Text;
  name: string;
  value: string;
}

export interface ReactNodeField {
  type: CardFieldType.ReactNode;
  name: string;
  value: ReactNode;
}

export interface ProgressField {
  type: CardFieldType.Progress;
  name: string;
  value: number;
}

export interface LinkField {
  type: CardFieldType.Link;
  name: string;
  href: string;
  text: string;
}

export type IField = TextField | ProgressField | LinkField | ReactNodeField;

export interface ICard<T = Record<string, any>> {
  id: string;
  title?: string;
  fields: IField[];
  displayFields?: string[];
  previewFields?: string[];
  preview?: boolean;
  tags?: ICardTag[];
  extraTag?: ICardTag;
  rightLabelText?: string;
  extra?: T;
}

export interface IActionButton
  extends Pick<ButtonProps, 'fill' | 'color' | 'onClick' | 'type' | 'loading'> {
  text: string;
}

export interface ICardTag {
  color: string;
  text: string;
  fill?: 'solid' | 'outline';
}

export enum FilterType {
  Date = 'Date',
  Single = 'Single',
  Cascade = 'Cascade',
  Selector = 'Selector',
  Input = 'Input',
  DateRange = 'DateRange',
  DateTimeRange = 'DateTimeRange',
}

export type FilterTypeUnion =
  | FilterType.Date
  | FilterType.Cascade
  | FilterType.Date
  | FilterType.Selector
  | FilterType.Input
  | FilterType.DateRange
  | FilterType.DateTimeRange;

export interface IInputFilterItem {
  type: FilterType.Input;
  enableScan?: boolean;
  enableSearch?: boolean;
  onSearchClick?: () => void;
  placeholder?: string;
  name: string;
  query?: string;
  value?: string;
}

export interface ISingleFilterItem {
  type: FilterType.Single;
  name: string;
  columns: PickerColumn[];
  noAll?: boolean;
  placeholder?: string;
  selectedColumn?: PickerColumnItem | null;
  query?: string;
}

export interface ICascadeFilterItem {
  type: FilterType.Cascade;
  name: string;
  placeholder?: string;
  noAll?: boolean;
  options: CascadePickerOption[];
  selectedOptions?: (PickerColumnItem | null)[];
  query?: string;
}

export type DateTimeRangeValueType = [Date | null, Date | null];

export interface IDateTimeRangeFilterItem {
  type: FilterType.DateTimeRange;
  precision: Precision;
  name: string;
  value?: DateTimeRangeValueType;
  query?: [string, string];
}

export interface IDateFilterItem {
  type: FilterType.Date;
  precision: Precision;
  placeholder?: string;
  name: string;
  value?: Date | null;
  query?: string;
}

export interface ISelectorFilterItem {
  type: FilterType.Selector;
  name: string;
  value?: SelectorValue[];
  options: SelectorOption<SelectorValue>[];
  query?: string;
}

export interface IDateRangeFilterItem {
  type: FilterType.DateRange;
  name: string;
  placeholder?: string;
  value?: [Date, Date];
  query?: [string, string];
  formatter?: (date: Date, index: number) => string;
}

export const isPickerColumnItem = (x: any): x is PickerColumnItem => typeof x.label === 'string';

export type FilterQueryValue = Record<string, boolean | string | Date | string[]>;

export type IFilterItem =
  | IInputFilterItem
  | ISingleFilterItem
  | ICascadeFilterItem
  | IDateFilterItem
  | ISelectorFilterItem
  | IDateRangeFilterItem
  | IDateTimeRangeFilterItem;
