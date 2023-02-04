import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 40px 20px;
`;

export const Container = styled.div`
  display: flex;
`;

export const GraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Circle = styled.span`
  width: 11px;
  height: 11px;
  background: #ffffff;
  border: 4px solid #2589ff;
  border-radius: 50%;
`;

export const Line = styled.span<{ hidden?: boolean }>`
  display: ${(props) => (props.hidden ? 'hidden' : 'inline')};
  height: 40px;
  width: 2px;
  background-color: #bdbdbd;
  margin-top: 6px;
  margin-bottom: 8px;
`;

export const MidContainer = styled.div`
  width: 67px;
  margin-left: 9px;
`;

export const Title = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #000000;
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RightTopContainer = styled.div`
  display: flex;
`;

export const DateTime = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #9797a1;
  margin-left: 21px;
`;

export const Description = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #9797a1;
  margin-top: 7px;
`;
