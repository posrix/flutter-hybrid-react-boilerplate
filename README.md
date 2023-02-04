:rice_ball: A flutter hybrid react boilerplate depend on [inappwebview](https://inappwebview.dev/)

## Development in Browser

```Shell
npm run start:web
```

Starts the development server running on `http://localhost:3080`, This mode will read token from the local `.token` file.


## Development in WebView

```Shell
npm run start
```

In this mode, the token will be obtained through the bridge method called `getToken`.

### Technologies

- react@17
- typescript@4
- antd-mobile@5
- @tanstack/react-table@8
- styled-components@5
- @reduxjs/toolkit@1.8
- immer@9
- @storybook/react@6
- @craco/craco@7
- react-activation@0.12.1

### Features

- Both support webview and browser development mode
- Support over 20+ storybook components
- Login-free by reading token form local file in browser
- Route-level KeepAlive
- Built-in webpack OfflinePackagePlugin
