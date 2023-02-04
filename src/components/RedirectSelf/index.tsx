import { useLocation, useNavigate } from 'react-router';

interface LocationState {
  prevPath: string;
}

// PDA Android Webview and IOS WKWebview does not suppport page refresh, such as
// window.location.reload and react-router v6 navigate(0), this is a hack way to implement it.
function RedirectSelf() {
  const location = useLocation();
  const { prevPath, ...restLocationState } = location.state as LocationState;
  const navigate = useNavigate();
  navigate(prevPath, { replace: true, state: restLocationState });
  return null;
}

export default RedirectSelf;
