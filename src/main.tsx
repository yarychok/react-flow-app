import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";

import { ReactFlowProvider } from 'reactflow';

import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from './store/store';

import App from "./App"
import "./App.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ReactFlowProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ReactFlowProvider>
  </React.StrictMode>,
)
