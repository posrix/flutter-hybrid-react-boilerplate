import { NavBar } from 'antd-mobile';
import { NavBarProps } from 'antd-mobile/es/components/nav-bar';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'src/store/hooks';
import { useHistoryStack } from 'src/utils/useHistoryStack';
import { Container, Placeholder } from './styled';
import { useMemoizedFn } from 'ahooks';

export type HybridNavBarProps = NavBarProps & {
  title: string;
  onAfterBack?: () => void;
  backBefore?: () => Promise<boolean>;
};

const HybridNavBar: React.FC<HybridNavBarProps> = ({
  title,
  onAfterBack,
  backBefore,
  ...navBarprops
}) => {
  const navigate = useNavigate();
  const isWebViewReady = useAppSelector((state) => state.app.isWebViewReady);
  const stacks = useHistoryStack();

  const routerBack = useCallback(() => {
    navigate(-1);
    onAfterBack?.();
  }, [onAfterBack, navigate]);

  const goBack = useMemoizedFn(() => {
    if (isWebViewReady) {
      if (stacks.length >= 1) {
        routerBack();
      } else {
        window.flutter_inappwebview.callHandler('goBack');
      }
    } else {
      routerBack();
    }
  });

  const [height, setHeight] = useState(0);

  const measuredRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      // Will have a certain impact on the function of strictly relying on the lifecycle order,
      // such as getting the value of ref in componentDidMount
      // https://github.com/CJY0208/react-activation/blob/master/README.md#breaking-change
      setTimeout(() => {
        setHeight(node.getBoundingClientRect().height);
      }, 0);
    }
  }, []);

  return (
    <>
      <Container ref={measuredRef}>
        <NavBar
          onBack={() => {
            if (backBefore) {
              backBefore().then((shouldGoBack) => {
                if (shouldGoBack) {
                  goBack();
                }
              });
            } else {
              goBack();
            }
          }}
          {...navBarprops}
        >
          {title}
        </NavBar>
      </Container>
      <Placeholder height={height} />
    </>
  );
};

export default HybridNavBar;
