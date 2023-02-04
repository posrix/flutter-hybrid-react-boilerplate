import { Suspense, useLayoutEffect } from 'react';
import { Result } from 'antd-mobile';
import { AliveScope, KeepAlive, KeepAliveProps } from 'react-activation';
import AppView from './components/AppView';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setWebviewReady, getTokenAsync, getUserIdAsync } from './store/appSlice';
import { HashRouter, Navigate, Routes, Route, useLocation } from 'react-router-dom';
import * as ROUTES from './routes';

function App() {
  const dispatch = useAppDispatch();
  const app = useAppSelector((state) => state.app);

  useLayoutEffect(() => {
    const handleWebviewReadyEvent = () => {
      dispatch(setWebviewReady());
      dispatch(getTokenAsync());
      dispatch(getUserIdAsync());
    };
    window.addEventListener('flutterInAppWebViewPlatformReady', handleWebviewReadyEvent);
    return () => {
      window.removeEventListener('flutterInAppWebViewPlatformReady', handleWebviewReadyEvent);
    };
  }, [dispatch]);

  // Might be useful after there is an api
  // if (!app.token) {
  //   return null;
  // }

  if (app.isWebViewReady && process.env.WEB) {
    return (
      <Result
        status="error"
        title="Error"
        description="You are currently in browser mode, but running in webview"
      />
    );
  }

  return (
    <Suspense fallback={<></>}>
      <HashRouter>
        <AppView>
          <AliveScope>
            <Routes>
              <Route
                path="/home"
                element={<KeepAliveWrapper saveScrollPosition="screen" inner={<ROUTES.Home />} />}
              />
              <Route path="/redirect-self" element={<ROUTES.RedirectSelf />} />
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AliveScope>
        </AppView>
      </HashRouter>
    </Suspense>
  );
}

interface KeepAliveWrapperProps extends Omit<KeepAliveProps, 'children'> {
  inner: JSX.Element;
}

function KeepAliveWrapper({ inner, ...keepAliveProps }: KeepAliveWrapperProps) {
  const location = useLocation();
  return (
    <KeepAlive key={location.key} name={location.pathname} id={location.key} {...keepAliveProps}>
      <inner.type />
    </KeepAlive>
  );
}

export default App;
