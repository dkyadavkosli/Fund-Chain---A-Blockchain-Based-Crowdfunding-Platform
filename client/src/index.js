import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { StateContextProvider } from "./context";
import { Provider } from 'react-redux';
import store from './Store';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
  <ThirdwebProvider desiredChainId={ChainId.Goerli}>
    <StateContextProvider>
      <App />
    </StateContextProvider>
  </ThirdwebProvider>
  </Provider>
);

reportWebVitals();
