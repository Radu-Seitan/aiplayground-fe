import { Outlet } from "react-router-dom";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { Menu } from "./components/Menu";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#480c44",
      },
      secondary: {
        main: "#072e5b",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Menu />
      <Outlet />
    </ThemeProvider>
  );
}

export default App;
