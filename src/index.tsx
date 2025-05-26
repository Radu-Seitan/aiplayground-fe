import { createRoot } from "react-dom/client";
import { AppRoutes } from "./configs/AppRoutes";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);

  root.render(
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
