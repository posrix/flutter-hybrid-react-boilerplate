import { memo, useState, useMemo, useCallback, useEffect } from 'react';
import { Button, Calendar, Popup } from 'antd-mobile';
import {
  DateRangeContainerStyled,
  TitleContainerStyled,
  ConfirmActionContainerStyled,
} from './styled';
import { IDateRangePickerProps } from 'src/store/types';

export type DateRangePickerProps = IDateRangePickerProps & {
  onClose?: () => void;
};

export const DateRangePicker: React.FC<DateRangePickerProps> = memo(
  ({ visible, title, onClose, value = null, onConfirm }) => {
    const [dateRanges, setDateRanges] = useState<[Date, Date] | null>(null);

    const getTitle = useMemo(() => {
      return title ? title : '请选择日期';
    }, [title]);

    const onChange = useCallback((val: [Date, Date] | null) => {
      setDateRanges(val);
    }, []);

    const onClick = useCallback(() => {
      onConfirm && onConfirm(dateRanges);
      onClose && onClose();
      setDateRanges(null);
    }, [onConfirm, onClose, dateRanges]);

    useEffect(() => {
      setDateRanges(value);
    }, [value]);

    return (
      <>
        <Popup
          visible={visible}
          closeOnMaskClick
          showCloseButton
          bodyStyle={{
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
          }}
          style={{ zIndex: '1020' }}
          onClose={() => {
            setDateRanges(null);
            onClose && onClose();
          }}
        >
          <DateRangeContainerStyled>
            <TitleContainerStyled>
              <div className="title">{getTitle}</div>
            </TitleContainerStyled>
            <Calendar selectionMode="range" onChange={onChange} value={dateRanges}></Calendar>
          </DateRangeContainerStyled>
          <ConfirmActionContainerStyled>
            <Button color="primary" onClick={onClick}>
              确认
            </Button>
          </ConfirmActionContainerStyled>
        </Popup>
      </>
    );
  }
);
