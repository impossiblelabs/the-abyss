import { StrictMode } from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const rootEl = document.getElementById("root")!;

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

if (rootEl.innerHTML.trim()) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
}
