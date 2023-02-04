import styled, { createGlobalStyle } from 'styled-components';

export const PopupOverride = createGlobalStyle`
  .table-filter-popup-container {
    .adm-popup {
      z-index: calc(var(--adm-popup-z-index) + 20);
    }
    .adm-list-item {
      padding-left: 0;
    }
    .adm-list {
      padding: 0 14px;
    }
    .adm-list-item-content-main {
      font-weight: 400;
      font-size: 16px;
      color: #000000;
    }
    .adm-list-item-content {
      margin-right: 0;
      padding-right: 0;
    }
    .adm-list-default .adm-list-body {
      border-top: 0 none;
      border-bottom: 1px solid #f8f8f8;
    }
  }
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: #000000;
  text-align: center;
  padding: 12px 0;
`;

export const TableContainer = styled.div`
  height: calc(80vh - 150px);
  overflow-y: auto;
`;
