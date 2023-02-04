import { Popup } from 'antd-mobile';
import { PropsWithChildren } from 'react';
import FilterList, { FilterListProps } from '../DropDownFilterPopup/FilterList';
import { PopupOverride, TableContainer, Title } from './styled';

const classPrefix = 'table-filter-popup';

export interface TableFilterPopupProps
  extends PropsWithChildren,
    Pick<
      FilterListProps,
      'handleFilterItemsChangeCallback' | 'handleQueryChangeCallback' | 'filterItems'
    > {
  title: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const TableFilterPopup: React.FC<TableFilterPopupProps> = ({
  title,
  visible,
  setVisible,
  children,
  filterItems,
  handleQueryChangeCallback,
  handleFilterItemsChangeCallback,
}) => {
  return (
    <div className={`${classPrefix}-container`}>
      <Popup
        visible={visible}
        showCloseButton
        onClose={() => {
          setVisible(false);
        }}
        bodyStyle={{
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          height: '80vh',
        }}
        getContainer={null}
      >
        <PopupOverride />
        <Title>{title}</Title>
        <FilterList
          filterItems={filterItems}
          handleQueryChangeCallback={handleQueryChangeCallback}
          handleFilterItemsChangeCallback={handleFilterItemsChangeCallback}
        />
        <TableContainer>{children}</TableContainer>
      </Popup>
    </div>
  );
};

export default TableFilterPopup;
