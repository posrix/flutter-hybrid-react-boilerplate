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
  padding: 20px 33px;
`;

export const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #000000;
  margin-bottom: 16px;
  text-align: center;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ModalButton = styled.button<{ isConfirm?: boolean }>`
  font-size: 16px;
  font-weight: 400;
  color: ${(props) => (props.isConfirm ? '#2589FF' : '#595961')};
  flex: 1;
  background-color: #fff;
  border-top: 1px solid #f2f2f6;
  border-left: none;
  border-right: none;
  border-bottom: none;
  padding: 12px 0;
  outline: none;
`;

export const ModalButtonDivider = styled.div`
  width: 1px;
  background-color: #f2f2f6;
`;
