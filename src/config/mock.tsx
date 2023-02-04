import { Personnel } from 'src/store/types';
import { CardFieldType, ICard, IFilterItem, FilterType } from 'src/types/app';
import { faker } from '@faker-js/faker';

export type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: 'relationship' | 'complicated' | 'single';
  subRows?: Person[];
};

const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = (): Person => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.datatype.number(40),
    visits: faker.datatype.number(1000),
    progress: faker.datatype.number(100),
    status: faker.helpers.shuffle<Person['status']>(['relationship', 'complicated', 'single'])[0]!,
  };
};

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!;
    return range(len).map((d): Person => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}

export const PERSONNELS: Personnel[] = [
  { name: '曹雪芹', id: '001121', department: 'A组', username: 'cao' },
  { name: '嬴政', id: '001122', department: 'A组', username: 'win' },
  { name: '勾践', id: '001123', department: 'A组', onVacation: true, username: 'gou' },
  { name: '夫差', id: '001124', department: 'A组', onVacation: true, username: 'fuchai' },
  { name: '阖闾', id: '001125', department: 'A组', username: 'helv' },
  { name: '按钮', id: '001126', department: 'A组', username: 'button' },
  { name: '范仲淹', id: '001127', department: 'A组', username: 'fan' },
  { name: '洪承畴', id: '001128', department: 'A组', username: 'hong' },
  { name: '赵匡胤', id: '001129', department: 'A组', username: 'zhaoge' },
  { name: '朱元璋', id: '001132', department: 'B组', username: 'king' },
  { name: '朱佑樘', id: '001133', department: 'B组', username: 'zyt' },
  { name: '朱由检', id: '001134', department: 'B组', username: 'zyj' },
  { name: '李时珍', id: '001135', department: 'B组', username: 'li' },
  { name: '江小白', id: '001136', department: 'B组', username: 'jiang' },
  { name: 'Sed', id: '001137', department: 'B组', username: 'sed' },
  { name: 'sac', id: '001138', department: 'B组', username: 'sac' },
  { name: '#小欧', id: '001139', department: 'B组', username: 'ou' },
  { name: '^小窝', id: '001140', department: 'B组', username: 'wo' },
];

export const FILTER_ITEMS: IFilterItem[] = [
  {
    name: '完成状态',
    type: FilterType.Selector,
    query: 'complete-status',
    options: [
      { label: '已完成', value: 'finished' },
      { label: '已撤销', value: 'reverted' },
    ],
  },
  {
    name: '状态',
    type: FilterType.Single,
    query: 'status',
    columns: [
      [
        { label: '开启', value: 'enable' },
        { label: '关闭', value: 'close' },
      ],
    ],
  },
  {
    name: '扫描',
    type: FilterType.Input,
    query: 'scan',
    enableScan: true,
  },
  {
    name: '搜索',
    type: FilterType.Input,
    query: 'search',
    enableSearch: true,
  },
  {
    name: '范围',
    type: FilterType.Cascade,
    query: 'subject',
    options: [
      {
        label: '浙江',
        value: '浙江',
        children: [
          {
            label: '杭州',
            value: '杭州',
          },
          {
            label: '宁波',
            value: '宁波',
          },
        ],
      },
      {
        label: '江苏',
        value: '江苏',
        children: [
          {
            label: '南京',
            value: '南京',
          },
          {
            label: '苏州',
            value: '苏州',
          },
        ],
      },
    ],
  },
  {
    name: '时间选择',
    type: FilterType.Date,
    query: 'time',
    precision: 'minute',
  },
  {
    name: '日期区间',
    type: FilterType.DateRange,
    query: ['date-range-start-time', 'date-range-end-time'],
  },
  {
    name: '时间区间',
    precision: 'minute',
    type: FilterType.DateTimeRange,
    query: ['date-time-range-start-time', 'date-time-range-end-time'],
  },
];

export const CARDS: ICard[] = [
  {
    id: 'GW220215002',
    title: 'GW220215002',
    tags: [{ color: 'red', text: '高' }],
    fields: [
      {
        type: CardFieldType.Text,
        name: '来源',
        value: 'Source',
      },
      {
        type: CardFieldType.Text,
        name: '截止时间',
        value: '2022/4/21 10:00',
      },
      {
        type: CardFieldType.Progress,
        name: '任务进度',
        value: 50,
      },
    ],
  },
];
