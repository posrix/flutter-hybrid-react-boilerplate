import { List } from 'antd-mobile';
import {
  FilterType,
  ICascadeFilterItem,
  IDateFilterItem,
  IFilterItem,
  ISingleFilterItem,
  FilterQueryValue,
  SelectorValue,
  ISelectorFilterItem,
  IDateRangeFilterItem,
  IDateTimeRangeFilterItem,
  DateTimeRangeValueType,
  IInputFilterItem,
} from 'src/types/app';
import { IDropDownFilterPopupProps, Personnel } from 'src/store/types';
import produce, { Draft } from 'immer';
import { PickerValueExtend } from 'antd-mobile/es/components/picker-view';
import { useCallback } from 'react';
import { SingleField } from '../FilterFields/SingleField';
import { DateField } from '../FilterFields/DateField';
import { CascadeField } from '../FilterFields/CascadeField';
import { SelectorField } from '../FilterFields/SelectorField';
import { DateRangeField } from '../FilterFields/DateRangeField';
import { DateTimeRangeField } from '../FilterFields/DateTimeRangeField';
import { InputField } from '../FilterFields/InputField';
import { produceFilterQuery } from 'src/utils/produce-filter-query';

export type FilterListProps = Pick<IDropDownFilterPopupProps, 'filterItems'> & {
  handleQueryChangeCallback?: (filterQuery: FilterQueryValue) => void;
  handleFilterItemsChangeCallback: (filterItems: IFilterItem[]) => void;
};

const FilterList: React.FC<FilterListProps> = ({
  filterItems = [],
  handleQueryChangeCallback,
  handleFilterItemsChangeCallback,
}) => {
  const onConfirm = useCallback(
    ({
      value,
      position,
      extend,
    }: {
      position: number;
      value?:
        | string
        | Date
        | SelectorValue[]
        | Personnel[]
        | [Date, Date]
        | DateTimeRangeValueType
        | null;
      extend?: PickerValueExtend;
    }) => {
      const mutatedFilterItems = produce(filterItems, (draftState: Draft<IFilterItem[]>) => {
        switch (filterItems[position].type) {
          case FilterType.Single:
            (draftState[position] as ISingleFilterItem).selectedColumn = extend!.items[0];
            break;
          case FilterType.Input:
            (draftState[position] as IInputFilterItem).value = value as string;
            break;
          case FilterType.Cascade:
            (draftState[position] as ICascadeFilterItem).selectedOptions = extend!.items;
            break;
          case FilterType.Date:
            (draftState[position] as IDateFilterItem).value = value as Date;
            break;
          case FilterType.Selector:
            (draftState[position] as ISelectorFilterItem).value = value as SelectorValue[];
            break;
          case FilterType.DateRange:
            (draftState[position] as IDateRangeFilterItem).value = value as [Date, Date];
            break;
          case FilterType.DateTimeRange:
            (draftState[position] as IDateTimeRangeFilterItem).value = value as [Date, Date];
        }
      });
      handleQueryChangeCallback?.(produceFilterQuery(mutatedFilterItems));
      handleFilterItemsChangeCallback(mutatedFilterItems);
    },
    [filterItems, handleQueryChangeCallback, handleFilterItemsChangeCallback]
  );

  return (
    <List>
      {filterItems.map((filterItem, i) => {
        switch (filterItem.type) {
          case FilterType.Single:
            return (
              <SingleField
                key={i}
                filterItem={filterItem}
                onConfirm={(_, extend) => {
                  onConfirm({ position: i, extend });
                }}
              />
            );
          case FilterType.Input:
            return (
              <InputField
                key={i}
                filterItem={filterItem}
                onChange={(value) => {
                  onConfirm({ position: i, value });
                }}
              />
            );
          case FilterType.Date:
            return (
              <DateField
                key={i}
                filterItem={filterItem}
                onConfirm={(value) => {
                  onConfirm({ value, position: i });
                }}
              />
            );
          case FilterType.Cascade:
            return (
              <CascadeField
                key={i}
                filterItem={filterItem}
                onConfirm={(_, extend) => {
                  onConfirm({ position: i, extend });
                }}
              />
            );
          case FilterType.Selector:
            return (
              <SelectorField
                key={i}
                filterItem={filterItem}
                onChange={(value) => {
                  onConfirm({ position: i, value });
                }}
              />
            );
          case FilterType.DateRange:
            return (
              <DateRangeField
                key={i}
                filterItem={filterItem}
                onConfirm={(value) => {
                  onConfirm({ position: i, value });
                }}
              />
            );
          case FilterType.DateTimeRange:
            return (
              <DateTimeRangeField
                key={i}
                filterItem={filterItem}
                onConfirm={(value) => {
                  onConfirm({ position: i, value });
                }}
              />
            );
          default:
            return null;
        }
      })}
    </List>
  );
};

export default FilterList;
