import { Button } from 'antd-mobile';
import MountablePopup from 'src/components/Base/MountablePopup';
import { concealDropDownFilterPopup, setDropDownFilterPopupItems } from 'src/store/appSlice';
import { useAppDispatch } from 'src/store/hooks';
import {
  FilterType,
  ICascadeFilterItem,
  IDateFilterItem,
  IFilterItem,
  ISingleFilterItem,
  ISelectorFilterItem,
  IDateRangeFilterItem,
  IDateTimeRangeFilterItem,
  IInputFilterItem,
} from 'src/types/app';
import { IDropDownFilterPopupProps } from 'src/store/types';
import { PopupContaienr, CenterPopupOverride, ActionContainer } from './styled';
import produce, { Draft } from 'immer';
import { useEffect, useRef } from 'react';
import { produceFilterQuery } from 'src/utils/produce-filter-query';
import FilterList from './FilterList';
import './index.less';

const classPrefix = 'custom-filter-popup';

const DropDownFilterPopup: React.FC<IDropDownFilterPopupProps> = ({
  visible,
  filterItems = [],
  getContainer,
  handleSelectCallback,
  handleResetCallback,
  popupProps = {},
}) => {
  const dispatch = useAppDispatch();
  const conceal = () => dispatch(concealDropDownFilterPopup());

  const popupContainerRef = useRef<HTMLDivElement>(null);
  const actionContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let container = null;
    if (getContainer) {
      container = getContainer();
    }
    if (container && popupContainerRef.current) {
      if (visible) {
        container.classList.add(`${classPrefix}-highlight-container`);
        container.parentElement!.style.paddingTop = `${
          container.offsetHeight -
          popupContainerRef.current!.offsetHeight -
          actionContainerRef.current!.offsetHeight
        }px`;
      } else {
        container.classList.remove(`${classPrefix}-highlight-container`);
        container.parentElement!.style.paddingTop = `0px`;
      }
    }
  }, [visible, getContainer, popupContainerRef]);

  const resetFilterItems = () => {
    const mutatedFilterItems = produce(filterItems, (draftState: Draft<IFilterItem[]>) => {
      draftState.forEach((filterItem) => {
        switch (filterItem.type) {
          case FilterType.Single:
            (filterItem as ISingleFilterItem).selectedColumn = null;
            break;
          case FilterType.Input:
            (filterItem as IInputFilterItem).value = '';
            break;
          case FilterType.Cascade:
            (filterItem as ICascadeFilterItem).selectedOptions = [];
            break;
          case FilterType.Date:
            (filterItem as IDateFilterItem).value = null;
            break;
          case FilterType.Selector:
            (filterItem as ISelectorFilterItem).value = [];
            break;
          case FilterType.DateTimeRange:
            (filterItem as IDateTimeRangeFilterItem).value = undefined;
            break;
          case FilterType.DateRange: {
            (filterItem as IDateRangeFilterItem).value = undefined;
          }
        }
      });
    });
    dispatch(setDropDownFilterPopupItems(mutatedFilterItems));
    const queryValue = produceFilterQuery(mutatedFilterItems);
    handleSelectCallback?.(queryValue);
    handleResetCallback?.(queryValue);
  };

  const handleSearch = () => {
    const queryValue = produceFilterQuery(filterItems);
    handleSelectCallback?.(queryValue);
    conceal();
  };

  return (
    <MountablePopup
      visible={visible}
      onMaskClick={conceal}
      getContainer={getContainer}
      {...popupProps}
    >
      <PopupContaienr ref={popupContainerRef}>
        <FilterList
          filterItems={filterItems}
          handleFilterItemsChangeCallback={(mutatedFilterItems) => {
            dispatch(setDropDownFilterPopupItems(mutatedFilterItems));
          }}
        />
      </PopupContaienr>
      <ActionContainer ref={actionContainerRef}>
        <Button onClick={resetFilterItems}>重置</Button>
        <Button color="primary" onClick={handleSearch}>
          保存
        </Button>
      </ActionContainer>
      <CenterPopupOverride />
    </MountablePopup>
  );
};

export default DropDownFilterPopup;
