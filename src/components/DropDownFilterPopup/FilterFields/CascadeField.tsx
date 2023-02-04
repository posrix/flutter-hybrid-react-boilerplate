import { memo } from 'react';
import { activateCascadePicker } from 'src/store/appSlice';
import { List } from 'antd-mobile';
import { useAppDispatch } from 'src/store/hooks';
import { ICascadeFilterItem } from 'src/types/app';
import { PickerValue, PickerValueExtend } from 'antd-mobile/es/components/picker';

interface Props {
  filterItem: ICascadeFilterItem;
  onConfirm: (value: PickerValue[], extend: PickerValueExtend) => void;
}

export const CascadeField = memo(function (props: Props) {
  const {
    filterItem: { placeholder = '请选择' },
    filterItem,
    onConfirm,
  } = props;
  const dispatch = useAppDispatch();

  return (
    <List.Item
      onClick={() => {
        dispatch(
          activateCascadePicker({
            options: filterItem.options,
            onConfirm,
            value: filterItem.selectedOptions
              ? filterItem.selectedOptions.map((option) => option!.value)
              : [],
          })
        );
      }}
      extra={
        filterItem.selectedOptions
          ? filterItem.selectedOptions?.map((option) => option!.label).join(' | ')
          : placeholder
      }
    >
      {filterItem.name}
    </List.Item>
  );
});
