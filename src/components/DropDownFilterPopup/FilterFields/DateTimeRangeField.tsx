import { memo, useEffect, useState } from 'react';
import { DateTimeRangeValueType, IDateTimeRangeFilterItem } from 'src/types/app';
import {
  DateTimeRangeButton,
  DateTimeRangeContainer,
  DateTimeRangeDivider,
} from 'src/components/DropDownFilterPopup/styled';
import { List } from 'antd-mobile';
import { useAppDispatch } from 'src/store/hooks';
import { activateDatePicker } from 'src/store/appSlice';
import { convertDateTime } from 'src/utils/app';

interface Props {
  filterItem: IDateTimeRangeFilterItem;
  onConfirm: (value: DateTimeRangeValueType) => void;
}

export const DateTimeRangeField = memo(function (props: Props) {
  const { filterItem, onConfirm } = props;
  const dispatch = useAppDispatch();

  const [dateTimeRange, setDateTimeRange] = useState<DateTimeRangeValueType>([null, null]);

  useEffect(() => {
    if (!filterItem.value) {
      setDateTimeRange([null, null]);
    } else {
      setDateTimeRange(filterItem.value as DateTimeRangeValueType);
    }
  }, [filterItem.value]);

  return (
    <List.Item
      description={
        <DateTimeRangeContainer>
          <DateTimeRangeButton
            onClick={() => {
              dispatch(
                activateDatePicker({
                  precision: filterItem.precision,
                  onConfirm: (value) => {
                    setDateTimeRange((prevState) => {
                      const newState = [
                        value,
                        prevState ? prevState[1] : null,
                      ] as DateTimeRangeValueType;
                      onConfirm(newState);
                      return newState;
                    });
                  },
                  value: dateTimeRange[0],
                })
              );
            }}
          >
            {dateTimeRange[0]
              ? convertDateTime(dateTimeRange[0], filterItem.precision, '')
              : '起始日期'}
          </DateTimeRangeButton>
          <DateTimeRangeDivider />
          <DateTimeRangeButton
            onClick={() => {
              dispatch(
                activateDatePicker({
                  precision: filterItem.precision,
                  onConfirm: (value) => {
                    setDateTimeRange((prevState) => {
                      const newState = [
                        prevState ? prevState[0] : null,
                        value,
                      ] as DateTimeRangeValueType;
                      onConfirm(newState);
                      return newState;
                    });
                  },
                  value: dateTimeRange[1],
                })
              );
            }}
          >
            {dateTimeRange[1]
              ? convertDateTime(dateTimeRange[1], filterItem.precision, '')
              : '结束日期'}
          </DateTimeRangeButton>
        </DateTimeRangeContainer>
      }
    >
      {filterItem.name}
    </List.Item>
  );
});
