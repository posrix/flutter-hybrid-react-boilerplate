import { useEffect, useMemo, useState } from 'react';
import { CloseOutline } from 'antd-mobile-icons';
import { Button, Checkbox, Radio, SearchBar } from 'antd-mobile';
import IndexBar from '../Base/IndexBar';
import { concealPersonnelSelectorPopup } from 'src/store/appSlice';
import { useAppDispatch } from 'src/store/hooks';
import { IPersonnelSelectorPopupProps, Personnel } from 'src/store/types';
import pinyin from 'pinyin';
import { isEnglishLetter, caseInsensitiveCompare, isChineseLetter } from 'src/utils/string';
import { ShouldRender } from 'src/utils/should-render';
import { FullScreenPopup } from '../Base/FullScreenPopup';
import {
  PopupContainer,
  PopupTitle,
  PopupTitleContainer,
  SearchBarContainer,
  PersonnelContainer,
  PersonnelName,
  PersonnelInfo,
  ConfirmFooterContainer,
  SelectedText,
  SelectedCount,
  SelectedContainer,
  PersonnelSchedulingTag,
  PersonnelNameContainer,
} from './styled';

const PerosonnelNode: React.FC<{ personnel: Personnel }> = ({ personnel }) => (
  <>
    <PersonnelNameContainer>
      <PersonnelName>{personnel.name}</PersonnelName>
      {personnel.onVacation && <PersonnelSchedulingTag>休</PersonnelSchedulingTag>}
    </PersonnelNameContainer>
    <PersonnelInfo>{`${personnel.username} | ${personnel.department}`}</PersonnelInfo>
  </>
);

const PersonnelSelectorPopup: React.FC<IPersonnelSelectorPopupProps> = ({
  title,
  visible,
  personnels,
  selectedPersonnels,
  multiple = false,
  handleSelectCallback,
}) => {
  const dispatch = useAppDispatch();

  const [mutatablePersonnels, setMutatablePersonnels] = useState<Personnel[]>([]);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const conceal = () => dispatch(concealPersonnelSelectorPopup());

  useEffect(() => {
    setMutatablePersonnels(personnels);
  }, [personnels]);

  useEffect(() => {
    if (selectedPersonnels?.length) {
      setSelectedIds(selectedPersonnels!.map((personnel) => personnel.id));
    } else {
      setSelectedIds([]);
    }
  }, [selectedPersonnels]);

  const findPersonnelsByIds = (ids: string[]) =>
    ids.map((id) => personnels.find((personnel) => personnel.id === id)) as Personnel[];

  const personnelGroup = useMemo(() => {
    const personnelGroup: Record<string, Personnel[]> = {};
    mutatablePersonnels.forEach((personnel, i) => {
      let char = personnel.name.charAt(0).toUpperCase();
      if (isChineseLetter(char)) {
        // Convert chinese to english letter if not
        char = pinyin(char, { style: 'NORMAL' })[0][0].charAt(0).toUpperCase();
      } else if (!isEnglishLetter(char)) {
        // imitating wechat
        char = '#';
      }
      if (!personnelGroup[char]) {
        personnelGroup[char] = [];
      }
      personnelGroup[char].push(personnel);
    });
    return personnelGroup;
  }, [mutatablePersonnels]);

  return (
    <FullScreenPopup visible={visible}>
      <PopupContainer>
        <div>
          <PopupTitleContainer>
            <PopupTitle>{title}</PopupTitle>
            <CloseOutline onClick={conceal} fontSize={12} />
          </PopupTitleContainer>

          <SearchBarContainer>
            <SearchBar
              placeholder="查询"
              onChange={(text) => {
                setMutatablePersonnels(
                  text
                    ? personnels.filter((personnel) =>
                        personnel.name.match(new RegExp(`${text}.*`, 'g'))
                      )
                    : personnels
                );
              }}
            />
          </SearchBarContainer>
        </div>
        <div
          style={{
            // 102 represent title and search bar height
            // 64 represent footer height
            height: window.innerHeight - 102 - (multiple ? 64 : 0),
          }}
        >
          {multiple ? (
            <Checkbox.Group
              value={selectedIds}
              onChange={(values) => {
                setSelectedIds(values as string[]);
              }}
            >
              <IndexBar extraHeight={102}>
                {Object.entries(personnelGroup)
                  .sort((a, b) => caseInsensitiveCompare(a[0], b[0]))
                  .map(([char, personnels]) => (
                    <IndexBar.Panel index={char} title={char} key={char}>
                      {personnels.map((personnel) => (
                        <PersonnelContainer key={personnel.id}>
                          <Checkbox value={personnel.id} block>
                            <PerosonnelNode personnel={personnel} />
                          </Checkbox>
                        </PersonnelContainer>
                      ))}
                    </IndexBar.Panel>
                  ))}
              </IndexBar>
            </Checkbox.Group>
          ) : (
            <Radio.Group
              value={selectedIds.length ? selectedIds[0] : ''}
              onChange={(id) => {
                handleSelectCallback?.(findPersonnelsByIds([id as string]));
                conceal();
              }}
            >
              <IndexBar extraHeight={116}>
                {Object.entries(personnelGroup)
                  .sort((a, b) => caseInsensitiveCompare(a[0], b[0]))
                  .map(([char, personnels]) => (
                    <IndexBar.Panel index={char} title={char} key={char}>
                      {personnels.map((personnel) => (
                        <PersonnelContainer key={personnel.id}>
                          <Radio value={personnel.id} block>
                            <PerosonnelNode personnel={personnel} />
                          </Radio>
                        </PersonnelContainer>
                      ))}
                    </IndexBar.Panel>
                  ))}
              </IndexBar>
            </Radio.Group>
          )}
        </div>
      </PopupContainer>
      <ShouldRender active={multiple}>
        <ConfirmFooterContainer>
          <SelectedContainer>
            <SelectedText>已选：</SelectedText>
            <SelectedCount>{selectedIds.length}</SelectedCount>
          </SelectedContainer>
          <Button
            color="primary"
            onClick={() => {
              conceal();
              handleSelectCallback?.(findPersonnelsByIds(selectedIds));
            }}
          >
            确认选择
          </Button>
        </ConfirmFooterContainer>
      </ShouldRender>
    </FullScreenPopup>
  );
};

export default PersonnelSelectorPopup;
