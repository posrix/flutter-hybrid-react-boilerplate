import styled from 'styled-components/macro';

export const FloatingFooterContainer = styled.div`
  background: #fff;
  box-shadow: 0px -4px 10px 0px #f2f2f6;
  padding: 22px 20px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: var(--adm-popup-z-index);

  .adm-button {
    flex: 1;
    width: 100%;
  }
`;

export const Placeholder = styled.div<{ height?: number }>`
  height: ${(props) => (props.height ? props.height : 0)}px;
`;
