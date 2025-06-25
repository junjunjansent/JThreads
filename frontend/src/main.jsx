import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { UserProvider } from "./contexts/UserContext.jsx";
import "./index.css";
import "@picocss/pico/css/pico.css";
import App from "./App.jsx";

localStorage.debug = "JThreads:*";
// import debug from "debug";
// const log = debug("JThreads:file destination");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
