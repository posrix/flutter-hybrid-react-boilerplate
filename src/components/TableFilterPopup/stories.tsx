import { ComponentStory, ComponentMeta } from '@storybook/react';
import { store } from 'src/store';
import { Provider } from 'react-redux';
import AppView from '../AppView';
import TableFilterPopup from '.';
import Table from '../Base/Table';
import { makeData, Person } from 'src/config/mock';
import { useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { FilterType, IFilterItem } from 'src/types/app';
import { Button } from 'antd-mobile';

export default {
  title: 'Components/TableFilterPopup',
  component: TableFilterPopup,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <AppView>
          <Story />
        </AppView>
      </Provider>
    ),
  ],
} as ComponentMeta<typeof TableFilterPopup>;

const Template: ComponentStory<typeof TableFilterPopup> = () => {
  const [data, setData] = useState(() => makeData(20));
  const refreshData = () => setData(() => makeData(20));
  const [tableFilterItems, setTableFilterItems] = useState<IFilterItem[]>([
    {
      name: '主题',
      type: FilterType.Single,
      query: 'check-topic',
      columns: [
        [
          { label: '主题A', value: 'a' },
          { label: '主题B', value: 'b' },
        ],
      ],
    },
  ]);
  const [visible, setVisible] = useState(false);

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
    <>
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        显示
      </Button>
      <TableFilterPopup
        title="订单筛选"
        visible={visible}
        setVisible={setVisible}
        filterItems={tableFilterItems}
        handleQueryChangeCallback={(query) => {
          console.debug('[storybook]', 'query change', query);
          refreshData();
        }}
        handleFilterItemsChangeCallback={setTableFilterItems}
      >
        <Table
          data={data}
          columns={columns}
          selectMode="Single"
          handleSingleRowCheck={(row) => {
            console.debug('[storybook]', 'selected row:', row);
            setVisible(false);
          }}
        />
      </TableFilterPopup>
    </>
  );
};

export const Default = Template.bind({});
