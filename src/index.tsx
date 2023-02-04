import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store';
import { reduceMotion } from 'antd-mobile';
import UAParser from 'ua-parser-js';
import { ConfigProvider } from 'antd-mobile';
import zhCN from 'antd-mobile/es/locales/zh-CN';

import 'whatwg-fetch';
import './index.css';

if (!process.env.WEB) {
  const vConsole = require('vconsole');
  new vConsole();
}

console.info('[system]', 'IS_IN_BROWSER:', process.env.WEB);

// Fix ios blank page bug
// https://blog.csdn.net/Jone_hui/article/details/115085256
window.history.scrollRestoration = 'manual';

declare global {
  interface Window {
    flutter_inappwebview: {
      callHandler: (method: string, ...args: any[]) => Promise<any>;
    };
  }
}

// Cancel animation for low version android webivew
const ua = new UAParser().getResult();
const majorVersion = parseInt(ua.browser.version?.split('.')[0] as string);
if (ua.browser.name === 'Chrome WebView' && majorVersion <= 66) {
  reduceMotion();
}

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
