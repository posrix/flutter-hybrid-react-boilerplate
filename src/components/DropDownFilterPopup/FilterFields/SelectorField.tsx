import { memo } from 'react';
import { ISelectorFilterItem, SelectorValue } from 'src/types/app';
import { SelectorStyled } from 'src/components/DropDownFilterPopup/styled';
import { List, Selector } from 'antd-mobile';

interface Props {
  filterItem: ISelectorFilterItem;
  onChange: (value: SelectorValue[]) => void;
}

export const SelectorField = memo(function (props: Props) {
  const { filterItem, onChange } = props;

  return (
    <List.Item
      description={
        <SelectorStyled>
          <Selector
            columns={2}
            multiple={true}
            onChange={onChange}
            value={filterItem.value}
            options={filterItem.options}
            showCheckMark={false}
          />
        </SelectorStyled>
      }
    >
      {filterItem.name}
    </List.Item>
  );
});
