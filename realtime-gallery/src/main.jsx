import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Create React root and render the App component
createRoot(document.getElementById("root")).render(
  // StrictMode helps detect potential problems in development
  <StrictMode>
    <App />
  </StrictMode>
);
