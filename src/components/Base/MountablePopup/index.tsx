import classNames from 'classnames';
import React, { useRef, FC, PropsWithChildren } from 'react';
import { NativeProps, withNativeProps } from '../../../utils/native-props';
import { mergeProps } from '../../../utils/with-default-props';
import { Mask } from 'antd-mobile';
import { MaskProps } from 'antd-mobile/es/components/mask';
import { GetContainer, renderToContainer } from '../../../utils/render-to-container';
import { PropagationEvent, withStopPropagation } from '../../../utils/with-stop-propagation';

import './index.less';

const classPrefix = `mountable-popup`;

export type MountablePopupProps = PropsWithChildren<{
  bodyClassName?: string;
  bodyStyle?: React.CSSProperties;
  getContainer: GetContainer;
  mask?: boolean;
  maskClassName?: string;
  maskStyle?: MaskProps['style'];
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMaskClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  stopPropagation?: PropagationEvent[];
  visible?: boolean;
  disableBodyScroll?: boolean;
}> &
  NativeProps<'--z-index'>;

const defaultProps = {
  position: 'bottom',
  visible: false,
  getContainer: () => document.body,
  mask: true,
  stopPropagation: ['click'],
  disableBodyScroll: false
};

const MountablePopup: FC<MountablePopupProps> = (p) => {
  const props = mergeProps(defaultProps, p);

  const bodyCls = classNames(`${classPrefix}-body`, props.bodyClassName);

  const ref = useRef<HTMLDivElement>(null);

  const node = withStopPropagation(
    props.stopPropagation,
    withNativeProps(
      props,
      <div
        className={classPrefix}
        onClick={props.onClick}
        style={{ display: props.visible ? undefined : 'none' }}
      >
        {props.mask && (
          <Mask
            visible={props.visible}
            onMaskClick={props.onMaskClick}
            className={props.maskClassName}
            style={props.maskStyle}
            disableBodyScroll={props.disableBodyScroll}
            getContainer={() => document.body}
            stopPropagation={props.stopPropagation}
          />
        )}
        <div className={bodyCls} style={props.bodyStyle} ref={ref}>
          {props.children}
        </div>
      </div>
    )
  );

  return renderToContainer(props.getContainer, node);
};

export default MountablePopup;
