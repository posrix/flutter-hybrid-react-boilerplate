import React, { useState, useRef, FC, PropsWithChildren } from 'react';
import { useUnmountedRef } from 'ahooks';
import { NativeProps, withNativeProps } from 'src/utils/native-props';
import { mergeProps } from 'src/utils/with-default-props';
import { useSpring, animated } from '@react-spring/web';
import { GetContainer, renderToContainer } from 'src/utils/render-to-container';
import { PropagationEvent, withStopPropagation } from 'src/utils/with-stop-propagation';

export type FullScreenPopupProps = PropsWithChildren<{
  afterClose?: () => void;
  afterShow?: () => void;
  visible?: boolean;
  bodyStyle?: React.CSSProperties;
  getContainer?: GetContainer;
  stopPropagation?: PropagationEvent[];
}> &
  NativeProps<'--z-index'>;

const defaultProps = {
  visible: false,
  getContainer: () => document.body,
  stopPropagation: ['click'],
};

export const FullScreenPopup: FC<FullScreenPopupProps> = (p) => {
  const props = mergeProps(defaultProps, p);

  const ref = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(props.visible);

  const unmountedRef = useUnmountedRef();
  const { percent } = useSpring({
    percent: props.visible ? 0 : 100,
    config: {
      precision: 0.1,
      mass: 0.4,
      tension: 300,
      friction: 30,
    },
    onStart: () => {
      setActive(true);
    },
    onRest: () => {
      if (unmountedRef.current) return;
      setActive(props.visible);
      if (props.visible) {
        props.afterShow?.();
      } else {
        props.afterClose?.();
      }
    },
  });

  const node = withStopPropagation(
    props.stopPropagation,
    withNativeProps(
      props,
      <div style={{ display: active ? undefined : 'none' }}>
        <animated.div
          style={{
            ...props.bodyStyle,
            zIndex: 'calc(var(--adm-popup-z-index) + 10)',
            background: '#fff',
            position: 'fixed',
            right: 0,
            top: percent.to((v) => {
              return `${v}%`;
            }),
            bottom: 0,
            left: 0,
          }}
          ref={ref}
        >
          {props.children}
        </animated.div>
      </div>
    )
  );

  return renderToContainer(props.getContainer, node);
};
