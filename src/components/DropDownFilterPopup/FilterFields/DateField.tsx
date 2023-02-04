import { memo } from 'react';
import { activateDatePicker } from 'src/store/appSlice';
import { convertDateTime } from 'src/utils/app';
import { List } from 'antd-mobile';
import { useAppDispatch } from 'src/store/hooks';
import { IDateFilterItem } from 'src/types/app';

interface Props {
  filterItem: IDateFilterItem;
  onConfirm: (value: Date) => void;
}

export const DateField = memo(function (props: Props) {
  const {
    filterItem,
    filterItem: { placeholder = '请选择' },
    onConfirm,
  } = props;
  const dispatch = useAppDispatch();

  return (
    <List.Item
      onClick={() => {
        dispatch(
          activateDatePicker({
            precision: filterItem.precision,
            onConfirm,
            value: filterItem.value,
          })
        );
      }}
      extra={
        filterItem.value
          ? convertDateTime(filterItem.value as Date, filterItem.precision, '')
          : placeholder
      }
    >
      {filterItem.name}
    </List.Item>
  );
});
