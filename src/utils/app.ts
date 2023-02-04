import dayjs from 'dayjs';
import { Precision } from 'antd-mobile/es/components/date-picker/date-picker-utils';
import { PrecisionFormat } from 'src/types/enum';

export const getLocalStorage = (storageName: string) => {
  return window.localStorage.getItem(storageName) || '';
};

export const setLocalStorage = (storageName: string, storageValue: string) => {
  window.localStorage.setItem(storageName, storageValue);
};

export const removeLocalStorage = (storageName: string) => {
  window.localStorage.removeItem(storageName);
};

export const convertDateTime = (date: Date, precision: Precision = 'second', placeholder = '-') => {
  if (date) {
    if (precision === 'week') {
      return dayjs(date).isoWeek() + '周';
    } else if (precision === 'week-day') {
      return dayjs(date).isoWeek() + '周' + dayjs(date).isoWeekday() + '天';
    } else {
      return dayjs(date).format(PrecisionFormat[precision]);
    }
  } else {
    return placeholder;
  }
};

export const dateFormatter = (date: Date, formatter = 'YYYY-MM-DD HH:mm', placeholder = '') =>
  date ? dayjs(date).format(formatter) : placeholder;
