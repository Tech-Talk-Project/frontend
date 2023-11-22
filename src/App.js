import { ThemeProvider } from "@material-tailwind/react";
import { Outlet } from "react-router-dom";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <ThemeProvider>
      <RecoilRoot>
        <Outlet />
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
