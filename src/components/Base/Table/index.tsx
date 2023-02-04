import React, { useState, useEffect, HTMLProps } from 'react';
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  RowData,
  RowSelectionState,
  Row,
  VisibilityState,
} from '@tanstack/react-table';
import { useAppDispatch } from 'src/store/hooks';
import { activateInputModal } from 'src/store/appSlice';
import { EditSOutline } from 'antd-mobile-icons';
import classNames from 'classnames';
import './table.less';
import { ErrorBlock } from 'antd-mobile';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData>
    extends Pick<TableProps<TData>, 'editableColumns' | 'handleRowColumnDataChange'> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    name: string;
  }
}

export interface TableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  selectMode?: 'Single' | 'Multi' | 'None';
  stickyFirstColumn?: boolean;
  editableColumns?: string[];
  columnVisibility?: VisibilityState;
  handleRowSelectionChange?: (rowSelection: RowSelectionState) => void;
  handleSingleRowCheck?: (row: Row<TData>) => void;
  handleRowColumnDataChange?: (RowColumnData: string, rowData: Row<TData>) => void;
  handleRowDataChange?: (rowData: TData[]) => void;
  handleRowClick?: (row: Row<TData>) => void;
  minCellWidth?: number | 'auto';
  selectionState?: RowSelectionState;
}

const Table = <TData extends RowData>({
  stickyFirstColumn = false,
  selectMode = 'None',
  editableColumns = [],
  columnVisibility = {},
  minCellWidth = 'auto',
  handleRowColumnDataChange,
  handleRowDataChange,
  handleSingleRowCheck,
  handleRowSelectionChange,
  handleRowClick,
  data,
  columns,
  selectionState,
}: TableProps<TData>) => {
  const [rowSelection, setRowSelection] = React.useState({});
  const [assembledData, setAssembledData] = useState(data);

  useEffect(() => {
    handleRowSelectionChange?.(rowSelection);
  }, [handleRowSelectionChange, rowSelection]);

  useEffect(() => {
    handleRowDataChange?.(assembledData);
  }, [handleRowDataChange, assembledData]);

  useEffect(() => {
    setRowSelection({ ...selectionState });
  }, [selectionState]);

  const assembledColumns = React.useMemo(() => {
    if (selectMode === 'Multi') {
      return [
        {
          id: 'multi-select',
          header: ({ table }) => (
            <IndeterminateCheckbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
              }}
            />
          ),
          cell: ({ row }) => (
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          ),
        },
        ...columns,
      ] as ColumnDef<TData, unknown>[];
    } else if (selectMode === 'Single') {
      return [
        {
          id: 'single-select',
          cell: ({ row, table }) => (
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                indeterminate: row.getIsSomeSelected(),
                onChange: () => {
                  handleSingleRowCheck?.(row);
                  // Radio button group logic
                  if (!row.getIsSelected()) {
                    table.resetRowSelection();
                    row.toggleSelected(true);
                  }
                },
              }}
            />
          ),
        },
        ...columns,
      ] as ColumnDef<TData, unknown>[];
    }
    return columns;
  }, [selectMode, columns, handleSingleRowCheck]);

  const table = useReactTable<TData>({
    data: assembledData,
    columns: assembledColumns,
    defaultColumn: {
      cell: ({ getValue, row, row: { index }, column: { id }, column, table }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const dispatch = useAppDispatch();
        const initialValue = getValue();
        // We need to keep and update the state of the cell normally
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [value, setValue] = useState(initialValue);

        const isColumnEditable = table.options.meta?.editableColumns?.includes(id);

        // If the initialValue is changed external, sync it up with our state
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          setValue(initialValue);
        }, [initialValue]);

        return (
          <>
            <span>{value as string}</span>
            <div
              className="cell-placeholder"
              onClick={() => {
                if (isColumnEditable) {
                  dispatch(
                    activateInputModal({
                      title: `${column.columnDef.meta?.name}修改`,
                      defaultValue: value as string,
                      handleConfirmCallback: (text) => {
                        setValue(text);
                        table.options.meta?.handleRowColumnDataChange?.(text, row);
                        table.options.meta?.updateData(index, id, text);
                      },
                    })
                  );
                }
              }}
            ></div>
          </>
        );
      },
    },
    initialState: {
      // Will support pagination later
      pagination: {
        pageSize: 9999,
        pageIndex: 0,
      },
    },
    state: {
      rowSelection,
      columnVisibility,
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    meta: {
      editableColumns,
      handleRowColumnDataChange,
      // Provide our updateData function to our table meta
      updateData: (rowIndex, columnId, value) => {
        setAssembledData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
    debugTable: true,
  });

  useEffect(() => {
    setAssembledData(data);
    if (selectMode !== 'None') {
      // Reset all row selection after data changed
      table.resetRowSelection(true);
    }
  }, [data, table, selectMode]);

  if (!assembledData.length) {
    return <ErrorBlock status="empty" description={null} title="无数据" />;
  }

  return (
    <div className="custom-table">
      <table style={{ minWidth: minCellWidth === 'auto' ? '100%' : 'auto' }}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => {
                const isColumnEditable = editableColumns.includes(header.id);
                const firstColumnSelectable = selectMode === 'None' && index === 0;
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={classNames({
                      sticky: stickyFirstColumn && firstColumnSelectable,
                    })}
                    style={{ minWidth: !firstColumnSelectable ? 'auto' : minCellWidth }}
                  >
                    {header.isPlaceholder ? null : (
                      <div>
                        <span>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </span>
                        {isColumnEditable && (
                          <span style={{ marginLeft: 5 }}>
                            <EditSOutline />
                          </span>
                        )}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr
                key={row.id}
                onClick={() => {
                  handleRowClick?.(row);
                }}
              >
                {row.getVisibleCells().map((cell, index) => {
                  return (
                    <td
                      key={cell.id}
                      className={classNames({
                        sticky: stickyFirstColumn && selectMode === 'None' && index === 0,
                      })}
                      style={{ minWidth: index === 0 ? 'auto' : minCellWidth }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

function IndeterminateCheckbox({
  indeterminate,
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, indeterminate]);

  return (
    <label className="table-contain">
      <input type="checkbox" ref={ref} {...rest} />
      <div className="table-input"></div>
    </label>
  );
}

export default Table;
