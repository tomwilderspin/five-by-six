import React from "react";
import ReactDOM from "react-dom/client";
import { SnackbarProvider } from "notistack";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
      <App />
    </SnackbarProvider>
  </React.StrictMode>
);
