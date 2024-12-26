import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AppSystemProvider } from "./app/hooks/useSystemContext";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppSystemProvider>
        <App />
      </AppSystemProvider>
    </BrowserRouter>
  </React.StrictMode>
);