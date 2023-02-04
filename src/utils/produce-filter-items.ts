import produce, { Draft } from 'immer';
import { FilterType, IFilterItem, isPickerColumnItem } from 'src/types/app';

// Produce filter items with default value to search all
export function produceFilterItems(filterItems: IFilterItem[]) {
  return produce(filterItems, (draftState: Draft<typeof filterItems>) => {
    draftState = draftState.map((filterItem) => {
      switch (filterItem.type) {
        case FilterType.Single:
          if (!filterItem.columns || !filterItem.columns.length) {
            filterItem.columns = [[]];
          }
          const hasAllColumn = filterItem.columns[0].some((column) =>
            isPickerColumnItem(column) ? column.label === '全部' : false
          );
          if (!hasAllColumn && !filterItem.noAll) {
            filterItem.columns[0].unshift({
              label: '全部',
              value: '',
            });
          }
          break;
        case FilterType.Cascade:
          const hasAllOption = filterItem.options.some((option) => option.label === '全部');
          if (!hasAllOption && !filterItem.noAll) {
            filterItem.options.unshift({
              label: '全部',
              value: '',
              children: [
                {
                  label: '全部',
                  value: '',
                },
              ],
            });
          }
          break;
      }
      return filterItem;
    });
  });
}
