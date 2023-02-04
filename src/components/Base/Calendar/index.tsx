import React, { forwardRef, ReactNode, useState, useImperativeHandle, useMemo } from 'react';
import { NativeProps, withNativeProps } from 'src/utils/native-props';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { mergeProps } from 'src/utils/with-default-props';
import { ArrowLeft } from './ArrowLeft';
import { ArrowLeftDouble } from './ArrowLeftDouble';
import isoWeek from 'dayjs/plugin/isoWeek';
import { useUpdateEffect } from 'ahooks';
import { usePropsValue } from 'src/utils/use-props-value';
import { convertValueToRange, DateRange } from './convert';
import './calendar.less';
import Icon from '../Icon';

dayjs.extend(isoWeek);

const classPrefix = 'adm-calendar';

type Page = { month: number; year: number };

export type CalenderRef = {
  jumpTo: (page: Page | ((page: Page) => Page)) => void;
  jumpToToday: () => void;
};

export type CalendarProps = {
  hideYearButton?: boolean;
  prevMonthButton?: React.ReactNode;
  prevYearButton?: React.ReactNode;
  nextMonthButton?: React.ReactNode;
  nextYearButton?: React.ReactNode;
  onPageChange?: (year: number, month: number) => void;
  onWeekViewChange?: (isWeekView: boolean) => void;
  weekStartsOn?: 'Monday' | 'Sunday';
  renderLabel?: (date: Date, isSelect: boolean) => ReactNode | string | null | undefined;
  allowClear?: boolean;
  max?: Date;
  min?: Date;
  shouldDisableDate?: (date: Date) => boolean;
} & (
  | {
      selectionMode?: undefined;
      value?: undefined;
      defaultValue?: undefined;
      onChange?: undefined;
    }
  | {
      selectionMode: 'single';
      value?: Date | null;
      defaultValue?: Date | null;
      onChange?: (val: Date | null) => void;
    }
  | {
      selectionMode: 'range';
      value?: [Date, Date] | null;
      defaultValue?: [Date, Date] | null;
      onChange?: (val: [Date, Date] | null) => void;
    }
) &
  NativeProps;

const defaultProps = {
  weekStartsOn: 'Sunday',
  hideYearButton: false,
  defaultValue: null,
  allowClear: true,
  prevMonthButton: <ArrowLeft />,
  prevYearButton: <ArrowLeftDouble />,
  nextMonthButton: <ArrowLeft />,
  nextYearButton: <ArrowLeftDouble />,
};

const Calendar = forwardRef<CalenderRef, CalendarProps>((p, ref) => {
  const today = dayjs();
  // @ts-ignore
  const props = mergeProps(defaultProps, p);

  const markItems = ['一', '二', '三', '四', '五', '六', '日'];

  if (props.weekStartsOn === 'Sunday') {
    const item = markItems.pop();
    if (item) markItems.unshift(item);
  }

  const [dateRange, setDateRange] = usePropsValue<DateRange>({
    value:
      props.value === undefined ? undefined : convertValueToRange(props.selectionMode, props.value),
    defaultValue: convertValueToRange(props.selectionMode, props.defaultValue),
    onChange: (v) => {
      if (props.selectionMode === 'single') {
        props.onChange?.(v ? v[0] : null);
      } else if (props.selectionMode === 'range') {
        props.onChange?.(v);
      }
    },
  });

  const [intermediate, setIntermediate] = useState(false);

  const [weekView, setWeekView] = useState(true);

  const [current, setCurrent] = useState(() => dayjs(dateRange ? dateRange[0] : today).date(1));

  useUpdateEffect(() => {
    props.onPageChange?.(current.year(), current.month() + 1);
  }, [current]);

  useImperativeHandle(ref, () => ({
    jumpTo: (pageOrPageGenerator) => {
      let page: Page;
      if (typeof pageOrPageGenerator === 'function') {
        page = pageOrPageGenerator({
          year: current.year(),
          month: current.month() + 1,
        });
      } else {
        page = pageOrPageGenerator;
      }
      setCurrent(
        dayjs()
          .year(page.year)
          .month(page.month - 1)
          .date(1)
      );
    },
    jumpToToday: () => {
      setCurrent(dayjs().date(1));
    },
  }));

  /* eslint-disable jsx-a11y/anchor-is-valid */
  const header = (
    <div className={`${classPrefix}-header`}>
      {!props.hideYearButton && (
        <a
          className={`${classPrefix}-arrow-button ${classPrefix}-arrow-button-year`}
          onClick={() => {
            setCurrent(current.subtract(1, 'year'));
          }}
        >
          {props.prevYearButton}
        </a>
      )}
      <a
        className={`${classPrefix}-arrow-button ${classPrefix}-arrow-button-month`}
        onClick={() => {
          setCurrent(current.subtract(1, 'month'));
        }}
      >
        {props.prevMonthButton}
      </a>
      <div className={`${classPrefix}-title`}>{`${current.year()}年${current.month() + 1}月`}</div>
      <a
        className={classNames(
          `${classPrefix}-arrow-button`,
          `${classPrefix}-arrow-button-right`,
          `${classPrefix}-arrow-button-right-month`
        )}
        onClick={() => {
          setCurrent(current.add(1, 'month'));
        }}
      >
        {props.nextMonthButton}
      </a>
      {!props.hideYearButton && (
        <a
          className={classNames(
            `${classPrefix}-arrow-button`,
            `${classPrefix}-arrow-button-right`,
            `${classPrefix}-arrow-button-right-year`
          )}
          onClick={() => {
            setCurrent(current.add(1, 'year'));
          }}
        >
          {props.nextYearButton}
        </a>
      )}
    </div>
  );

  const maxDay = useMemo(() => props.max && dayjs(props.max), [props.max]);
  const minDay = useMemo(() => props.min && dayjs(props.min), [props.min]);

  function renderCells() {
    const cells: ReactNode[] = [];

    let iterator;
    // Week view, iterator start at first day of selected row
    if (weekView && dateRange && props.selectionMode === 'single') {
      const date = dayjs(dateRange[0]);
      // Only in current month
      if (date.month() === current.month()) {
        iterator = date.subtract(date.isoWeekday(), 'day');
      }
    }

    // Default logic for month view
    if (!iterator) {
      iterator = current.subtract(current.isoWeekday(), 'day');
    }

    if (props.weekStartsOn === 'Monday') {
      iterator = iterator.add(1, 'day');
    }

    const cellsNum = weekView ? 1 * 7 : 6 * 7;
    while (cells.length < cellsNum) {
      const d = iterator;
      let isSelect = false;
      let isBegin = false;
      let isEnd = false;
      if (dateRange) {
        const [begin, end] = dateRange;
        isBegin = d.isSame(begin, 'day');
        isEnd = d.isSame(end, 'day');
        isSelect = isBegin || isEnd || (d.isAfter(begin, 'day') && d.isBefore(end, 'day'));
      }
      const inThisMonth = d.month() === current.month();
      const disabled = props.shouldDisableDate
        ? props.shouldDisableDate(d.toDate())
        : (maxDay && d.isAfter(maxDay, 'day')) || (minDay && d.isBefore(minDay, 'day'));
      cells.push(
        <div
          key={d.valueOf()}
          className={classNames(
            `${classPrefix}-cell`,
            (disabled || !inThisMonth) && `${classPrefix}-cell-disabled`,
            inThisMonth && {
              [`${classPrefix}-cell-today`]: d.isSame(today, 'day'),
              [`${classPrefix}-cell-selected`]: isSelect,
              [`${classPrefix}-cell-selected-begin`]: isBegin,
              [`${classPrefix}-cell-selected-end`]: isEnd,
            }
          )}
          onClick={() => {
            if (!props.selectionMode) return;
            if (disabled) return;
            const date = d.toDate();
            if (!inThisMonth) {
              setCurrent(d.clone().date(1));
            }
            function shouldClear() {
              if (!props.allowClear) return false;
              if (!dateRange) return false;
              const [begin, end] = dateRange;
              return d.isSame(begin, 'date') && d.isSame(end, 'day');
            }
            if (props.selectionMode === 'single') {
              if (props.allowClear && shouldClear()) {
                setDateRange(null);
                return;
              }
              setDateRange([date, date]);
            } else if (props.selectionMode === 'range') {
              if (!dateRange) {
                setDateRange([date, date]);
                setIntermediate(true);
                return;
              }
              if (shouldClear()) {
                setDateRange(null);
                setIntermediate(false);
                return;
              }
              if (intermediate) {
                const another = dateRange[0];
                setDateRange(another > date ? [date, another] : [another, date]);
                setIntermediate(false);
              } else {
                setDateRange([date, date]);
                setIntermediate(true);
              }
            }
          }}
        >
          <div className={`${classPrefix}-cell-top`}>{d.date()}</div>
          <div className={`${classPrefix}-cell-bottom`}>
            {props.renderLabel?.(d.toDate(), isSelect)}
          </div>
        </div>
      );
      iterator = iterator.add(1, 'day');
    }
    return cells;
  }
  const body = <div className={`${classPrefix}-cells`}>{renderCells()}</div>;

  const mark = (
    <div className={`${classPrefix}-mark`}>
      {markItems.map((item) => (
        <div key={item} className={`${classPrefix}-mark-cell`}>
          {item}
        </div>
      ))}
    </div>
  );

  const expander = (
    <div className={`${classPrefix}-cells-expander`}>
      <div
        className={`${classPrefix}-cells-expander-handle`}
        onClick={() => {
          setWeekView(!weekView);
          props.onWeekViewChange?.(!weekView);
        }}
      >
        {weekView ? <Icon glyph="arrow-down" /> : <Icon glyph="arrow-up" />}
      </div>
    </div>
  );

  return withNativeProps(
    props,
    <div className={classPrefix}>
      {header}
      {mark}
      {body}
      {expander}
    </div>
  );
});

export default Calendar;
