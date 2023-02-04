import styled from 'styled-components/macro';
import { IconProps } from '.';

export const DEFAULT_ICON_COLOR = 'inherit';

export const InlineSvg = styled.svg<Pick<IconProps, 'color'>>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  color: ${(props) => (props.color ? props.color : DEFAULT_ICON_COLOR)};
  fill: currentColor;
`;

export const SvgWrapper = styled.div<Pick<IconProps, 'height' | 'width'>>`
  display: inline-block;
  vertical-align: middle;
  width: ${(props) => (props.width ? `${props.width}px` : '30px')};
  height: ${(props) => (props.height ? `${props.height}px` : '30px')};
  position: relative;
  cursor: pointer;
`;
