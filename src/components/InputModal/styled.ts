import styled, { createGlobalStyle } from 'styled-components';

export const CenterPopupOverride = createGlobalStyle`
  body {
    --adm-center-popup-border-radius: 6px;
  }
  .adm-center-popup-body {
    overflow: hidden
  }
  .adm-text-area-element {
    border: 1px solid #F2F2F6;
    padding: 12px 14px;
  }
`;

export const Content = styled.div`
  padding: 20px;
`;

export const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #000000;
  margin-bottom: 16px;
`;

export const ActionGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;
