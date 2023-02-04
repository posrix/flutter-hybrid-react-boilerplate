import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 45px;
  z-index: var(--adm-popup-z-index);
  .adm-nav-bar-title {
    font-size: 22px;
    font-weight: 600;
    color: #000000;
    line-height: 30px;
  }
`;

export const Placeholder = styled.div<{ height?: number }>`
  height: ${(props) => (props.height ? props.height : 0)}px;
`;
