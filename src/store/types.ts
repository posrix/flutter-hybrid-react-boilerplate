import { FilterQueryValue, IFilterItem } from 'src/types/app';
import { CascadePickerProps } from 'antd-mobile/es/components/cascade-picker';
import { DatePickerProps } from 'antd-mobile/es/components/date-picker';
import { PickerProps } from 'antd-mobile/es/components/picker';
import { TextAreaProps } from 'antd-mobile/es/components/text-area';
import { InputProps } from 'antd-mobile/es/components/input';
import { TableProps } from 'src/components/Base/Table';
import { PopupProps } from 'antd-mobile/es/components/popup';

export type IPickerProps = Pick<PickerProps, 'visible' | 'columns' | 'value' | 'onConfirm'>;

export type ICascadePickerProps = Pick<
  CascadePickerProps,
  'visible' | 'options' | 'value' | 'onConfirm'
>;

export type IDatePickerProps = Pick<
  DatePickerProps,
  'visible' | 'value' | 'onConfirm' | 'precision'
>;

export interface ISelectOption {
  value: string;
  name: string;
}

export interface ISelectorPopupProps {
  title: string;
  visible?: boolean;
  selectorValue: string;
  selectorOptions: ISelectOption[];
  handleSelectCallback?: (value: string) => void;
}

export interface Personnel {
  name: string;
  id: string;
  department: string;
  username: string;
  onVacation?: boolean;
}

export interface IPersonnelSelectorPopupProps {
  title: string;
  personnels: Personnel[];
  selectedPersonnels?: Personnel[];
  visible?: boolean;
  multiple?: boolean;
  handleSelectCallback?: (personnels: Personnel[]) => void;
}

export interface IMultiColumnIndexBarPopupProps {
  title: string;
  columns: {
    title: string;
    options: Personnel[];
  }[];
  selected?: Personnel[];
  visible?: boolean;
  multiple?: boolean;
  onConfirm?: (values: Personnel[]) => void;
}

export interface IDropDownFilterPopupProps {
  filterItems?: IFilterItem[];
  visible?: boolean;
  getContainer: () => HTMLElement;
  handleSelectCallback?: (queryValue: FilterQueryValue) => void;
  popupProps?: Omit<PopupProps, 'getContainer'>;
  handleResetCallback?: (queryValue: FilterQueryValue) => void;
}

export interface IInputModalProps extends Pick<InputProps, 'defaultValue' | 'placeholder'> {
  title: string;
  visible?: boolean;
  handleConfirmCallback?: (text: string) => void;
}

export interface ITextareaModalProps
  extends Pick<TextAreaProps, 'rows' | 'maxLength' | 'defaultValue' | 'placeholder'> {
  title: string;
  visible?: boolean;
  handleConfirmCallback?: (text: string) => Promise<boolean | undefined>;
}

export interface IDateRangePickerProps {
  visible?: boolean;
  title?: string;
  onConfirm?: (value: [Date, Date] | null) => void;
  value?: [Date, Date];
}
