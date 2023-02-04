import { memo } from 'react';
import { IInputFilterItem } from 'src/types/app';
import { Input, List } from 'antd-mobile';
import { ScanningOutline, SearchOutline } from 'antd-mobile-icons';
import { ShouldRender } from 'src/utils/should-render';
import { InputFieldContainer } from '../styled';

interface Props {
  filterItem: IInputFilterItem;
  onChange: (val: string) => void;
}

export const InputField = memo(function (props: Props) {
  const {
    filterItem: { value = '', enableScan = false, enableSearch = false, name, onSearchClick },
    onChange,
  } = props;

  return (
    <List.Item
      extra={
        <InputFieldContainer>
          <Input value={value} onChange={onChange} style={{ width: 212 }} />
          <ShouldRender active={enableScan}>
            <ScanningOutline
              style={{ padding: '12px 0 12px 6px' }}
              onClick={() => {
                window.flutter_inappwebview.callHandler('scan').then((data) => {
                  if (data?.code) {
                    onChange(data?.code);
                  }
                });
              }}
              fontSize={20}
            />
          </ShouldRender>
          <ShouldRender active={enableSearch}>
            <SearchOutline
              style={{ padding: '12px 0 12px 6px' }}
              onClick={onSearchClick}
              fontSize={20}
            />
          </ShouldRender>
        </InputFieldContainer>
      }
    >
      {name}
    </List.Item>
  );
});
