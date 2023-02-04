import styled, { createGlobalStyle } from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding-right: 12px;
`;

export const ProgressInputOverride = createGlobalStyle`
  .adm-input-element {
    --color: #2589FF !important;
  }
`;

export const PercentSymbol = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #2589ff;
`;
