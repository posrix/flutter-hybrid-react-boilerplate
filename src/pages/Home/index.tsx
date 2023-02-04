import { SearchBar } from 'antd-mobile';
import Calendar from 'src/components/Base/Calendar';
import Icon from 'src/components/Base/Icon';
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  activateDropDownFilterPopup,
  concealDropDownFilterPopup,
  setDropDownFilterPopupItems,
} from 'src/store/appSlice';
import HybridNavBar from 'src/components/HybridNavBar';
import { FilterType } from 'src/types/app';
import {
  Container,
  SearchBarContainer,
  FilterText,
  FilterContainer,
  CardListContainer,
} from './styled';

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const { dropDownFilterPopupProps } = useAppSelector((state) => ({
    dropDownFilterPopupProps: state.app.dropDownFilterPopupProps,
  }));

  useEffect(() => {
    dispatch(
      setDropDownFilterPopupItems([
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
      ])
    );
  }, [dispatch]);

  return (
    <Container>
      <div ref={containerRef}>
        <HybridNavBar title="主页" />
        <SearchBarContainer>
          <SearchBar placeholder="搜索" />
          <FilterContainer
            onClick={() => {
              if (!dropDownFilterPopupProps.visible) {
                containerRef.current &&
                  dispatch(
                    activateDropDownFilterPopup({
                      getContainer: () => containerRef.current!,
                      handleSelectCallback: (queryValue) => {},
                    })
                  );
              } else {
                dispatch(concealDropDownFilterPopup());
              }
            }}
          >
            <Icon glyph="filter" size={13} />
            <FilterText>筛选</FilterText>
          </FilterContainer>
        </SearchBarContainer>
      </div>
      <Calendar hideYearButton selectionMode="single" weekStartsOn="Monday" />
      <CardListContainer></CardListContainer>
    </Container>
  );
};

export default Home;
