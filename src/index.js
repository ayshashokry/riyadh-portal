import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "antd/dist/antd.css";
import { ConfigProvider } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loader from "./containers/Loader";
/* Redux Connections */
import { Provider } from "react-redux";
import store from "./redux/store";

function renderApp() {
  const App = lazy(() => import("./App"));
  ReactDOM.render(
    <Suspense fallback={<Loader />}>
      <Provider store={store}>
        <ConfigProvider direction="rtl">
          <App />
        </ConfigProvider>
      </Provider>
    </Suspense>,
    document.getElementById("root")
  );
}

renderApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
