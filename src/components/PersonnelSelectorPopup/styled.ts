import styled from 'styled-components/macro';

export const PopupContainer = styled.div`
  padding-top: 14px;
`;

export const PopupTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

export const PopupTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 21px;
`;

export const SearchBarContainer = styled.div`
  padding: 14px 21px;
`;

export const PersonnelContainer = styled.div`
  padding: 8px 20px;
`;

export const PersonnelNameContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const PersonnelName = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #000000;
`;

export const PersonnelSchedulingTag = styled.div`
  border-radius: 50%;
  width: 18px;
  height: 18px;
  background: #ffb73d;
  font-size: 12px;
  font-weight: 500;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
`;

export const PersonnelInfo = styled.div`
  font-size: 11px;
  font-weight: 400;
  color: #9797a1;
`;

export const ConfirmFooterContainer = styled.div`
  background-color: #fff;
  border-top: 1px solid #f3f3f7;
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: calc(var(--adm-popup-z-index, 1000) + 10);
`;

export const SelectedContainer = styled.div``;

export const SelectedText = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #000;
`;

export const SelectedCount = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #2589ff;
`;
