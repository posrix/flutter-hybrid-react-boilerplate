import { get, isArray } from 'lodash';
import { FilterQueryValue, FilterType, IFilterItem } from 'src/types/app';

export function produceFilterQuery(filterItems: IFilterItem[]): FilterQueryValue {
  return filterItems.reduce((obj, filterItem) => {
    let value: string | Date | string[] = '';
    switch (filterItem.type) {
      case FilterType.Single:
        value = get(filterItem, 'selectedColumn.value', '');
        break;
      case FilterType.Cascade:
        const selectedOptions = get(filterItem, 'selectedOptions', []);
        value = selectedOptions.length ? selectedOptions[selectedOptions.length - 1]!.value : '';
        break;
      case FilterType.Date:
        value = filterItem.value ? new Date(filterItem.value!) : '';
        break;
      case FilterType.Selector:
        const select = get(filterItem, 'value', []);
        value = Array.isArray(select) ? select.join(',') : select + '';
        break;
      case FilterType.Input:
        value = get(filterItem, 'value', '');
        break;
    }

    if (filterItem.query && typeof filterItem.query === 'string') {
      obj[filterItem.query] = value;
    } else if (filterItem.query && isArray(filterItem.query)) {
      if (
        filterItem.type === FilterType.DateRange &&
        filterItem.query.length === 2
      ) {
        const dateRange = get(filterItem, 'value', []);
        const formatter = get(filterItem, 'formatter');
        obj[filterItem.query[0]] =
          !formatter || !dateRange[0] ? dateRange[0] : formatter(dateRange[0], 0);
        obj[filterItem.query[1]] =
          !formatter || !dateRange[1] ? dateRange[1] : formatter(dateRange[1], 1);
      }

      if (
        filterItem.type === FilterType.DateTimeRange &&
        filterItem.query.length === 2 &&
        isArray(filterItem.value)
      ) {
        obj[filterItem.query[0]] = filterItem.value[0] ? filterItem.value[0] : '';
        obj[filterItem.query[1]] = filterItem.value[1] ? filterItem.value[1] : '';
      }
    }

    return obj;
  }, {} as FilterQueryValue);
}
