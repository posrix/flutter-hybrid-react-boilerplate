import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ColumnDef } from '@tanstack/react-table';
import { Button, Space } from 'antd-mobile';
import { useMemo, useReducer, useState } from 'react';
import { Provider } from 'react-redux';
import AppView from 'src/components/AppView';
import { makeData, Person } from 'src/config/mock';
import { store } from 'src/store';
import Table, { TableProps } from '.';

export default {
  title: 'Components/Table',
  component: Table,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <AppView>
          <Story />
        </AppView>
      </Provider>
    ),
  ],
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => {
  const rerender = useReducer(() => ({}), {})[1];

  const [data, setData] = useState(() => makeData(20));
  const refreshData = () => setData(() => makeData(20));

  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      {
        id: 'firstName',
        accessorKey: 'firstName',
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.lastName,
        id: 'lastName',
        accessorKey: 'lastName',
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
      },
      {
        id: 'age',
        accessorKey: 'age',
        header: () => 'Age',
        footer: (props) => props.column.id,
      },
      {
        id: 'visits',
        accessorKey: 'visits',
        header: () => <span>Visits</span>,
        footer: (props) => props.column.id,
      },
      {
        id: 'status',
        accessorKey: 'status',
        header: 'Status',
        meta: { name: '状态' },
        footer: (props) => props.column.id,
      },
      {
        id: 'progress',
        accessorKey: 'progress',
        header: 'Profile Progress',
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  return (
    <div>
      <Table {...(args as TableProps<Person>)} data={data} columns={columns} />
      <div style={{ marginTop: 15 }}>
        <Space>
          <Button onClick={() => rerender()}>Force Rerender</Button>
          <Button onClick={() => refreshData()}>Refresh Data</Button>
        </Space>
      </div>
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {};

export const SingleRowSelect = Template.bind({});

SingleRowSelect.args = {
  selectMode: 'Single',
  handleSingleRowCheck: (row) => {
    console.debug('[storybook]', 'selected row:', row);
  },
};

export const MultiRowsSelect = Template.bind({});

MultiRowsSelect.args = {
  selectMode: 'Multi',
  handleRowClick: (row) => {
    console.debug('[storybook]', 'row clicked:', row);
  },
  handleRowSelectionChange: (rowSelection) => {
    console.debug('[storybook]', 'row slection', rowSelection);
  },
};

export const Editable = Template.bind({});

Editable.args = {
  editableColumns: ['status'],
  handleRowColumnDataChange: (rowColumn, row) => {
    console.debug('[storybook]', 'row column data', rowColumn);
    console.debug('[storybook]', 'row', row);
  },
  handleRowDataChange: (rowData) => {
    console.debug('[storybook]', 'row data', rowData);
  },
};

export const StickyFristColumn = Template.bind({});

StickyFristColumn.args = {
  stickyFirstColumn: true,
  minCellWidth: 120,
};
