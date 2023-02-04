import styled from 'styled-components/macro';

export const DateRangeContainerStyled = styled.div`
  .adm-calendar-cell.adm-calendar-cell-selected.adm-calendar-cell.adm-calendar-cell-selected {
    background: rgba(22, 119, 255, 0.1);
    color: #000;
  }

  .adm-calendar-cell.adm-calendar-cell-selected.adm-calendar-cell.adm-calendar-cell-selected-begin,
  .adm-calendar-cell.adm-calendar-cell-selected.adm-calendar-cell.adm-calendar-cell-selected-end {
    background: #2589ff;
    border-radius: 4px;
    color: #fff;
  }
`;

export const TitleContainerStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  .title {
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.9);
    line-height: 25px;
  }
`;

export const ConfirmActionContainerStyled = styled.div`
  display: flex;
  padding: 11px 12px 31px;
  button {
    flex: 1;
  }
`;
