import styled, { createGlobalStyle } from 'styled-components/macro';

export const CenterPopupOverride = createGlobalStyle`
  .adm-picker-popup {
    z-index: calc(var(--adm-popup-z-index) + 20);
  }
`;

export const PopupContaienr = styled.div`
  .adm-picker-popup {
    z-index: calc(var(--adm-popup-z-index) + 20);
  }
`;

export const SelectorStyled = styled.div`
  margin-top: 10px;
`;

export const ActionContainer = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    width: 163px;

    &:nth-child(1) {
      margin-right: 10px;
      --background-color: #f2f2f6;
    }
  }
`;

export const DateTimeRangeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

export const DateTimeRangeButton = styled.div`
  border-radius: 4px;
  border: 1px solid #e1e1e1;
  width: 150px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0.4 auto;
  font-size: 14px;
  color: #595961;
`;

export const DateTimeRangeDivider = styled.div`
  width: 12px;
  border: 1px solid #c6c6c6;
  flex: 0 1 auto;
`;

export const InputFieldContainer = styled.div`
  display: flex;
`;
