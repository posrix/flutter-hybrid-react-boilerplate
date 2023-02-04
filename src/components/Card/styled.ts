import styled, { css } from 'styled-components/macro';
import { CardProps } from './Card';

export const PreviewContainerMixin = css`
  border-radius: 6px;
  padding: 12px;
`;

export const Container = styled.div<Pick<CardProps, 'preview' | 'innerPreview' | 'isFirstCard'>>`
  display: flex;
  flex-direction: column;
  margin: ${(props) =>
    props.innerPreview
      ? `${props.isFirstCard ? '0 0 24px 0' : '24px 0'}`
      : props.preview
      ? `${props.isFirstCard ? '0 0 12px 0' : '12px 0'}`
      : '0'};
  background-color: #fff;
  ${(props) => props.preview && !props.innerPreview && PreviewContainerMixin}
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const RightLabel = styled.span`
  background: rgba(37, 137, 255, 0.15);
  border-radius: 2px;
  font-size: 11px;
  font-weight: 400;
  color: #2589ff;
  padding: 2px 4px;
`;

export const Title = styled.div<{ hasGap?: boolean }>`
  flex: 1;
  font-size: 20px;
  font-weight: 500;
  color: #595961;
  margin-left: ${(props) => (props.hasGap ? 8 : 0)}px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TagsFieldCotainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
`;

export const FieldCotainer = styled.div<{ noMarginTop?: boolean }>`
  display: flex;
  margin-top: ${(props) => (props.noMarginTop ? 0 : 8)}px;
`;

export const ButtonFieldCotainer = styled.div`
  display: flex;
  margin-top: 8px;
  justify-content: flex-end;
`;

export const FieldText = styled.span`
  font-size: 16px;
  color: rgba(0,0,0,0.65);
  word-break: break-all;
`;

export const FieldTitle = styled.span`
  font-size: 16px;
  white-space: nowrap;
  margin-right: 13px;
  color: rgba(0,0,0,0.45);
  width: 96px;
`;

export const Image = styled.img.attrs({ width: 30, height: 30 })`
  margin: 0 0 4px 8px;
  border-radius: 2px;
`;

export const A = styled.a`
  text-decoration: none;
  font-size: 16px;
  font-weight: 400;
  color: #2589ff;
`;

export const ProgressWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

export const ProgressContainer = styled.div`
  flex: 1;
`;

export const ProgressText = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: #2589ff;
  margin-left: 8px;
`;

export const FileFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -12px;
`;

export const FileNameContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
`;

export const FileName = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #9797a1;
  margin-left: 10px;
`;

export const FloatingContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: #ffffff;
  box-shadow: 0px -4px 10px 0px #f2f2f6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
`;

export const FloatingCheckContainer = styled.div`
  display: flex;
`;

export const SelectAllText = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #2589ff;
  margin-left: 12px;
  user-select: none;
`;

export const FloatingActionContainer = styled.div`
  display: flex;
`;
