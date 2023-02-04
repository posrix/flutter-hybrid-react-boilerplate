import { CloseOutline } from 'antd-mobile-icons';
import { Button, Popup, CheckList, SearchBar } from 'antd-mobile';
import { concealSelectorPopup } from 'src/store/appSlice';
import { useAppDispatch } from 'src/store/hooks';
import { ISelectorPopupProps } from 'src/store/types';
import { PopupContaienr, PopupTitle, PopupTitleContainer, SearchBarContainer } from './styled';

export interface SelectorPopupProps extends ISelectorPopupProps {}

const SelectorPopup: React.FC<SelectorPopupProps> = ({
  title,
  selectorValue,
  selectorOptions,
  visible,
  handleSelectCallback,
}) => {
  const dispatch = useAppDispatch();

  const conceal = () => dispatch(concealSelectorPopup());

  return (
    <Popup visible={visible} onMaskClick={conceal} position="bottom">
      <PopupContaienr>
        <PopupTitleContainer>
          <PopupTitle>{title}</PopupTitle>
          <CloseOutline onClick={conceal} fontSize={12} />
        </PopupTitleContainer>

        <SearchBarContainer>
          <SearchBar placeholder="查询" />
        </SearchBarContainer>

        <CheckList
          defaultValue={[selectorValue]}
          onChange={(value) => {
            handleSelectCallback?.(value[0]);
            conceal();
          }}
        >
          {selectorOptions.map((option) => (
            <CheckList.Item value={option.value} key={option.value}>
              {option.name}
            </CheckList.Item>
          ))}
        </CheckList>

        <Button block color="primary" fill="outline" onClick={conceal}>
          取消
        </Button>
      </PopupContaienr>
    </Popup>
  );
};

export default SelectorPopup;
