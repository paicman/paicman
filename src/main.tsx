import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "../index.css"; // Import the global CSS file
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
