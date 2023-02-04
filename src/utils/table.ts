import { RowData, RowSelectionState } from '@tanstack/react-table';

export function findTableDataByRowSelection<TData extends RowData>(
  tableData: TData[],
  rowSelection: RowSelectionState
): TData[] {
  const foundTableData = Object.keys(rowSelection)
    .map((arrIndex: string) => tableData[Number(arrIndex)])
    .filter((n) => n);
  return foundTableData;
}
