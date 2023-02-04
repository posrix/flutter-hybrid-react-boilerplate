import { memo } from 'react';
import { activatePicker } from 'src/store/appSlice';
import { List } from 'antd-mobile';
import { useAppDispatch } from 'src/store/hooks';
import { PickerValue, PickerValueExtend } from 'antd-mobile/es/components/picker-view';
import { ISingleFilterItem } from 'src/types/app';

interface Props {
  filterItem: ISingleFilterItem;
  onConfirm: (value: PickerValue[], extend: PickerValueExtend) => void;
}

export const SingleField = memo(function(props: Props) {
  const { filterItem, onConfirm } = props;
  const dispatch = useAppDispatch();

  return <List.Item
    onClick={() => {
      dispatch(
        activatePicker({
          columns: filterItem.columns,
          value: filterItem.selectedColumn ? [filterItem.selectedColumn.value] : [],
          onConfirm,
        }),
      );
    }}
    extra={filterItem.selectedColumn?.label as string || '请选择'}
  >
    {filterItem.name}
  </List.Item>;
});
