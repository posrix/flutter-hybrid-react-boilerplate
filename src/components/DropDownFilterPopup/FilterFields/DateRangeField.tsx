import { memo } from 'react';
import { List } from 'antd-mobile';
import { useAppDispatch } from 'src/store/hooks';
import { IDateRangeFilterItem } from 'src/types/app';
import { activeDateRangePicker } from 'src/store/appSlice';
import { dateFormatter } from 'src/utils/app';

interface Props {
  filterItem: IDateRangeFilterItem;
  onConfirm: (value: [Date, Date] | null) => void;
}

export const DateRangeField = memo(function (props: Props) {
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
          activeDateRangePicker({
            visible: true,
            value: filterItem.value,
            onConfirm,
          })
        );
      }}
      extra={
        filterItem.value
          ? filterItem.value
              ?.map((item: Date) => {
                return dateFormatter(item, 'YYYY-MM-DD');
              })
              .join('~')
          : placeholder
      }
    >
      {filterItem.name}
    </List.Item>
  );
});
