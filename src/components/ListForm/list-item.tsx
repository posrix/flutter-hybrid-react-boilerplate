import React, { FC, ReactNode } from 'react';
import { NativeProps, withNativeProps } from 'src/utils/native-props';
import { RightOutline } from 'antd-mobile-icons';
import classNames from 'classnames';
import { isNodeWithContent } from 'src/utils/is-node-with-content';

const classPrefix = `custom-list-form-item`;

export type ListItemProps = {
  children?: ReactNode;
  description?: ReactNode;
  prefix?: ReactNode;
  extra?: ReactNode;
  clickable?: boolean;
  arrow?: boolean | ReactNode;
  disabled?: boolean;
  required?: boolean;
  onClick?: (e: React.MouseEvent) => void;
} & NativeProps<'--prefix-width' | '--align-items' | '--active-background-color'>;

export const ListItem: FC<ListItemProps> = (props) => {
  const clickable = props.clickable ?? !!props.onClick;
  const arrow = props.arrow === undefined ? clickable : props.arrow;

  const content = (
    <div className={`${classPrefix}-content-wrapper`}>
      <div className={`${classPrefix}-content`}>
        {isNodeWithContent(props.prefix) && (
          <div className={`${classPrefix}-content-prefix`}>{props.prefix}</div>
        )}
        <div className={`${classPrefix}-content-main`}>
          <div className={`${classPrefix}-content-main-left`}>
            {props.children}
            {!!props.required && <div className={`${classPrefix}-content-required`}>*</div>}
          </div>
          <div className={`${classPrefix}-content-main-right`}>
            {isNodeWithContent(props.extra) && (
              <div className={`${classPrefix}-content-extra`}>{props.extra}</div>
            )}
            {isNodeWithContent(arrow) && (
              <div className={`${classPrefix}-content-arrow`}>
                {arrow === true ? <RightOutline /> : arrow}
              </div>
            )}
          </div>
        </div>
      </div>
      {isNodeWithContent(props.description) && (
        <div className={`${classPrefix}-description`}>{props.description}</div>
      )}
    </div>
  );

  return withNativeProps(
    props,
    React.createElement(
      clickable ? 'a' : 'div',
      {
        className: classNames(
          `${classPrefix}`,
          clickable ? ['adm-plain-anchor'] : [],
          props.disabled && `${classPrefix}-disabled`
        ),
        onClick: props.disabled ? undefined : props.onClick,
      },
      content
    )
  );
};
