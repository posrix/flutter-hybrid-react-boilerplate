import styled from 'styled-components';
import { CardListScrollableProps } from '.';

export const LoadingOrEmptyWrapper = styled.div<Pick<CardListScrollableProps, 'loadingTop'>>`
  padding-top: ${(props) => (props.loadingTop ? props.loadingTop : 30)}vh;
  text-align: center;
  color: var(--adm-color-weak);
`;
